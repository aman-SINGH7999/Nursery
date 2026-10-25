import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Store } from "lucide-react"
import { FaSeedling, FaTools } from "react-icons/fa"
import { GiPlantWatering } from "react-icons/gi"

export default function NotFound404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FCF9] px-4">
      <div className="max-w-3xl w-full text-center">
        
        {/* Icon Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow">
            <GiPlantWatering className="text-orange-400" size={30} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-7xl font-black leading-none">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          Oops! Looks like this plant hasn't grown yet.
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mt-3">
          The page you are looking for might have been moved, deleted, or possibly never existed.
          Let's get you back to our garden.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-5 rounded-lg"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="mr-2" size={18} /> Go to Homepage
          </Button>

          <Button
            variant="outline"
            className="px-6 py-5 rounded-lg"
            onClick={() => (window.location.href = "/shop")}
          >
            <Store className="mr-2" size={18} /> Browse Shop
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          
          <Card className="p-4 flex flex-col items-center">
            <FaSeedling className="text-green-500" size={28} />
            <h3 className="font-semibold mt-2">Indoor Plants</h3>
            <p className="text-sm text-gray-500">Bring nature inside your home.</p>
          </Card>

          <Card className="p-4 flex flex-col items-center">
            <GiPlantWatering className="text-green-500" size={28} />
            <h3 className="font-semibold mt-2">Succulents</h3>
            <p className="text-sm text-gray-500">Low maintenance beauties.</p>
          </Card>

          <Card className="p-4 flex flex-col items-center">
            <FaTools className="text-green-500" size={28} />
            <h3 className="font-semibold mt-2">Gardening Tools</h3>
            <p className="text-sm text-gray-500">Essentials for your garden.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
