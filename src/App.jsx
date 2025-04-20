import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Reviews from "./pages/Reviews";
import CustomerOrderDetails from "./pages/CustomerOrderDetails";
import CustomerOrders from "./pages/CustomerOrders";
import Menu from "./pages/Menu";
import Inventory from "./pages/Inventory";
// import MenuContent from "./pages/MenuContent";
import MenuDetails from "./menu/Menu";

function App() {
  return (
    <div className="font-cormorant">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customer-orders" element={<CustomerOrders />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/orders/:id" element={<CustomerOrderDetails />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetails />} />
          {/* <Route path="/menu/:id" element={<MenuContent />} /> */}
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/inventory" element={<Inventory />} /> 
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
