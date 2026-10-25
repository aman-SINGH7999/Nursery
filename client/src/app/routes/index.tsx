import { createBrowserRouter } from "react-router-dom"
import Auth from "@/pages/auth/Auth"
import App from "@/App"
import Home from "@/pages/home/Home"
import Shop from "@/pages/shop/Shop"
import ProductDetail from "@/pages/productDetails/ProductDetail"
import ShoppingCart from "@/pages/shoppingCart/ShoppingCart"
import MyOrders from "@/pages/myOrders/MyOrders"
import Wishlist from "@/pages/wishlist/Wishlist"
import Checkout from "@/pages/checkout/Checkout"
import NotFound404 from "@/components/layout/NotFound404"
import TrackOrders from "@/pages/trackOrders/TrackOrders"
import AdminApp from "@/AdminApp"
import Products from "@/pagesAdmin/products/Products"
import AddNewProduct from "@/pagesAdmin/products/addNewProduct/AddNewProduct"
import AddNewUser from "@/pagesAdmin/users/addNewUser/AddNewUser"
import UsersList from "@/pagesAdmin/users/UsersList"
import CategoryManager from "@/pagesAdmin/categoryManager/CategoryManager"
import AddNewCategory from "@/pagesAdmin/categoryManager/addNewCategory"



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'product-detail',
        element: <ProductDetail />
      },
      {
        path: 'shopping-cart',
        element: <ShoppingCart />
      },
      {
        path: 'my-orders',
        element: <MyOrders />
      },
      {
        path: 'wishlist',
        element: <Wishlist />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'track-orders',
        element: <TrackOrders />
      },
      {
        path: "*",
        element: <NotFound404 />
      },
    ]
  },
  {
    path: '/admin',
    element: <AdminApp />,
    children: [
      {
        path: 'products',
        element: <Products />,
      },
      {
        path:'products/add-product',
        element: <AddNewProduct />
      },
      {
        path:'users',
        element: <UsersList />
      },
      {
        path:'users/add-user',
        element: <AddNewUser />
      },
      {
        path: 'categories',
        element: <CategoryManager />
      },
      {
        path: 'categories/add-category',
        element: <AddNewCategory />
      },
      {
        path: 'categories/update-category/:id',
        element: <AddNewCategory />
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
  }

])
