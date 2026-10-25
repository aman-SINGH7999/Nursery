import GlobalSelect from '@/components/GlobalSelect'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import OrderCard from './OrderCard';

export default function MyOrders() {
  const [sort, setSort] = useState("15_days");

  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Profile", href: "/profile" },
          { label: "My Orders" },
        ]}
      />
      <div className="max-w-7xl mx-auto flex flex-col gap-6 p-4 ">
        <div className='w-full flex flex-col sm:flex-row justify-between'>
          <div>
            <h1 className="text-4xl font-bold">My Order History</h1>
            <div className="text-xl text-gray-500">Manage and track your recent purchases.</div>
          </div>
          <div className='flex sm:justify-center justify-end items-end'>
            <GlobalSelect
              value={sort}
              onChange={setSort}
              placeholder="Sort by"
              className='items-end'
              options={[
                { label: "Last 15 Days", value: "15_days" },
                { label: "Last 30 Days", value: "30_days" },
                { label: "Last 3 Months", value: "3_months" },
                { label: "Last 6 Months", value: "6_months" },
                { label: "Last 1 Year", value: "1_year" },
                { label: "All", value: "all" },
              ]}
            />
          </div>
        </div>
        {/* Filter Button */}
        <div className='flex gap-2 overflow-x-auto p-2'>
          <Button >All Orders</Button>
          <Button variant={'outline'}>Processing</Button>
          <Button variant={'outline'}>Shipped</Button>
          <Button variant={'outline'}>Delivered</Button>
          <Button variant={'outline'}>Cancelled</Button>
        </div>

        {/* Order List */}
        <OrderCard
          status="in-transit"
          placedDate="Oct 24, 2023"
          total="$45.00"
          orderId="#PLNT-8832"
          etaDate="Oct 28"
          products={[
            "/house-plant.jpg",
            "/house-plant.jpg",
            "/house-plant.jpg",
          ]}
        />

        <OrderCard
          status="delivered"
          placedDate="Sep 15, 2023"
          total="$128.50"
          orderId="#PLNT-7421"
          deliveredDate="Sep 18"
          products={[
            "/house-plant.jpg",
            "/house-plant.jpg",
            "/house-plant.jpg",
          ]}
        />

        <OrderCard
          status="in-transit"
          placedDate="Jan 10, 2026"
          total="$30.00"
          orderId="#PLNT-5531"
          etaDate="Jan 14"
          products={[
            "/house-plant.jpg",
          ]}
        />

        <OrderCard
          status="delivered"
          placedDate="Nov 2, 2025"
          total="$210.00"
          orderId="#PLNT-9999"
          deliveredDate="Nov 6"
          products={[
            "/house-plant.jpg",
            "/house-plant.jpg",
            "/house-plant.jpg",
            "/house-plant.jpg",
          ]}
        />

      </div>
    </div>
  )
}
