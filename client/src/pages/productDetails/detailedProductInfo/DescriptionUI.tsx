import React from "react";

export default function DescriptionUI() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Monstera Deliciosa</h2>
      <p className="text-gray-600 leading-relaxed">
        The Monstera Deliciosa, also known as the Swiss Cheese Plant,
        is a stunning tropical houseplant famous for its big glossy leaves
        with natural holes and splits. It adds a bold, jungle vibe to any
        space and is perfect for living rooms, bedrooms, offices, or studios.
      </p>

      <p className="text-gray-600 leading-relaxed">
        It is easy to care for, grows quickly in the right environment, and
        can live for years. Perfect for both beginners and plant lovers.
      </p>

      <ul className="list-disc pl-6 text-gray-700">
        <li>Air purifying plant</li>
        <li>Grows large and beautiful</li>
        <li>Beginner friendly</li>
        <li>Low maintenance</li>
      </ul>
    </div>
  );
}
