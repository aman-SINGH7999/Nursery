import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ItemsOrderedCard() {
  return (
    <Card className="p-6 rounded-2xl shadow-sm bg-[#F8FBF8]">
      <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>

      {
        [1,2,3].map(()=>{
          return (
            <>
            <Separator className="my-4" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-100">
                  <img
                    src="/house-plant.jpg"
                    alt="Monstera Leaf"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <h3 className="font-semibold leading-tight">Monstera Deliciosa</h3>
                  <p className="text-sm text-gray-600">Size: Large (10")</p>
                  <p className="text-sm text-gray-600">Qty: 1</p>
                </div>
              </div>

              <p className="font-semibold text-gray-800">$45.00</p>
            </div>
          </>
          )
        })
      }
    </Card>
  )
}
