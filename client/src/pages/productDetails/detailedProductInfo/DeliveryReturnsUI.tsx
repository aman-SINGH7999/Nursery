import React from "react";

export default function DeliveryReturnsUI() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Delivery & Returns</h2>

      <div>
        <h3 className="font-medium">🚚 Delivery</h3>
        <p className="text-gray-600">
          Plants are delivered with extra care in secure packaging.
          Estimated delivery: <span className="font-medium">3 – 7 working days</span>.
        </p>
      </div>

      <div>
        <h3 className="font-medium">📦 Packaging</h3>
        <p className="text-gray-600">
          Packed with protective material to avoid damage during transit.
        </p>
      </div>

      <div>
        <h3 className="font-medium">↩️ Returns</h3>
        <p className="text-gray-600">
          If plant arrives damaged, we offer replacement or refund within
          24–48 hours of delivery proof.
        </p>
      </div>
    </div>
  );
}
