import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiClipboard,
} from "react-icons/fi";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <FiGrid /> },
    { name: "Products", icon: <FiShoppingBag />, active: true },
    { name: "Orders", icon: <FiClipboard /> },
    { name: "Users", icon: <FiUsers /> },
    { name: "Offers", icon: <FiTag /> },
    { name: "Reports", icon: <FiBarChart2 /> },
  ];

  return (
    <aside className="w-64 bg-white h-full border-r flex flex-col justify-between">
      <div>
        <div className="px-6 py-6 flex items-center gap-3">
          <img
            src="/main-logo.png"
            className="h-10 w-10 rounded-lg object-cover border"
          />
          <h1 className="text-lg font-semibold">GreenSprout</h1>
        </div>

        <nav className="px-3 mt-4 space-y-1">
          {menu.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] 
              ${item.active 
                ? "bg-green-100 text-green-700 font-medium" 
                : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 mb-6 space-y-1">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 w-full">
          <FiSettings className="text-xl" />
          Settings
        </button>

        <button className="flex items-center gap-3 px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 w-full">
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </aside>
  );
}
