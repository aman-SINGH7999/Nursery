import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  ShoppingCart,
  Package,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User size={20} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => navigate("/likes")}>
          <Package className="mr-2 h-4 w-4" />
          Likes
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/cart")}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/orders")}>
          <Package className="mr-2 h-4 w-4" />
          Orders
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <Package className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => console.log("logout")}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
