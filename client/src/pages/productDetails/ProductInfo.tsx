import React from 'react'
import { Button } from "@/components/ui/button"
import { LiaStarSolid } from "react-icons/lia";
import { LiaStarHalfAltSolid } from "react-icons/lia";
import { LiaStar } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

export default function ProductInfo() {
  return (
    <div className="space-y-6">
      {/* TITLE + REVIEWS */}
      <div>
        <h1 className="text-4xl font-bold">Monstera Deliciosa</h1>

        <div className="flex items-center gap-3 text-gray-600 text-sm mt-1">
          <span className="flex text-yellow-500">
            <LiaStarSolid size={16} />
            <LiaStarSolid size={16} />
            <LiaStarSolid size={16} />
            <LiaStarHalfAltSolid size={16} />
            <LiaStar size={16} />
          </span> <span>(124 Reviews)</span>
          <span className="text-green-600 font-semibold">• In Stock</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-4 mt-3">
          <span className="text-3xl font-bold">$35.00</span>
          <span className="line-through text-gray-400">$45.00</span>
          <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">
            22% OFF
          </span>
        </div>
      </div>

      {/* SIZE SECTION */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Pot Size</h3>
          <p className="text-green-600 cursor-pointer text-sm">Size Guide</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Small", size: `6" Pot` },
            { label: "Medium", size: `10" Pot` },
            { label: "Large", size: `14" Pot` },
          ].map((s, idx) => (
            <div
              key={idx}
              className={`border rounded-xl p-3 cursor-pointer text-center hover:border-green-500`}
            >
              <div className="font-semibold">{s.label}</div>
              <div className="text-sm text-gray-500">{s.size}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUANTITY */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Quantity</h3>

        <div className="flex items-center gap-3">
          <Button variant="outline"><IoMdRemove /></Button>
          <span className="text-lg font-semibold">1</span>
          <Button variant="outline"><IoMdAdd /></Button>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <Button className="w-1/2 h-12 text-lg bg-black hover:bg-black/85">Add To Cart</Button>
        <Button className="w-1/2 h-12 text-lg bg-green-500 hover:bg-green-600">
          Buy Now
        </Button>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="font-semibold">Light</p>
          <p className="text-sm text-gray-500">Bright</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="font-semibold">Water</p>
          <p className="text-sm text-gray-500">Weekly</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="font-semibold">Temp</p>
          <p className="text-sm text-gray-500">18–30°C</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="font-semibold">Level</p>
          <p className="text-sm text-gray-500">Easy</p>
        </div>
      </div>

      {/* DELIVERY */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
        <TbTruckDelivery />
        <h3 className="font-semibold text-green-700">
          Free delivery on orders over $50
        </h3>
        <p className="text-sm text-gray-600">
          Order within <span className="text-green-600 font-bold">4h 32m</span> to get it by
          Wednesday, Oct 24.
        </p>
      </div>
    </div>
  )
}
