import { Outlet } from 'react-router-dom';
import Sidebar from "@/components/landing/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
const Overview = () => {

  return (
    <div className="flex min-h-screen text-gray-900 bg-white">
      <Sidebar />
      <div className="flex-1">
        <Navbar/>
        <div className="px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Overview;
