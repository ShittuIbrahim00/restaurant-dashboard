import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Register = () => {
  const restaurantURL = "https://restaurant-backend-wwjm.onrender.com/api/v1";
  const navigate = useNavigate();
  const { role } = useParams();
  const normalizedRole = role === "admin" || role === "branch-manager";

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role]);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: role,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${restaurantURL}/register`,
        registerData
      );
      console.log(response);
      if (response.status === 201) {
        console.log(response);
        setRegisterData({
          name: "",
          email: "",
          password: "",
          role: role,
        });
      
        const redirectTo = role ? `/${role}` : "/"; // Use "/" if role is undefined
        console.log("Navigating to:", redirectTo);  // Debugging line
        navigate(redirectTo);  // Navigate to role-based login
      }      
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-customColor">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center mb-4">
          <img src={logo} alt="Logo" className="h-20 rounded-full" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">
          {normalizedRole} Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={registerData.name}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="hello@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to={`/${role || ""}`}
            className="text-orange-500 hover:text-orange-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
