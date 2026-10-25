import { Outlet } from 'react-router-dom'
import Sidebar from './components/admin/layout/Sidebar'
import Header from './components/admin/layout/Header'

export default function AdminApp() {
  return (
    <div className="flex h-screen bg-[#F4F7F3]">
      <Sidebar />

      {/* ADD min-w-0 HERE */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* AND HERE */}
        <main className="h-full overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

