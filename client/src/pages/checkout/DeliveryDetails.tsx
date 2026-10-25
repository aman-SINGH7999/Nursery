import { Card } from "@/components/ui/card"
import { Truck, Package2 } from "lucide-react"

export default function DeliveryDetails() {
  return (
    <Card className="max-w-3xl w-full p-6 space-y-5 rounded-2xl border shadow-sm">
      {/* Title */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Truck className="text-green-600" />
        <span>2. Delivery Details</span>
      </div>

      {/* Delivery Box */}
      <div className="bg-green-50 border border-green-300 rounded-xl p-4 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border">
          <Package2 className="text-green-600" />
        </div>

        <div>
          <p className="font-semibold text-lg">
            Arriving by Thu, Oct 24
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Plants are shipped in 100% recyclable, safe packaging to ensure they
            arrive happy and healthy.
          </p>
        </div>
      </div>
    </Card>
  )
}
