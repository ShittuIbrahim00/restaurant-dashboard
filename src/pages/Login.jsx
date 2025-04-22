import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setAuthData } from "./utils/auth";

const Login = () => {
  const restaurantURL = "https://restaurant-backend-wwjm.onrender.com/api/v1";
  const { role } = useParams();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRoleSelection = (e) => {
    e.preventDefault();
    if (!selectedRole) return toast.error("Please select a role");
    navigate(`/${selectedRole}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${restaurantURL}/login`, loginData);
      const result = response.data;
      console.log(result)
      
      const user = result;
      const token = result?.token;
      const role = result?.role;
      console.log(user)
      console.log(token)
      console.log(role)

      if (role === "admin" || role === "branch-manager") {
        setAuthData( user, token );
        navigate(role === "admin" ? "/dashboard" : "/branch-dashboard", {replace: true});
        setLoginData({ email: "", password: "" });
      } else {
        toast.error("You do not have access to this route");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="h-screen lg:flex md:flex grid w-full">
      {/* Left Section */}
      <div className="lg:w-1/2 md:w-1/2 bg-orange-500 flex flex-col justify-center items-center p-8">
        <h1 className="text-white text-4xl font-bold mb-4">FANTASTIC4</h1>
        <p className="text-white text-lg mb-6">Check the Status</p>
        <p className="text-white text-center mb-6">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className="flex space-x-4 mb-6">
          <a href="#" className="text-white text-2xl">
            Twitter
          </a>
          <a href="#" className="text-white text-2xl">
            Facebook
          </a>
          <a href="#" className="text-white text-2xl">
            LinkedIn
          </a>
        </div>
        <p className="text-white text-sm">
          Privacy Policy | Contact © 2024 DesignZone
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 md:w-1/2 mt-8 flex flex-col justify-center items-center">
        <h2 className="text-orange-500 text-4xl font-bold mb-4">
          Welcome to fantastic4
        </h2>
        <p className="text-gray-700 mb-6">
          Sign in by entering information below:
        </p>
        {!role && (
          <form onSubmit={handleRoleSelection} className="mb-6 w-2/3">
            <label className="block text-gray-700 font-bold mb-2">
              Select your role:
            </label>
            <select
              className="w-full border px-3 py-2 rounded-lg"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="branch-manager">Branch Manager</option>
            </select>
            <button
              type="submit"
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
            >
              Continue
            </button>
          </form>
        )}
        {role && (
          <form className="w-2/3" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="demo@demo.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="********"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-600 text-sm">
                Remember my preference
              </label>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Sign In
            </button>
          </form>
        )}

        <p className="mt-4 text-gray-500">
          Don't have an account?{" "}
          {role ? (
            <Link
              to={`/${role}/register`}
              className="text-orange-500 hover:text-orange-700"
            >
              Sign up
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">
              Select a role first
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
