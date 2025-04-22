// App.jsx  
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
import MenuDetails from "./menu/Menu";  
import Register from "./pages/Register";  
import Login from "./pages/Login";  
import Restaurants from "./pages/Restaurants";  
import Staffs from "./pages/Staffs";  
import BranchManagerLayout from "./components/BranchManagerLayout";  
import ProtectedRoute from "./components/ProtectedRoute";  
import Unauthorized from "./pages/Unauth";

function App() {  
  return (  
    <div className="font-cormorant">  
      <Routes>  
        {/* Generic login page at "/" */}  
        <Route path="/" element={<Login />} />  
        <Route path="/:role" element={<Login />} />  
        <Route path="/:role/register" element={<Register />} />  

        {/* Admin and Branch Manager Routes */}  
        <Route element={<ProtectedRoute allowedRoles={["admin", "branch-manager"]} />}>  
          <Route element={<Layout />}>  
            <Route path="/dashboard" element={<Dashboard />} />  
            <Route path="/orders" element={<Orders />} />  
            <Route path="/customer-orders" element={<CustomerOrders />} />  
            <Route path="/messages" element={<Messages />} />  
            <Route path="/orders/:id" element={<CustomerOrderDetails />} />  
            <Route path="/calendar" element={<Calendar />} />  
            <Route path="/menu" element={<Menu />} />  
            <Route path="/menu/:id" element={<MenuDetails />} />  
            <Route path="/reviews" element={<Reviews />} />  
            <Route path="/inventory" element={<Inventory />} />  
            <Route path="/staffs" element={<Staffs />} />  
            <Route path="/restaurants" element={<Restaurants />} />  
          </Route>  
        </Route>  

        {/* Admin Specific Routes */}  
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>  
        <Route element={<Layout />}>  
            <Route path="/dashboard" element={<Dashboard />} />  
            <Route path="/orders" element={<Orders />} />  
            <Route path="/customer-orders" element={<CustomerOrders />} />  
            <Route path="/messages" element={<Messages />} />  
            <Route path="/orders/:id" element={<CustomerOrderDetails />} />  
            <Route path="/calendar" element={<Calendar />} />  
            <Route path="/menu" element={<Menu />} />  
            <Route path="/menu/:id" element={<MenuDetails />} />  
            <Route path="/reviews" element={<Reviews />} />  
            <Route path="/inventory" element={<Inventory />} />  
            <Route path="/staffs" element={<Staffs />} />  
            <Route path="/restaurants" element={<Restaurants />} />  
          </Route>  
        </Route>  

        {/* Branch Manager Specific Routes */}  
        <Route element={<ProtectedRoute allowedRoles={["branch-manager"]} />}>  
          <Route element={<BranchManagerLayout />}>  
            <Route path="/branch-dashboard" element={<Dashboard />} />  
            <Route path="/branch-orders" element={<Orders />} />  
            <Route path="/branch-inventory" element={<Inventory />} />  
            <Route path="/branch-staffs" element={<Staffs />} />  
            <Route path="/branch-restaurants" element={<Restaurants />} />  
          </Route>  
        </Route> 
        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} /> 
      </Routes>  
      <Toaster />  
    </div>  
  );  
}  

export default App;  