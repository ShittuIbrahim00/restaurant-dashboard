// components/ProtectedRoute.jsx  
import { Navigate, Outlet } from "react-router-dom";  
import { useLocation } from "react-router-dom";  

const ProtectedRoute = ({ allowedRoles }) => {  
    const user = JSON.parse(localStorage.getItem("restaurant-user"));  
    // console.log("USER from localStorage:", user);  
    
    const location = useLocation();  

    // If user is not logged in, redirect to the login page  
    if (!user) {  
        return <Navigate to="/" state={{ from: location }} replace />;  
    }  

    const role = user.user?.role;  
    // console.log("User Role:", role);  
    // console.log("Allowed Roles:", allowedRoles);  

    // If user's role is not included in allowed roles, redirect to unauthorized page  
    if (!allowedRoles.includes(role)) {  
        // console.log("Blocked because role is not allowed");  
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;  
    }  

    // Allow access to protected routes  
    return <Outlet />;  
};  

export default ProtectedRoute;  