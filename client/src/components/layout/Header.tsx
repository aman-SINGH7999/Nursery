import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";

export default function Header() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">

        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between md:hidden">
          
          {/* Left: Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <div className="mb-6 flex items-center gap-2">
                <img
                  src="/main-logo.png"
                  alt="GreenThumb Logo"
                  className="h-9 w-36 object-contain"
                />
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search plants..." className="pl-10" />
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <Link to="/" className="hover:text-green-600">Home</Link>
                <Link to="/shop" className="hover:text-green-600">Shop</Link>
                <Link to="#" className="hover:text-green-600">Care Guide</Link>
                <Link to="#" className="hover:text-green-600">About</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <div className="flex items-center">
            <img
              src="/main-logo.png"
              alt="GreenThumb Logo"
              className="h-9 w-36 object-contain"
            />
          </div>

          {/* Right: Profile */}
          <ProfileMenu />
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden md:flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <img
              src="/main-logo.png"
              alt="GreenThumb Logo"
              className="h-9 w-28 object-contain"
            />
          </Link>


          {/* Search */}
          <div className="relative md:w-[250px] lg:w-[420px] rounded-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search for plants, pots, or accessories..."
              className="pl-10 rounded-full"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 lg:gap-6">
            <nav className="flex gap-6 text-sm font-medium">
              <Link to="/" className="text-muted-foreground hover:text-black">Home</Link>
              <Link to="/shop" className="text-green-600 font-semibold">Shop</Link>
              <Link to="#" className="text-muted-foreground hover:text-black">Care Guide</Link>
              <Link to="#" className="text-muted-foreground hover:text-black">About</Link>
            </nav>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex justify-center items-center">
                3
              </Badge>
            </Button>

            {/* Profile */}
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
