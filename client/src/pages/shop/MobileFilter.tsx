import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import ShopFilterSidebar from "./ShopFilterSidebar";

export default function MobileFilter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="">
          <ListFilter size={18} /> Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[85vw] p-4 overflow-y-auto">
        <ShopFilterSidebar />
      </SheetContent>
    </Sheet>
  );
}
