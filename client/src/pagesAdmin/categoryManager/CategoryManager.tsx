import PageBreadcrumb from "@/components/PageBreadcrumb";
import { DataTable, type Column, type RowAction } from "@/components/admin/layout/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";
import GlobalSelect, { type GlobalSelectOption } from "@/components/GlobalSelect";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BULK_INACTIVE_CATEGORIES, DELETE_CATEGORY, GET_ALL_CATEGORIES } from "@/app/api";
import ConfirmModal from "@/components/ConfirmModal";

/* ================= TYPES ================= */
export type Category = {
  id: number;
  name: string;
  slug: string;
  parent?: {
    id: number;
    name: string;
  } | null;
  status: "active" | "inactive";
};


const statusOptions: GlobalSelectOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function CategoryList() {
  const [categoriesData, setCategoriesData] = useState<Category[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 10,
    totalPages: 2
  });
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [inactiveIds, setInactiveIds] = useState<number[]>([]);
  const [permanentDelete, setPermanentDelete] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false);



  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${GET_ALL_CATEGORIES}?search=${searchValue}&status=${statusFilter}&page=${pagination.page}&limit=${pagination.limit}`
        );
        setCategoriesData(response?.data?.data ?? []);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages,
        }));
      } catch (error) {
        console.log("fetchCategories:", error);
      }
    };
    fetchCategories();
  }, [searchValue, statusFilter, pagination.page, pagination.limit, deleting])

  /* ================= SELECT LOGIC ================= */
  const toggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === categoriesData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categoriesData.map((c) => c.id));
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns: Column<Category>[] = [
    {
      key: "id",
      header: (
        <Checkbox
          checked={selectedIds.length === categoriesData.length}
          onCheckedChange={toggleAll}
        />
      ),
      render: (row) => (
        <Checkbox
          checked={selectedIds.includes(row.id)}
          onCheckedChange={() => toggleRow(row.id)}
        />
      ),
    },
    {
      key: "name",
      header: "Category Name",
      render: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "slug",
      header: "Slug",
    },
    {
      key: "parent",
      header: "Parent",
      render: (row) =>
        row.parent ? (
          <span>{row.parent.name}</span>
        ) : (
          <span className="italic text-muted-foreground">Root</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge
          variant={row.status === "active" ? "default" : "secondary"}
          className="capitalize"
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  /* ================= ROW ACTIONS ================= */
  const actions: RowAction<Category>[] = [
    {
      label: "Edit",
      icon: Pencil,
      onClick: (row) => navigate(`/admin/categories/update-category/${row.id}`),
    },
    {
      label: "Delete",
      icon: Trash,
      colorClass: "text-red-600",
      onClick: (row) => {
        setPermanentDelete(row.id);
        setInactiveIds([]);
        setConfirmOpen(true);
      },
    },
  ];

  const handleSearch = (value: string) => {
    setSearchValue((prev) => {
      if (prev !== value) {
        setPagination((p) => ({ ...p, page: 1 }));
      }
      return value;
    });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter((prev) => {
      if (prev !== value) {
        setPagination((p) => ({ ...p, page: 1 }));
      }
      return value;
    });
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      if (inactiveIds.length === 0 && permanentDelete) {
        await axios.delete(`${DELETE_CATEGORY}/${permanentDelete}`);
      } else {
        await axios.post(BULK_INACTIVE_CATEGORIES, {
          ids: inactiveIds,
        });
      }

      setCategoriesData(prev =>
        prev.filter(c => !inactiveIds.includes(c.id))
      );
      setSelectedIds([]);
      setConfirmOpen(false);
      setInactiveIds([]);
    } catch (error) {
      console.log("Delete error:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Products", href: "/admin/products" },
          { label: "Categories" },
        ]}
      />

      <div className="p-6 space-y-4">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Categories</h1>
            <p className="text-gray-600">Manage product categories</p>
          </div>
          <Button className="bg-green-600" onClick={()=> navigate('/admin/categories/add-category')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {/* FILTER BAR */}
        <div className="flex gap-2 items-center bg-white p-3 rounded-md shadow-sm">
          <GlobalSearch
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search categories..."
            className="!max-w-sm"
          />

          <GlobalSelect
            value={statusFilter}
            onChange={handleStatusChange}
            options={statusOptions}
            placeholder="Filter Status"
            className="bg-white"
          />

          <Button
            variant="destructive"
            disabled={selectedIds.length === 0}
            onClick={() => {
              setInactiveIds(selectedIds);
              setPermanentDelete(null);
              setConfirmOpen(true);
            }}
          >
            Inactive Selected ({selectedIds.length})
          </Button>
        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={categoriesData}
          actions={actions}
          pagination={{
            page: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            onPageChange: (page) => setPagination((prev)=>({...prev, page})),
            onPageSizeChange: (size) => setPagination((prev)=>({...prev, limit: size, page: 1})),
            pageSizeOptions: [5, 10, 25],
          }}
        />
        <ConfirmModal
          open={confirmOpen}
          title= {inactiveIds.length ? "Inactive Category" : "Delete Category"}
          description={
            inactiveIds.length ?
              `Are you sure you want to inactive ${
                inactiveIds.length > 1
                  ? `${inactiveIds.length} categories`
                  : "this category"
              }?`
            : `Are you sure you want to delete ${
                inactiveIds.length > 1
                  ? `${inactiveIds.length} categories`
                  : "this category"
              }? This action cannot be undone.` 
          }
          confirmText= {inactiveIds.length ? "Inactive" : "Delete"}
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setConfirmOpen(false);
            setInactiveIds([]);
          }}
        />
      </div>
    </>
  );
}
