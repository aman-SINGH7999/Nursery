import React from "react";

export default function CareGuideUI() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Care Guide</h2>

      <div>
        <h3 className="font-medium">☀️ Light</h3>
        <p className="text-gray-600">
          Prefers bright, indirect sunlight. Avoid direct harsh sunlight
          as it can burn the leaves.
        </p>
      </div>

      <div>
        <h3 className="font-medium">💧 Water</h3>
        <p className="text-gray-600">
          Water when the top 2 inches of soil feels dry. Do not overwater.
          Ensure good drainage.
        </p>
      </div>

      <div>
        <h3 className="font-medium">🌡️ Temperature</h3>
        <p className="text-gray-600">
          Thrives in temperatures between 18°C – 30°C. Keep away from AC/
          direct cold air.
        </p>
      </div>

      <div>
        <h3 className="font-medium">🪴 Potting & Soil</h3>
        <p className="text-gray-600">
          Well-draining soil is best. Repot every 12–18 months for
          healthy growth.
        </p>
      </div>
    </div>
  );
}
