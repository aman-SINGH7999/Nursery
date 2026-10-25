"use client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Wallet, DollarSign } from "lucide-react"
import { useState } from "react"

export default function PaymentMethod() {
  const [method, setMethod] = useState("cod")

  return (
    <Card className="max-w-3xl w-full p-6 space-y-5 rounded-2xl border shadow-sm">
      {/* Title */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Wallet className="text-green-600" />
        <span>3. Payment Method</span>
      </div>

      <Separator />

      <div className="space-y-4">

        {/* UPI */}
        <div
          onClick={() => setMethod("upi")}
          className={`border rounded-xl p-4 cursor-pointer transition-all flex justify-between items-center
          ${method === "upi" ? "border-green-500 bg-green-50 shadow-sm" : "border-gray-200"}
        `}
        >
          <div className="flex items-start gap-3">
            <span
              className={`h-4 w-4 rounded-full border mt-1 ${
                method === "upi" ? "border-green-600 bg-green-600" : "border-gray-400"
              }`}
            />
            <div>
              <h3 className="font-semibold">UPI</h3>
              <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
            </div>
          </div>

          <Wallet className="text-gray-500" />
        </div>

        {/* CARD */}
        <div
          onClick={() => setMethod("card")}
          className={`border rounded-xl p-4 cursor-pointer transition-all
          ${method === "card" ? "border-green-500 bg-green-50 shadow-sm" : "border-gray-200"}
        `}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-start gap-3">
              <span
                className={`h-4 w-4 rounded-full border mt-1 ${
                  method === "card" ? "border-green-600 bg-green-600" : "border-gray-400"
                }`}
              />
              <div>
                <h3 className="font-semibold">Credit / Debit Card</h3>
                <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
              </div>
            </div>
            <CreditCard className="text-gray-500" />
          </div>

          {/* Card Fields - show only when selected */}
          {method === "card" && (
            <div className="mt-4 space-y-3">
              <Input placeholder="Card Number" className="bg-white" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM / YY" className="bg-white" />
                <Input placeholder="CVV" className="bg-white" />
              </div>
            </div>
          )}
        </div>

        {/* CASH ON DELIVERY */}
        <div
          onClick={() => setMethod("cod")}
          className={`border rounded-xl p-4 cursor-pointer transition-all flex justify-between items-center
          ${method === "cod" ? "border-green-500 bg-green-50 shadow-sm" : "border-gray-200"}
        `}
        >
          <div className="flex items-start gap-3">
            <span
              className={`h-4 w-4 rounded-full border mt-1 ${
                method === "cod" ? "border-green-600 bg-green-600" : "border-gray-400"
              }`}
            />
            <div>
              <h3 className="font-semibold">Cash on Delivery</h3>
              <p className="text-sm text-gray-600">Pay when your plants arrive</p>
            </div>
          </div>

          <DollarSign className="text-gray-600" />
        </div>
      </div>
    </Card>
  )
}
