import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import BranchManagerLayout from "./components/BranchManagerLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerOrderDetails from "./pages/CustomerOrderDetails";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Menu from "./pages/Menu";
import MenuDetails from "./menu/Menu";
import Reviews from "./pages/Reviews";
import Inventory from "./pages/Inventory";
import Staffs from "./pages/Staffs";
import Services from "./pages/Services";
import RestaurantDashboard from "./pages/Restaurants";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauth";
import OwnerLayout from "./components/OwnerLayout";
import LocationManagement from "./pages/Location";
import KitchenDashboard from "./pages/KitchenDashboard";
import StockMovements from "./pages/StockMovements";

function App() {
  return (
    <div className="font-cormorant">
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/:role" element={<Login />} />
        <Route path="/:role/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Shared Layout (Admin + Branch Manager) */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<CustomerOrderDetails />} />
            <Route path="/customer-orders" element={<CustomerOrders />} /> */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuDetails />} /> */}
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/stock" element={<StockMovements />} />
            <Route path="/staffs" element={<Staffs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/restaurants" element={<RestaurantDashboard />} />
          </Route>
        </Route>

        {/* Branch Manager-Only Layout */}
        <Route element={<ProtectedRoute allowedRoles={["branch-manager"]} />}>
          <Route element={<BranchManagerLayout />}>
            <Route path="/branch-dashboard" element={<Dashboard />} />
            <Route path="/branch-orders" element={<Orders />} />
            <Route path="/branch-inventory" element={<Inventory />} />
            <Route path="/branch-stock" element={<StockMovements />} />
            <Route path="/branch-staffs" element={<Staffs />} />
            <Route path="/branch-restaurants" element={<RestaurantDashboard />} />
            <Route path="/kitchen" element={<KitchenDashboard />} />

          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["restaurant-owner"]} />}>
          <Route element={<OwnerLayout />}>
          <Route path="/owner-dashboard" element={<Dashboard />} />
            <Route path="/owner-orders" element={<Orders />} />
            <Route path="/orders/:id" element={<CustomerOrderDetails />} />
            <Route path="/customer-orders" element={<CustomerOrders />} />
            {/* <Route path="/messages" element={<Messages />} />
            <Route path="/calendar" element={<Calendar />} /> */}
            <Route path="/owner-menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuDetails />} />
            <Route path="/owner-reviews" element={<Reviews />} />
            <Route path="/owner-inventory" element={<Inventory />} />
            <Route path="/owner-stock" element={<StockMovements />} />
            <Route path="/owner-staffs" element={<Staffs />} />
            <Route path="/owner-locations" element={<LocationManagement />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
