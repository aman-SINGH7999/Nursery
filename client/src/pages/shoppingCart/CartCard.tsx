import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import React from 'react'

export default function CartCard() {
  return (
    <Card className="
      flex flex-col sm:flex-row gap-4 p-4 w-full 
      rounded-2xl shadow-sm hover:shadow-md transition group
    ">

      {/* Image */}
      <div className="w-full sm:w-32 h-36 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-white mx-auto sm:mx-0">
        <img
          src="/house-plant.jpg"
          alt="flower"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 gap-3 sm:gap-1">
        
        {/* Top Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-bold text-base sm:text-lg group-hover:text-green-500 leading-tight">
              Fiddle Leaf Fig
            </div>

            <div className="text-xs text-gray-500">
              Ficus lyrata
            </div>

            <div className="text-xs text-gray-500">
              Large — 12 inch pot
            </div>
          </div>

          <Button 
            variant="outline"
            className="
              w-9 h-9 p-0 rounded-full border-none shadow-none
              text-red-600 hover:bg-red-50 hover:text-red-600
              flex justify-center items-center
            "
          >
            <RiDeleteBin6Line size={18} />
          </Button>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-bold text-green-700 text-lg text-center sm:text-left">
            $45.00
          </div>

          <div className="
            flex items-center justify-between sm:justify-normal
            gap-3 rounded-md bg-gray-100 p-1
          ">
            <Button 
              variant="outline" size="sm"
              className="hover:text-red-500 hover:bg-red-50 hover:border-red-200 w-8 h-8 p-0"
            >
              <IoMdRemove />
            </Button>

            <span className="text-lg font-semibold min-w-6 text-center">
              1
            </span>

            <Button 
              variant="outline" size="sm"
              className="hover:text-green-500 hover:bg-green-50 hover:border-green-200 w-8 h-8 p-0"
            >
              <IoMdAdd />
            </Button>
          </div>
        </div>

      </div>
    </Card>
  )
}
