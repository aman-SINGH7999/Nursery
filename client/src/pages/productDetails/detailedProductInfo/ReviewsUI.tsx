import React from "react";

export default function ReviewsUI() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>

      <div className="border p-4 rounded-lg">
        <p className="font-medium">Aman Singh</p>
        <p className="text-yellow-500">★★★★★</p>
        <p className="text-gray-600">
          Beautiful plant! Came in perfect condition and looks amazing
          in my living room.
        </p>
      </div>

      <div className="border p-4 rounded-lg">
        <p className="font-medium">Priya Sharma</p>
        <p className="text-yellow-500">★★★★☆</p>
        <p className="text-gray-600">
          Very healthy plant. Packing was great. Just took 1 extra day
          in delivery.
        </p>
      </div>
    </div>
  );
}
