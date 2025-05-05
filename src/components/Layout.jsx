import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    // { to: "/orders", label: "Orders" },
    { to: "/messages", label: "Messages" },
    { to: "/calendar", label: "Calendar" },
    // { to: "/menu", label: "Menu" },
    { to: "/inventory", label: "Inventory" },
    { to: "/stock", label: "Stock" },
    { to: "/reviews", label: "Reviews" },
    { to: "/staffs", label: "Staffs" },
    { to: "/services", label: "Web Services" },
    { to: "/restaurants", label: "Restaurants" },
    { to: "/purchase", label: "Purchase" },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 bg-customColor relative">
      {/* Mobile/Tablet Top Bar */}
      <div className="lg:hidden p-4 fixed top-0 left-0 w-full z-20 bg-white shadow flex justify-between items-center">
        <h2 className="text-3xl font-merienda font-bold">Billing</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:col-span-2 bg-white p-4 shadow h-screen sticky top-0">
        <h2 className="text-4xl font-merienda font-bold mb-6">Billing</h2>
        <ul className="space-y-4 text-lg">
          {navLinks.map((link) => (
            <li
              key={link.to}
              className={`${
                location.pathname === link.to ? "text-orange-500 font-semibold" : ""
              }`}
            >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <Card className="bg-orange-100 p-4 rounded-xl">
            <p className="font-semibold mb-2">
              Streamline restaurant management with real-time insights.
            </p>
            <Button className="bg-orange-500 text-white mt-2">
              Upgrade Now
            </Button>
          </Card>
        </div>
      </div>

      {/* Mobile Sidebar (Overlay when open) */}
      {mobileMenuOpen && (
        <div className="fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-white shadow p-4 z-30">
          <ul className="space-y-4 text-lg">
            {navLinks.map((link) => (
              <li
                key={link.to}
                className={`${
                  location.pathname === link.to ? "text-orange-500 font-semibold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="col-span-12 lg:col-span-10 p-4 mt-12 lg:mt-0 space-y-4">
        {/* Top Nav (Desktop only) */}
        <div className="hidden lg:flex justify-between items-center">
          <h1 className="text-3xl font-bold font-merienda ml-4 capitalize">
            {location.pathname.replace("/", "") || "Dashboard"}
          </h1>
          <div className="flex items-center gap-3">
            <Input placeholder="Search anything" className="w-64" />
            <img src="/avatar.png" alt="User" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
