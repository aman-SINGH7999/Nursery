import PageBreadcrumb from '@/components/PageBreadcrumb'
import CartCard from './CartCard'
import OrderSummary from './OrderSummary'


export default function ShoppingCart() {
  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shopping Cart", href: "/shopping-cart" },
        ]}
      />

      <div className="max-w-7xl mx-auto flex gap-6 px-4 pb-10 pt-2">
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 w-full'>
          {/* Cart */}
          <div className='col-span-2 flex flex-col gap-2'>
          <CartCard />
          <CartCard />
          <CartCard />
          </div>

          {/* Order Summary */}
          <div className='col-span-2 lg:col-span-1'>
           <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
