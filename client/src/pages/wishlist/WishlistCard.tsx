import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WishlistCard() {
  return (
    <Card className="flex flex-col group overflow-hidden hover:border-green-300 transition-all duration-300">
      {/* IMAGE */}
      <div className="relative">
        <img
          src="/house-plant.jpg"
          alt="Monstera Deliciosa"
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        <Badge className="absolute top-2 left-2">IN WISHLIST</Badge>

        {/* Remove Button */}
        <Button className="absolute top-2 right-2 w-7 h-7 invisible group-hover:visible bg-white/30 hover:bg-white/60 rounded-full hover:text-red-600">
          <Trash2 size={16} />
        </Button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col p-4 space-y-5">
        <div>
          <h2 className="text-lg font-bold">Monstera Deliciosa</h2>
          <h3 className="text-gray-500 text-sm italic">Swiss Cheese Plant</h3>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="text-xs text-gray-400 line-through">$55.00</div>
            <div className="text-base font-semibold">$45.00</div>
          </div>

          <Button variant="outline" className="hover:bg-green-500" size={"sm"}>
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
