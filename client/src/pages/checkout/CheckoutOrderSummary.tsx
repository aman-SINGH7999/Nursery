import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Lock } from "lucide-react"

export default function CheckoutOrderSummary() {
  return (
    <Card className="md:max-w-md w-full rounded-xl shadow-sm border p-5 space-y-5">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      <Separator />

      {/* PRODUCTS */}
      <div className="space-y-4"> 
        {/* Item 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/house-plant.jpg"
              className="w-14 h-14 rounded-lg object-cover"
              alt=""
            />
            <div>
              <p className="font-medium">Monstera Deliciosa</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
          </div>
          <p className="font-medium">$25.00</p>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/house-plant.jpg"
              className="w-14 h-14 rounded-lg object-cover"
              alt=""
            />
            <div>
              <p className="font-medium">Snake Plant</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
          </div>
          <p className="font-medium">$15.00</p>
        </div>
      </div>

      <Separator />

      {/* PRICE DETAILS */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <p className="text-gray-500">Subtotal</p>
          <p>$40.00</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Shipping</p>
          <p className="text-green-600 font-medium">Free</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Tax</p>
          <p>$2.00</p>
        </div>
      </div>

      <Separator />

      {/* TOTAL */}
      <div className="flex justify-between items-center text-lg font-bold">
        <p>Total</p>
        <p>$42.00</p>
      </div>

      {/* BUTTON */}
      <Button className="w-full h-12 text-base bg-green-500 hover:bg-green-600">
        Place Order →
      </Button>

      {/* Secure text */}
      <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
        <Lock size={16} /> Secure SSL Encrypted Transaction
      </div>
    </Card>
  )
}
