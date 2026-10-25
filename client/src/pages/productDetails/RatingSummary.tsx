import { Star } from "lucide-react";

export default function RatingSummary() {
  const ratings = [
    { star: 5, percent: 78 },
    { star: 4, percent: 15 },
    { star: 3, percent: 4 },
    { star: 2, percent: 1 },
    { star: 1, percent: 2 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border w-full">
      <h2 className="text-lg font-semibold mb-3">Rating Summary</h2>

      {/* Average Rating */}
      <div className="flex items-center gap-4">
        <div className="text-5xl font-bold">4.8</div>

        <div>
          <div className="flex text-yellow-400">
            {[1,2,3,4,5].map((i)=>(
              <Star key={i} fill="#facc15" stroke="none" />
            ))}
          </div>
          <p className="text-sm text-gray-500">Based on 124 reviews</p>
        </div>
      </div>

      {/* Bars */}
      <div className="mt-4 space-y-2">
        {ratings.map((r) => (
          <div key={r.star} className="flex items-center gap-2">
            <span className="w-4 text-sm">{r.star}</span>

            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${r.percent}%` }}
              ></div>
            </div>

            <span className="text-sm font-medium text-gray-600">
              {r.percent}%
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="w-full mt-5 border rounded-xl py-2 text-gray-700 hover:bg-gray-50">
        Write a Review
      </button>
    </div>
  );
}
