
import { Check } from "lucide-react"

export default function OrderSuccess({
  orderId = "GLN-82941",
  email = "customer@email.com",
}) {
  return (
    <div className="w-full bg-[#F8FBF8] rounded-2xl py-10 px-4 text-center flex flex-col items-center justify-center">
      
      {/* ICON */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
      </div>

      {/* HEADING */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
        Thank You for Your Order!
      </h1>

      {/* MESSAGE */}
      <p className="text-gray-600 mt-2 max-w-xl">
        We've received your order <span className="font-semibold text-gray-900">#{orderId}</span> 
        and will begin processing it right away.
      </p>

      <p className="text-gray-500 mt-1">
        A confirmation email has been sent to <span className="font-medium text-gray-900">{email}</span>
      </p>
    </div>
  )
}
