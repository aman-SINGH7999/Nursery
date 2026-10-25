import React from 'react'

export default function ViewImages() {
  return (
     <div>
        <div className="bg-white rounded-xl overflow-hidden border">
          <img
            src="/house-plant.jpg"
            className="w-full h-[420px] object-cover"
            alt="plant"
          />
        </div>

        <div className="grid grid-cols-5 gap-3 mt-4">
          {[1,2,3,4,5].map(i => (
            <div
              key={i}
              className="border rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500"
            >
              <img src="/house-plant.jpg" className="h-20 w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
  )
}
