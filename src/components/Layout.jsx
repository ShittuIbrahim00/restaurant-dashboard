import { Outlet, Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="grid grid-cols-12 gap-4 bg-customColor">
      {/* Sidebar */}
      <div className="col-span-12 sm:col-span-2 bg-white p-4 shadow h-screen sticky top-0">
        <h2 className="text-4xl font-merienda font-bold mb-6">Billing</h2>
        <ul className="space-y-4 text-lg">
          <li className={location.pathname === "/" ? "text-orange-500 font-semibold" : ""}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={location.pathname === "/orders" ? "text-orange-500 font-semibold" : ""}>
            <Link to="/orders">Orders</Link>
          </li>
          <li className={location.pathname === "/messages" ? "text-orange-500 font-semibold" : ""}>
            <Link to="/messages">Messages</Link>
          </li>
          <li className={location.pathname === "/calendar" ? "text-orange-500 font-semibold" : ""}>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li className={location.pathname === "/menu" ? "text-orange-500 font-semibold" : ""}>
            <Link to="/menu">Menu</Link>
          </li>
          <li className={location.pathname === "/inventory" ? "text-orange-500 font-semibold" : ""}>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li className={location.pathname === "/reviews" ? "text-orange-500 font-semibold" : ""}>
            <Link to="/reviews">Reviews</Link>
          </li>
        </ul>

        <div className="mt-auto pt-10">
          <Card className="bg-orange-100 p-4 rounded-xl">
            <p className="font-semibold mb-2">
              Streamline restaurant management with real-time insights.
            </p>
            <Button className="bg-orange-500 text-white mt-2">Upgrade Now</Button>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-12 sm:col-span-10 p-4 space-y-4">
        {/* Top Nav */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-merienda ml-4 capitalize">
            {location.pathname.replace("/", "") || "Dashboard"}
          </h1>
          <div className="flex items-center gap-3">
            <Input placeholder="Search anything" className="w-64" />
            <img src="/avatar.png" alt="User" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Page-specific content goes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
