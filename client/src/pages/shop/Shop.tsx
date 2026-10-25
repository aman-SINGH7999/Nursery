import GlobalSelect from "@/components/GlobalSelect";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import MobileFilter from "./MobileFilter";
import ProductCard from "./ProductCard";
import ShopFilterSidebar from "./ShopFilterSidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Shop() {
  const [sort, setSort] = useState("featured");

  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Indoor Plants" },
        ]}
      />

      <div className="max-w-7xl mx-auto flex gap-6 px-4 min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden md:block flex-none w-64 lg:w-72 sticky top-24 self-start h-fit">
          <ShopFilterSidebar />
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-1 space-y-4">
          {/* Product Cards here */}
          <div className=" bg-gray-50 rounded px-4 pb-4">
            <div className="flex flex-col lg:flex-row justify-between pb-7">
              <div>
                <h1 className="text-6xl font-bold">Indoor Plants</h1>
                <div className="text-xl text-gray-500">Showing 145 items for your home jungle.</div>
              </div>
              <div className="flex justify-end items-center gap-5 pt-5">
                <div className="md:hidden">
                  <MobileFilter />
                </div>
                <GlobalSelect
                  value={sort}
                  onChange={setSort}
                  placeholder="Sort by"
                  options={[
                    { label: "Price: Low to High", value: "low_high" },
                    { label: "Price: High to Low", value: "high_low" },
                    { label: "New Arrived", value: "new" },
                    { label: "Featured", value: "featured" },
                    { label: "Best Seller", value: "best" },
                  ]}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-6">
                {
                  [1,2,3,4,5,6,7].map((i)=>(
                    <ProductCard key={i} />
                  ))
                }
            </div>
            <div className="flex justify-center items-center py-5 py-20">
              <Button variant={'outline'} className="rounded-full px-10 py-5">Load More Plants</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}