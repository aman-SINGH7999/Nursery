import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Slider } from '@/components/ui/slider'
import React from 'react'
import CheckoutOrderSummary from './CheckoutOrderSummary'
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { Card } from '@/components/ui/card';
import ShippingAddress from './ShippingAddress';
import PaymentMethod from './PaymentMethod';
import DeliveryDetails from './DeliveryDetails';

export default function Checkout() {
  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
          { label: "Checkout" },
        ]}
      />

      <div className="max-w-7xl mx-auto flex gap-6 px-4 min-h-screen flex-col md:flex-row">
        {/* main */}
         <main className="flex-1 space-y-10 py-5">
            <div className='flex max-w-3xl w-full flex-col gap-2'>
              <div>
                <h1 className="text-4xl font-bold">Checkout</h1>
                <div className="text-xl text-gray-500">Secure your green friends today.</div>
              </div>
              <div>
                <div className='flex justify-between'>
                  <div>Cart</div>
                  <div>Checkout</div>
                  <div>Confirmation</div>
                </div>
                <Slider value={[50]} ></Slider>
              </div>
            </div>

            {/* Shipping Address */}
            <ShippingAddress />

            {/* Delivery Details */}
            <DeliveryDetails />

            {/* payments Method */}
            <PaymentMethod />
         </main>
         {/* summary */}
        <aside className="flex-none w-full md:w-72 lg:w-96 sticky top-24 self-start h-fit py-5">
          <CheckoutOrderSummary />

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
