import { FiSearch, FiBell } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="w-full h-16 bg-white flex items-center justify-between px-6 border-b">
      <div className="flex items-center gap-3 bg-[#ECF2EC] px-4 py-2 rounded-lg w-96">
        <FiSearch className="text-green-700 text-lg" />
        <input
          className="bg-transparent outline-none text-sm w-full"
          placeholder="Quick search..."
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <FiBell className="text-green-700 text-xl" />
          <span className="absolute right-[-2px] top-[-2px] h-3 w-3 bg-green-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://i.pravatar.cc/150" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-[15px] font-medium">Admin User</p>
            <p className="text-xs text-gray-500 -mt-1">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
