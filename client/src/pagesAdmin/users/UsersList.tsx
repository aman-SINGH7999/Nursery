import PageBreadcrumb from "@/components/PageBreadcrumb";
import ActivityStats from "@/components/admin/components/ActivityStats";
import { DataTable, type Column, type RowAction } from "@/components/admin/layout/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Download,
  Eye,
  Pencil,
  Plus,
  Trash,
  TrendingUp,
  Users
} from "lucide-react";
import { useState } from "react";
import { activities } from "../data";
import GlobalSearch from "@/components/GlobalSearch";
import GlobalSelect, { type GlobalSelectOption } from "@/components/GlobalSelect";


export type Activity = {
  id: string;
  customer: {
    name: string;
    email?: string;
    avatar?: string;
  };
  type: string | null;
  item?: string | null;
  time: string;
};

export default function UsersList() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(7);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

const userRoles: GlobalSelectOption[] = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Seller", value: "seller" },
  { label: "Customer", value: "customer" },
  { label: "Delivery", value: "delivery" },
  { label: "Master Admin", value: "master_admin" },
];

const userStatuses: GlobalSelectOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Blocked", value: "blocked" },
];




  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === activities.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(activities.map((a) => a.id));
    }
  };


  const columns: Column<Activity>[] = [
    {
      key: "id",
      header: (
        <Checkbox
          checked={selectedIds.length === activities.length}
          onCheckedChange={toggleAll}
          aria-label="Select all"
        />
      ),
      render: (row) => (
        <Checkbox
          checked={selectedIds.includes(row.id)}
          onCheckedChange={() => toggleRow(row.id)}
          aria-label={`Select ${row.id}`}
        />
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {row.customer.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.customer.name}</p>
            {row.customer.email && (
              <p className="text-xs text-muted-foreground">
                {row.customer.email}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {row.customer.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.customer.name}</p>
            {row.customer.email && (
              <p className="text-xs text-muted-foreground">
                {row.customer.email}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Activity Type",
      render: (row) => (
        <Badge variant="secondary" className="capitalize">
          {row.type}
        </Badge>
      ),
    },
    {
      key: "item",
      header: "Associated Item",
      render: (row) =>
        row.item ?? (
          <span className="italic text-muted-foreground">
            No associated product
          </span>
        ),
    },
    {
      key: "time",
      header: "Timestamp",
      className: "text-right",
    },
  ];

  const statsData = [
  {
    title: "Total Activities",
    value: "12,548",
    subtitle: "vs previous period",
    badgeText: "+12%",
    badgeIcon: TrendingUp,
    badgeColorClass: "text-green-600 bg-green-50",
    backgroundIcon: TrendingUp,
    titleColor: "!text-green-600 font-bold",
    valueColor: ""
  },
  {
    title: "Most Common Activity",
    value: "76574",
    subtitle: "Followed by 'Added to Cart'",
    badgeText: "65% of total",
    badgeColorClass: "text-blue-700 bg-blue-50",
    backgroundIcon: Eye,
  },
  {
    title: "Active Users Today",
    value: 482,
    subtitle: "Currently online: 45",
    badgeText: "28 new",
    badgeIcon: Users,
    badgeColorClass: "text-pink-600 bg-pink-50",
    backgroundIcon: Users,
  },
];

const actions: RowAction<Activity>[]  = [
  {
    label: "View",
    icon: Eye,
    onClick: (row) => console.log("View", row),
  },
  {
    label: "Edit",
    icon: Pencil,
    onClick: (row) => console.log("Edit", row),
  },
  {
    label: "Delete",
    icon: Trash,
    colorClass: "text-red-600",
    onClick: (row) => console.log("Delete", row),
  },
]

  return (
    <>
    <PageBreadcrumb
      items={[
        { label: "Dashboard", href: "/" },
        { label: "Products", href: "/admin/products" },
        { label: "Products List" },
      ]}
    />
    
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center gap-3">
        <div>
            <div className="text-2xl font-bold">Customer Activity Report</div>
            <div className="text-gray-600">Track user engagement, purchases, and browsing behavior.</div>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-2">
          <Button
            variant="destructive"
            disabled={selectedIds.length === 0}
            onClick={() => console.log("Bulk delete", selectedIds)}
          >
            Delete Selected ({selectedIds.length})
          </Button>

          <Button
            variant="outline"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => console.log("Export", selectedIds)}
          >
            <Download />
            Export Selected
          </Button>
        </div>
      </div>
      <ActivityStats stats={statsData} />
      <div className="flex justify-between items-center gap-3 px-2 py-4 bg-white/20 shadow-sm">
      <div className="flex justify-start items-center gap-2">
          <Button
            variant="destructive"
            disabled={selectedIds.length === 0}
            onClick={() => console.log("Bulk delete", selectedIds)}
          >
            Delete Selected ({selectedIds.length})
          </Button>
          <GlobalSearch
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search users..."
            className="!max-w-sm"
          />

          <GlobalSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={userRoles}
            placeholder="Select Role"
            className="bg-white"
          />
          <GlobalSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={userStatuses}
            placeholder="Select Status"
            className="bg-white"
          />
      </div>
      <div className="flex justify-end items-center">
          <Button
            variant="outline"
            className=""
            onClick={() => console.log("Export", selectedIds)}
          >
            <Plus />
            Add Products
          </Button>
      </div>
      </div>

      <DataTable
        columns={columns}
        data={activities}
        actions={actions}
        pagination={{
          page:page,
          pageSize:pageSize,
          total: 12548,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPage(1);       // IMPORTANT
            setPageSize(size);
          },
          pageSizeOptions: [5, 7, 10, 25, 50],
        }}
      />
    </div>
    </>
  );
}

