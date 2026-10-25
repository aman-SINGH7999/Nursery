import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Truck, Leaf } from "lucide-react";

export default function OrderSummary() {
  return (
    <Card className="p-6 rounded-2xl shadow-md bg-white w-full mx-auto">
      <h2 className="text-xl font-bold">Order Summary</h2>

      {/* Price Details */}
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Subtotal</span>
          <span className="font-semibold">$110.00</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Delivery</span>
          <span className="font-semibold">$15.00</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Estimated Tax</span>
          <span className="font-semibold">$8.80</span>
        </div>
      </div>

      <hr className="my-5" />

      {/* Promo Code */}
      <div>
        <p className="text-sm font-medium mb-1">Promo Code</p>

        <div className="flex gap-2">
          <Input
            placeholder="Enter code"
            className="border-green-400 focus-visible:ring-green-500"
          />
          <Button
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            Apply
          </Button>
        </div>
      </div>

      <hr className="my-5" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Total</div>
        <div className="text-3xl font-bold">$133.80</div>
      </div>
      <p className="text-[10px] text-gray-500 text-right">USD</p>

      {/* Checkout Button */}
      <Button className="w-full h-12 text-white font-semibold text-md mt-4 bg-green-500 hover:bg-green-600">
        Proceed to Checkout →
      </Button>

      {/* Badges */}
      <div className="mt-6 flex items-center justify-center gap-10 text-xs text-gray-600">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck size={20} className="text-green-500" />
          <span>SECURE</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Truck size={20} className="text-green-500" />
          <span>FAST SHIP</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Leaf size={20} className="text-green-500" />
          <span>FRESH</span>
        </div>
      </div>
    </Card>
  );
}
