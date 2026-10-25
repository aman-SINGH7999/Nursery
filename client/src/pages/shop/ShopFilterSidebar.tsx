import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ListFilterPlus, RotateCcw } from 'lucide-react';
import { useState } from "react";

export default function ShopFilterSidebar() {
  const [price, setPrice] = useState([200])

  return (
    <div className="w-64 lg:w-72 bg-white  rounded-xl py-6 space-y-6 sticky top-24 h-fit">

      <div className="flex justify-between">
        <h2 className="text-xl font-bold flex gap-1">
          <ListFilterPlus className="text-green-600" />
          Filters
        </h2>
        <Button variant="outline" size='sm' className="text-md flex items-center gap-1 border-none shadow-none">
          <RotateCcw size={16} className="text-red-600" />
          Reset
        </Button>
      </div> 

      {/* CATEGORY */}
      <Accordion type="single" collapsible defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Indoor", "Outdoor", "Flowering", "Medicinal"].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* PRICE */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              defaultValue={[200]}
              max={1000}
              step={10}
              onValueChange={setPrice}
            />
            <div className="mt-2 text-sm font-semibold">
              ₹0 — ₹{price[0]}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* LIGHT */}
      <Accordion type="single" collapsible>
        <AccordionItem value="light">
          <AccordionTrigger>Light Requirement</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Low Light", "Medium Light", "Bright Light"].map((l) => (
                <label key={l} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span className="text-sm">{l}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* WATER */}
      <Accordion type="single" collapsible>
        <AccordionItem value="water">
          <AccordionTrigger>Water Requirement</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Less Water", "Medium Water", "High Water"].map((l) => (
                <label key={l} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span className="text-sm">{l}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* STOCK */}
      <Accordion type="single" collapsible>
        <AccordionItem value="stock">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox />
                <span className="text-sm">In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox />
                <span className="text-sm">Out of Stock</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
