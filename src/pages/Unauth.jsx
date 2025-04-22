import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800 px-4">
      <h1 className="text-5xl font-bold mb-4">🚫 Unauthorized</h1>
      <p className="text-lg mb-6 text-center">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
