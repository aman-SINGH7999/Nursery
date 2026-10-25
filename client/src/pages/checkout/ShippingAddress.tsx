"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin } from "lucide-react"
import { useState } from "react"

export default function ShippingAddress() {
  const [selected, setSelected] = useState("home")

  const addresses = [
    {
      id: "home",
      label: "HOME",
      address: "1234 Leafy Lane, Plant City, PC 56789",
      user: "John Doe, +1 555-0199",
      default: true,
    },
    {
      id: "work",
      label: "WORK",
      address: "5678 Corporate Blvd, Office Park, OP 12345",
      user: "John Doe, +1 555-0199",
      default: false,
    },
  ]

  return (
    <Card className="max-w-3xl w-full p-6 space-y-5 rounded-2xl border shadow-sm">
      {/* Title */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <MapPin className="text-green-600" />
        <span>1. Shipping Address</span>
      </div>

      {/* Addresses */}
      <div className="space-y-4">
        {addresses.map((a) => (
          <div
            key={a.id}
            onClick={() => setSelected(a.id)}
            className={`
              border rounded-xl p-4 cursor-pointer transition-all
              ${
                selected === a.id
                  ? "border-green-500 bg-green-50 shadow-sm"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            <div className="flex justify-between">
              <div className="flex items-start gap-3">
                {/* radio */}
                <span
                  className={`h-4 w-4 rounded-full border mt-1 ${
                    selected === a.id
                      ? "border-green-600 bg-green-600"
                      : "border-gray-400"
                  }`}
                ></span>

                <div>
                  <p className="font-bold">{a.label}</p>
                  <p className="text-sm text-gray-700">{a.address}</p>
                  <p className="text-sm text-green-700 mt-1">{a.user}</p>
                </div>
              </div>

              {a.default && (
                <Badge className="bg-green-100 text-green-700">
                  Default
                </Badge>
              )}
            </div>
          </div>
        ))}

        {/* Add New Address */}
        <div className="border-2 border-dashed rounded-xl p-4 flex justify-center items-center text-green-700 cursor-pointer hover:bg-green-50 transition">
          <Plus className="mr-2" /> Add New Address
        </div>
      </div>
    </Card>
  )
}
