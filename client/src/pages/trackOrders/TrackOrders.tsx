import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Slider } from '@/components/ui/slider'
import React from 'react'
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { Card } from '@/components/ui/card';
import { LuTruck } from "react-icons/lu";
import TrackOrderSummary from './TrackOrderSummary';
import ItemsOrderedCard from './ItemsOrderedCard';
import { GoLocation } from "react-icons/go";
import { MdPayment } from "react-icons/md";
import OrderSuccess from './OrderSuccess';



export default function TrackOrders() {
   return (
    <div>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
          { label: "Track Orders" },
        ]}
      />

        {/* thankyou */}
        <OrderSuccess />
      <div className="max-w-7xl mx-auto flex gap-6 px-4 min-h-screen flex-col md:flex-row">

        {/* main */}
         <main className="flex-1 space-y-10 py-5">
            <div className='flex max-w-3xl w-full flex-col gap-2'>
              <div>
                <h1 className="text-2xl font-semibold flex items-center gap-2 pb-5"><LuTruck className='text-green-600' />Estimated Delivery</h1>
                <h2 className='text-3xl font-bold '>Friday, May 24th</h2>
                <div className="text-xl text-gray-500 pb-5">Your package is being prepared at our nursery.</div>
              </div>
              <div>
                <div className='flex justify-between'>
                  <div>Order Placed</div>
                  <div>Processing</div>
                  <div>Shipped</div>
                  <div>Delivered</div>
                </div>
                <Slider value={[40]} ></Slider>
              </div>
            </div>

            {/* Shipping Items */}
            <ItemsOrderedCard />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {/* Delivery Address */}
              <Card className=' p-5'>
                <div className='flex gap-2 text-lg font-semibold items-center'>
                  <GoLocation className='text-green-400'/>
                  Shipping Address
                </div>
                <div className='text-gray-600'>
                  Sarah Jenkins
                  42 Green Street, Apt 3B
                  San Francisco, CA 94103
                  United States
                </div>
              </Card>

              {/* payments Method */}
              <Card className=' p-5'>
                <div className='flex gap-2 text-lg font-semibold items-center'>
                  <MdPayment className='text-green-400'/>
                  Payment Method
                </div>
                <div className='text-gray-600'>
                  <div>Visa ending in 4242</div>
                  <div>Exp: 12/26</div>
                </div>
              </Card>
            </div>
         </main>
         {/* summary */}
        <aside className="flex-none w-full md:w-72 lg:w-96 sticky top-24 self-start h-fit py-5">
          <TrackOrderSummary />

          <Card className='p-2 flex gap-2 border-green-300 bg-green-50 my-5'>
            <div className='p-1 text-green-600'><TfiHeadphoneAlt /></div>
            <div>
              <div className='font-semibold text-green-600'>Need help?</div>
              <div className='text-xs'>Contact our plant experts if you have questions about your order.</div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
