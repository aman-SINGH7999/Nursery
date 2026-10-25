"use client"
import PageBreadcrumb from "@/components/PageBreadcrumb"
import DetailedProductInfo from "@/pages/productDetails/detailedProductInfo/DetailedProductInfo";
import ProductInfo from "@/pages/productDetails/ProductInfo";
import ViewImages from "@/pages/productDetails/ViewImages";


export default function ProductDetail() {
  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Indoor Plants", href: "/shop" },
          { label: "Monstera Deliciosa" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 pt-5 pb-20">

        {/* LEFT SIDE - IMAGES */}
        <ViewImages />

        {/* RIGHT SIDE - PRODUCT INFO */}
        <ProductInfo />
        
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Detailed Info */}
        <DetailedProductInfo />
      </div>
    </div>
  )
}
