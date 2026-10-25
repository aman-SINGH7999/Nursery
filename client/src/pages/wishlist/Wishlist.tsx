import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Badge } from '@/components/ui/badge'
import WishlistCard from './WishlistCard';

export default function Wishlist() {
  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
          { label: "Wishlist" },
        ]}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-6 p-4 ">
        <div className='w-full flex flex-col sm:flex-row justify-between'>
          <div>
            <h1 className="text-4xl font-bold">My Jungle Wishlist</h1>
            <div className="text-xl text-gray-500">Manage your saved plants for later.</div>
          </div>
          <div className='flex sm:justify-center justify-end items-end'>
            <Badge className='p-2 '>4 Item Saved</Badge>
          </div>
        </div>
        <div>

          {/* Card */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {[1,2,3,4,5,6].map((i) => (
              <WishlistCard key={i} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
