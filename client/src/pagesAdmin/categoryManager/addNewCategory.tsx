import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GlobalSelect from "@/components/GlobalSelect";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import SingleImageUpload from "@/components/admin/components/SingleImageUpload";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CATEGORY_GET_BY_ID, CREATE_CATEGORY, GET_ALL_CATEGORIES, UPDATE_CATEGORY } from "@/app/api";
import { useAlert } from "@/context/alert-context";
import { useCatchError } from "@/hooks/useCatchError";
import { Spinner } from "@/components/ui/spinner";

export interface ICategory {
  name: string;
  id: number;
}



export default function AddNewCategory() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const handleError = useCatchError();
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    parent_id: 0,
    image: "",
    status: "active",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(()=>{
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(GET_ALL_CATEGORIES);
        console.log("fetchParentCategories: ", response.data);
        setParentCategories(response?.data?.data.map((category:ICategory)=> {
          return {
            label: category.name,
            value: String(category.id),
          }
        }) ?? []);
      } catch (error) {
        console.log("fetchCategories:", error);
      }
    };
    fetchParentCategories();
  }, [])

  useEffect(()=>{
    if (!id) return;

    const fetchCategoryById = async () => {
      try {
        const response = await axios.get(`${CATEGORY_GET_BY_ID}/${id}`);
        setCategory(response?.data?.data);
      } catch (error) {
        console.log("fetchCategoryById:", error);
      }
    };
    fetchCategoryById();
  }, [id])

  const handelSave = async ()=>{
    if (!category.name) {
      showAlert({
        type: "error",
        title: "Name is required",
      });
      return;
    }
    
    try{
      setLoading(true);
      const formData = new FormData();

      formData.append("name", category.name);
      formData.append("slug", category.slug);
      formData.append("status", category.status);

      if (category.parent_id) {
        formData.append("parent_id", String(category.parent_id));
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }
      else if (id && category.image === "") {
        // remove image
        formData.append("image", "");
      }
      else if (id && category.image) {
        // keep old
        formData.append("image", category.image);
      }

      const path = id
        ? `${UPDATE_CATEGORY}/${id}`
        : CREATE_CATEGORY;
      const response = await axios.post(path, formData, { withCredentials: true },
      );
      console.log(response.data);
      showAlert({
        type: "success",
        title: response?.data?.message || "Category Added Successfully",
      });
      navigate('/admin/categories');
    }catch(error: unknown){
      console.log("Error in creating category: ",error)
      handleError(error)
    }finally{
      setLoading(false)
    }
  }


  const statuses = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Categories", href: "/admin/categories" },
          { label: "Add New" },
        ]}
      />

      <div className="p-6 space-y-4">
        {/* Sticky Header */}
        <div className="flex justify-between items-center gap-3 sticky top-0 z-10 py-2">
          <div>
            <div className="text-2xl font-bold">{id ? "Update Category" : "Add New Category"}</div>
            <div className="text-gray-600">
              Create and manage product categories.
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="destructive" onClick={()=> navigate('/admin/categories')}>Cancel</Button>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={handelSave}
            >
              {
                loading ? <Spinner /> : <><Save /> Save</>
              }
              
            </Button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-12 gap-5">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
            <Card className="p-5 space-y-4">
              <div className="text-xl font-semibold">
                Category Information
              </div>

              <div className="space-y-1">
                <div>Category Name</div>
                <Input
                  placeholder="e.g. Indoor Plants"
                  value={category.name}
                  onChange={(e) =>
                    setCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                      slug: e.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-"),
                    }))
                  }
                />
              </div>

              <div className="space-y-1">
                <div>Slug</div>
                <Input
                  value={category.slug}
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div>Parent Category</div>
                  <GlobalSelect
                    value={String(category.parent_id)}
                    onChange={(val) =>
                      setCategory((prev) => ({
                        ...prev,
                        parent_id: Number(val),
                      }))
                    }
                    options={parentCategories}
                    className="!w-full"
                  />
                </div>

                <div className="space-y-1">
                  <div>Status</div>
                  <GlobalSelect
                    value={category.status}
                    onChange={(val) =>
                      setCategory((prev) => ({
                        ...prev,
                        status: val,
                      }))
                    }
                    options={statuses}
                    className="!w-full"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
            <Card className="p-5 space-y-4">
              <div className="text-xl font-semibold">Category Image</div>

              <SingleImageUpload
                initialImage={category.image}
                onChange={(file) => {
                  setImageFile(file);

                  if (file === null) {
                    // USER REMOVED IMAGE
                    setCategory(prev => ({
                      ...prev,
                      image: ""  
                    }));
                  }
                }}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
