import { GET_ACTIVE_CATEGORIES } from '@/app/api'
import ImageUpload from '@/components/admin/components/ImageUpload'
import MyRichTextEditor from '@/components/admin/components/MyRichTextEditor'
import GlobalSelect from '@/components/GlobalSelect'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useAlert } from '@/context/alert-context'
import { useCatchError } from '@/hooks/useCatchError'
import axios from 'axios'
import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export interface ICategory {
  name: string;
  id: number;
}

const initialValue = {
    name: "",
    category_id: 0,
    scientific_name: "",
    slug: "",
    description: "",
    price: 0.00,
    discounted_price: 0.00,
    stock_quantity: 10,
    type: "plant",
    size: "medium",
    difficulty_level: "medium",
    status: "active",
  }

export default function AddNewProduct() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const handleError = useCatchError();
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const [product, setProduct] = useState(initialValue)
  const [categoriesList, setCategoriesList] = useState([]);
  const [images, setImages] = useState<(File | string)[]>([]);

  const statusList = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const difficultyLevelList = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  const sizeList = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  const typeList = [
    { label: "Plant", value: "plant" },
    { label: "Seed", value: "seed" },
    { label: "Pot", value: "pot" },
    { label: "Fertilizer", value: "fertilizer" },
    { label: "Tool", value: "tool" },
  ];


  useEffect(()=>{
    const fetchCategories = async ()=>{
      try{
        const response = await axios.get(GET_ACTIVE_CATEGORIES, { withCredentials: true});

        if(response?.data?.data){
          setCategoriesList(response?.data?.data?.map((category:ICategory)=> ({
            label: category.name,
            value: String(category.id),
          })))
        }
      }catch(error){
        console.log("Error in fetching category: ", error)
      }
    }

    fetchCategories();
    console.log(id)
  },[])


  const handleSubmit = async ()=>{
    try{
      if( 
        !product.name || !product.category_id || !product.slug ||
        !product.description || !product.price || !product.stock_quantity ||
        !product.type || !product.size || !product.difficulty_level || !product.status 
      ){
        showAlert({
          type: "error",
          title: "All fields are required",
        });
        return;
      }
      setLoading(true);
      const payload = {}

      const response = await axios.post('', payload, { withCredentials: true});

      console.log(response.data);
      showAlert({
        type: "success",
        title: response?.data?.message || "Category Added Successfully",
      });
      navigate('/admin/products');

    }catch(error:unknown){
      console.log("Error in adding product: ", error);
      handleError(error);
    }finally{
      setLoading(false);
    }
  }


  return (
    <>
    <PageBreadcrumb
      items={[
        { label: "Dashboard", href: "/" },
        { label: "Products", href: "/admin/products" },
        { label: "Add New" },
      ]}
    />
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center gap-3 sticky top-0">
        <div>
            <div className="text-2xl font-bold">Add New Product</div>
            <div className="text-gray-600">Track user engagement, purchases, and browsing behavior.</div>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-2">
          <Button
            variant="destructive"
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>

          <Button
            variant="outline"
            className="bg-green-500 hover:bg-green-600"
            onClick={handleSubmit}
          >
            { loading ? <Spinner /> : <> <Save /> Save</> }
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-5'>
        <div className='col-span-12 lg:col-span-8 flex flex-col gap-5 z-10'>
          <Card className='p-5 space-y-4'>
            <div className='text-xl font-semibold'>General Information</div>
            <div className='space-y-1'>
              <div>Product Name</div>
              <Input type='text' placeholder='e.g. Red Rose' value={product?.name} onChange={(e)=>{
                setProduct(prev => ({
                  ...prev,
                  name: e.target.value,
                }))
                setProduct(prev => ({
                  ...prev,
                  slug: e.target.value
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9\s-]/g, "")   // special chars remove
                      .replace(/\s+/g, "-")           // multi-space → single -
                      .replace(/-+/g, "-")            // multi - → single -);
                }))
                
              }} />
            </div>
             <div className='space-y-1'>
              <div>Scientific Name</div>
              <Input 
                type='text' 
                placeholder='e.g. Hibscus' 
                value={product.scientific_name}
                onChange={(e)=> {
                  setProduct((prev)=> ({
                    ...prev,
                    scientific_name: e.target.value,
                  }))
                }}
              />
            </div>
            <div className='space-y-1'>
              <div>Slug</div>
              <Input type='text' placeholder='e.g. red-rose' value={product?.slug} disabled />
            </div>
            <div className='space-y-1'>
              <div>Description</div>
              <MyRichTextEditor
                value={product?.description}
                onChange={(value) =>
                  setProduct(prev => ({
                    ...prev,
                    description: value,
                  }))
                }
              />
            </div>
          </Card>
          <Card className='p-5 space-y-4'>
            <div className='text-xl font-semibold'>Media</div>
            <ImageUpload
              images={images}
              onChange={setImages}
            />
          </Card>
        </div>
        <div className='col-span-12 lg:col-span-4 flex flex-col gap-5'>
          
          <Card className='p-5 space-y-4'>
            <div className='text-xl font-semibold' >Organization</div>
            <div className='space-y-1'>
              <div>Category</div>
              <GlobalSelect 
                  value={String(product.category_id)}
                  onChange={(value) =>
                    setProduct(prev => ({
                      ...prev,
                      category_id: Number(value), 
                    }))
                  }
                  options={categoriesList}
                  className='!w-full'
              />
            </div>
          </Card>

          <Card className='p-5 space-y-4'>
            <div className='text-xl font-semibold' >Classification</div>
            <div className='space-y-1'>
              <div>Product type</div>
              <GlobalSelect 
                  value={product.type}
                  onChange={(value) =>
                    setProduct(prev => ({
                      ...prev,
                      type: value, 
                    }))
                  }
                  options={typeList}
                  className='!w-full'
              />
            </div>
            <div className='space-y-1'>
              <div>Product size</div>
              <GlobalSelect 
                  value={product.size}
                  onChange={(value) =>
                    setProduct(prev => ({
                      ...prev,
                      size: value, 
                    }))
                  }
                  options={sizeList}
                  className='!w-full'
              />
            </div>
            <div className='space-y-1'>
              <div>Product difficulty_level</div>
              <GlobalSelect 
                  value={product.difficulty_level}
                  onChange={(value) =>
                    setProduct(prev => ({
                      ...prev,
                      difficulty_level: value, 
                    }))
                  }
                  options={difficultyLevelList}
                  className='!w-full'
              />
            </div>
          </Card>

          

          <Card className='p-5 space-y-4'>
            <div className='text-xl font-semibold' >Pricing & Inventory</div>
            <div className='space-y-1'>
              <div>Discounted Price</div>
              <Input 
                type='text' 
                placeholder='e.g. Active' 
                value={product.discounted_price}
                onChange={(e)=>{
                  setProduct(prev => ({
                    ...prev,
                    discounted_price: Number(e.target.value),
                  }))
                }}
              />
            </div>
            <div className='space-y-1'>
              <div>Original Price</div>
              <Input 
                type='number' 
                placeholder='e.g. Active' 
                value={product.price}
                onChange={(e)=>{
                  setProduct(prev => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }}
              />
            </div>
            <div className='space-y-1'>
              <div>Stock Quantity</div>
              <Input 
                type='number' 
                placeholder='e.g. Active'  
                value={product.stock_quantity}
                onChange={(e)=>{
                  setProduct(prev => ({
                    ...prev,
                    stock_quantity: Number(e.target.value),
                  }))
                }}
              />
            </div>
          </Card>

          <Card className='p-5 space-y-4'>
            <div className='text-xl font-semibold' >Status & Visibility</div>
            <div className='space-y-1'>
              <div>Product Status</div>
              <GlobalSelect 
                  value={product?.status}
                  onChange={(value) =>
                    setProduct(prev => ({
                      ...prev,
                      status: value,
                    }))
                  }
                  options={statusList}
                  className='!w-full'
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}
