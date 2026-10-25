import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import RatingSummary from "../RatingSummary";
import CareGuideUI from "./CareGuideUI";
import DeliveryReturnsUI from "./DeliveryReturnsUI";
import DescriptionUI from "./DescriptionUI";
import ReviewsUI from "./ReviewsUI";

export default function DetailedProductInfo() {
  return (
    <div className="">
      <Tabs defaultValue="description" className="">
        <TabsList className="border-b-2 w-full justify-start py-6 bg-white overflow-x-auto overflow-y-hidden">
          <TabsTrigger
            value="description"
            className="
                px-6 py-4 !shadow-none
                data-[state=active]:!shadow-none
                border-b-[3px] border-transparent
                data-[state=active]:border-green-500
                data-[state=active]:text-green-600
                hover:bg-gray-50
                data-[state=active]:hover:bg-gray-50
              "
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="care-guide"
            className="
                px-6 py-4 !shadow-none
                data-[state=active]:!shadow-none
                border-b-[3px] border-transparent
                data-[state=active]:border-green-500
                data-[state=active]:text-green-600
                hover:bg-gray-50
                data-[state=active]:hover:bg-gray-50
              "
          >
            Care Guide
          </TabsTrigger>
          <TabsTrigger
            value="delivery-and-returns"
            className="
                px-6 py-4 !shadow-none
                data-[state=active]:!shadow-none
                border-b-[3px] border-transparent
                data-[state=active]:border-green-500
                data-[state=active]:text-green-600
                hover:bg-gray-50
                data-[state=active]:hover:bg-gray-50
              "
          >
            Delivery & Returns
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="
                px-6 py-4 !shadow-none
                data-[state=active]:!shadow-none
                border-b-[3px] border-transparent
                data-[state=active]:border-green-500
                data-[state=active]:text-green-600
                hover:bg-gray-50
                data-[state=active]:hover:bg-gray-50
              "
          >
            Reviews (124)
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
          <div className="col-span-1 md:col-span-2">
            <TabsContent value="description" className="pt-6">
              {/*  Description UI */}
              <DescriptionUI />
            </TabsContent>

            <TabsContent value="care-guide" className="pt-6">
              {/*  Care Guide UI */}
              <CareGuideUI />
            </TabsContent>

            {/*  Delivery and Returns UI */}
            <TabsContent value="delivery-and-returns" className="pt-6">
              <DeliveryReturnsUI />
            </TabsContent>

            {/*  Reviews UI */}
            <TabsContent value="reviews" className="pt-6">
              <ReviewsUI />
            </TabsContent>
          </div>
          
          {/* Rating Summary */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <RatingSummary />
          </div>
        </div>
        
      </Tabs>
    </div>
  );
}
