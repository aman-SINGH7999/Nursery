import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck } from "lucide-react";

export default function OrderCard({
  status = "in-transit", // in-transit | delivered
  placedDate = "Oct 24, 2023",
  total = "$45.00",
  orderId = "#PLNT-8832",
  etaDate = "Oct 28",
  deliveredDate = "Sep 18",
  products = [
    "/house-plant.jpg",
    "/house-plant.jpg",
    "/house-plant.jpg",
  ],
}) {
  const isDelivered = status === "delivered";

  return (
    <Card className="p-5 rounded-2xl shadow-sm hover:shadow-md transition bg-white">
      {/* Top Row */}
      <div className="flex justify-between items-start flex-wrap gap-3 pb-4 border-b">
        <div className="flex gap-10 text-sm">
          <div>
            <p className="text-gray-500">ORDER PLACED</p>
            <p className="font-semibold">{placedDate}</p>
          </div>
          <div>
            <p className="text-gray-500">TOTAL</p>
            <p className="font-semibold">{total}</p>
          </div>
          <div>
            <p className="text-gray-500">ORDER ID</p>
            <p className="font-semibold">{orderId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          {isDelivered ? (
            <>
              <CheckCircle size={18} />
              Delivered
            </>
          ) : (
            <>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              In Transit
            </>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 pt-4
        grid-cols-1
        md:grid-cols-[1.2fr_2fr]
        lg:grid-cols-[1fr_1.5fr_1fr]
        items-center"
      >
        {/* Product Thumbnails */}
        <div className="flex items-center gap-2 flex-wrap">
          {products.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-14 h-14 rounded-xl object-cover border"
            />
          ))}

          {products.length > 2 && (
            <div className="w-14 h-14 rounded-xl bg-gray-100 border flex items-center justify-center font-semibold text-gray-600">
              +{products.length - 2}
            </div>
          )}
        </div>

        {/* Text Section */}
        <div>
          {isDelivered ? (
            <p className="font-semibold">
              Delivered on{" "}
              <span className="text-green-700">{deliveredDate}</span>
            </p>
          ) : (
            <p className="font-semibold">
              Estimated Delivery:{" "}
              <span className="text-green-700">{etaDate}</span>
            </p>
          )}

          <p className="text-sm text-gray-500">
            Monstera Deliciosa, Snake Plant Laurentii, Ceramic Pot (6 inch)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-start md:justify-end flex-wrap">
          <Button variant="outline">View Details</Button>

          {isDelivered ? (
            <Button variant="outline" className="gap-1">
              Buy Again
            </Button>
          ) : (
            <Button className="bg-green-500 hover:bg-green-600 gap-1">
              <Truck size={16} />
              Track Order
            </Button>
          )}
        </div>
      </div>

    </Card>
  );
}
