import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CloudSun, Cloudy, Droplets, Leaf, Package, ShoppingCart, Sprout, Sun, Van } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="">

      {/* Hero section */}
      <div className="py-12 px-4 mx-auto max-w-7xl flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 space-y-6">
          
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Bring <span className="text-green-600">Nature</span> Home
          </h1>

          <p className="text-gray-600 max-w-lg md:max-w-md">
            Discover our curated collection of air-purifying and decorative plants
            delivered fresh to your doorstep. Transform your space into a green sanctuary.
          </p>

          <div className="flex gap-4">
            <Button>Shop Plants</Button>
            <Button variant="outline">Explore Categories</Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/cactus.jpg"
            alt="homeImg"
            className="w-full  rounded-xl object-cover"
          />
        </div>

      </div>

      {/* Provides */}
      <div className="bg-green-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-green-200 text-green-600">
                <Package />
              </div>
              <div className="font-semibold">Safe Packaging</div>
              <div className="text-gray-600 text-sm">
                Damage-free delivery guaranteed
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-green-200 text-green-600">
                <Leaf />
              </div>
              <div className="font-semibold">Fresh Plants</div>
              <div className="text-gray-600 text-sm">
                Direct from our nursery
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-green-200 text-green-600">
                <Sprout />
              </div>
              <div className="font-semibold">Easy Maintenance</div>
              <div className="text-gray-600 text-sm">
                Simple care, beginner-friendly plants
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-green-200 text-green-600">
                <Van />
              </div>
              <div className="font-semibold">Fast Delivery</div>
              <div className="text-gray-600 text-sm">
                Delivered within 24–48 hours
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        
    
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Explore by Category
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          
          {[
            { title: "Indoor Plants", img: "/cactus.jpg" },
            { title: "Outdoor Plants", img: "/flower-1.jpg" },
            { title: "Flowering", img: "/flower-2.jpg" },
            { title: "Medicinal", img: "/cactus.jpg" },
            { title: "Seeds", img: "/flower-2.jpg" },
            { title: "Pots", img: "/flower-1.jpg" },
          ].map((cat) => (
            <div key={cat.title} className="text-center group cursor-pointer">
              <Card className="overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-lg aspect-square">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Card>
              <div className="mt-3 font-semibold text-sm group-hover:text-green-600 transition">
                {cat.title}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Best Selling Plants */}
      <div className="bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          
          {/* Heading */}
          <div className="mb-10 text-center md:text-left flex justify-between">
            <h2 className="text-3xl font-bold">
              Best Selling Plants
            </h2>
            <Link to="#" className="flex text-blue-600 text-sm font-semibold justify-center items-center">
              <span>View All </span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id:"A1",
                name: "Fiddle Leaf Fig",
                price: 45.00,
                badgeIcon: <Sun size={14} />,
                badgeColor: "bg-orange-50 text-orange-600",
                badge: "Bright Light",
                description: "A popular indoor tree with large, violin-shaped leaves."
              },
              {
                id:"A2",
                name: "Snake Plant",
                price: 28.00,
                badgeIcon: <Cloudy size={14} />,
                badgeColor: "bg-blue-50 text-blue-600",
                badge: "Low Light",
                description: "Hardy and air-purifying, perfect for beginners."
              },
              {
                id:"A3",
                name: "Monstera",
                price: 35.00,
                badgeIcon: <CloudSun size={14} />,
                badgeColor: "bg-yellow-50 text-yellow-600",
                badge: "Indirect Light",
                description: "Known as the Swiss Cheese Plant, adds a tropical feel."
              },
              {
                id:"A4",
                name: "Peace Lily",
                price: 22.00,
                badgeIcon: <Droplets size={14} />,
                badgeColor: "bg-blue-100 text-blue-800",
                badge: "Keeps Moist",
                description: "Elegant white blooms and glossy green leaves."
              }
            ].map((data) => (
              <Card
                key={data.id}
                className="flex gap-4 p-4 rounded-2xl shadow-sm hover:shadow-md transition group"
              >
                
                {/* Image */}
                <div className="w-36 h-36 flex-shrink-0 overflow-hidden rounded-xl bg-white">
                  <img
                    src="/house-plant.jpg"
                    alt="flower"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1">
                  
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-lg">
                          {data.name}
                        </div>
                        <div className={`flex items-center gap-1 text-xs max-w-fit p-1 rounded-md ${data.badgeColor}`}>
                          {data?.badgeIcon}
                          {data.badge}
                        </div>
                      </div>
                      <div className="font-bold text-blue-600">
                        ${data.price}.00
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">
                      {data.description}
                    </p>
                  </div>

                  <Button className="mt-4 w-full bg-blue-100 text-blue-600 font-bold hover:bg-blue-600 hover:text-white p-1">
                    <ShoppingCart className="mr-2" size={16} />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
