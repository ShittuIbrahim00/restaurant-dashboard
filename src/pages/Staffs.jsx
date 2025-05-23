import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Staffs() {
  const restaurantURL = "https://restaurant-backend-wwjm.onrender.com/api/v1";
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [userDetailsData, setUserDetailsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "branch-manager",
    password: "",
    image: "",
    email: "",
  });

  const categories = [
    "All",
    "Branch-Manager",
    "Receptionist",
    "Waiter",
    "Chef",
    "Customer",
  ];
  const sortedItems = [...items];

  const filteredItems =
    filter === "All"
      ? sortedItems
      : sortedItems.filter(
          (item) => item.role.toLowerCase() === filter.toLowerCase()
        );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleEditItem = (userId) => {
    const user = items.find((item) => item._id === userId);
    if (user) {
      setFormData({
        name: user.name,
        password: "",
        image: user.image,
        email: user.email,
      });
      setEditingIndex(userId);
      setShowForm(true);
    }
  };

  const categoryColors = {
    "branch-manager": "bg-red-100 text-red-700",
    receptionist: "bg-blue-100 text-blue-700",
    waiter: "bg-yellow-100 text-yellow-700",
    chef: "bg-green-100 text-green-700",
    customer: "bg-gray-100 text-gray-700",
  };
  const adminData = JSON.parse(localStorage.getItem("restaurant-user"));
  console.log(adminData.token);

  useEffect(() => {
    fetchRestaurantUsers();
  }, []);

  const fetchRestaurantUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${restaurantURL}/restaurant-users`, {
        headers: { Authorization: `Bearer ${adminData.token}` },
      });
      console.log(response)
      const result = response.data;
      if (response.status === 200) {
        const sorted = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setItems(sorted);
        setIsLoading(false);
      } else {
        toast.error(response.message);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getSingleRestaurantUser = async (userId) => {
    try {
      const response = await axios.get(
        `${restaurantURL}/restaurant-user?userId=${userId}`,
        { headers: { Authorization: `Bearer ${adminData.token}` } }
      );
      if (response.status === 200) {
        setUserDetailsData(response.data);
        setUserDetails(true);
        console.log(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${restaurantURL}/update-restaurant-user?userId=${editingIndex}`,
        formData,
        { headers: { Authorization: `Bearer ${adminData.token}` } }
      );
      console.log(response);
      if (response.status === 200) {
        fetchRestaurantUsers();
        toast.success(response.data.message);
        setShowForm(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `${restaurantURL}/delete-restaurant-user?userId=${userId}`,
        { headers: { Authorization: `Bearer ${adminData.token}` } }
      );
      console.log(response);
      if (response.status === 200) {
        fetchRestaurantUsers();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${restaurantURL}/admin/create-user`,
        formData,
        {
          headers: { Authorization: `Bearer ${adminData.token}` },
        }
      );
      const result = response.data;
      if (response.status === 201) {
        fetchRestaurantUsers();
        console.log(result);
        setFormData({
          name: "",
          role: "",
          password: "",
          image: "",
          email: "",
        });
        toast.success(response.message);
      } else {
        toast.error(response.data.message);
      }
      setEditingIndex(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="col-span-full flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-orange-500"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-1/4 bg-white border-r p-4">
            <h2 className="text-lg font-bold mb-4">Filter by Category</h2>
            <ul className="space-y-2 mb-6">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setFilter(cat)}
                    className={`w-full text-left p-2 rounded ${
                      filter === cat
                        ? "bg-orange-500 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Menu Items */}
          <main className="flex-1 p-4 bg-gray-50">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Staffs</h2>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  setFormData({
                    name: "",
                    role: "Branch-Manager",
                    password: "",
                    email: "",
                    image: "",
                  });
                  setEditingIndex(null);
                  setShowForm(true);
                }}
              >
                + Add Staff
              </button>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems?.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded shadow hover:shadow-lg p-4 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded mb-4"
                    />
                    <button
                      className="w-full text-start"
                      onClick={() => getSingleRestaurantUser(item._id)}
                    >
                      <h3 className="text-lg font-bold">{item.name}</h3>
                    </button>
                    <span
                      className={`inline-block px-2 py-1 capitalize text-xs rounded ${
                        categoryColors[item.role] || "bg-gray-100 text-gray-700"
                      } mb-1`}
                    >
                      {item.role}
                    </span>
                    <p>{item.email}</p>

                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={() => handleEditItem(item._id)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(item._id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-3xl font-semibold">No staffs</p>
              )}
            </section>
          </main>

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">
                  {editingIndex !== null ? "Edit Staff" : "Register Staff"}
                </h3>
                <form onSubmit={editingIndex ? updateUser : handleSubmit}>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border p-2 rounded"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border p-2 rounded"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full border p-2 rounded"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    {editingIndex !== null ? (
                      ""
                    ) : (
                      <select
                        className="w-full border p-2 rounded"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      >
                        <option value="branch-manager">Branch_Manager</option>
                        <option value="receptionist">Receptionist</option>
                        <option value="waiter">Waiter</option>
                        <option value="chef">Chef</option>
                        <option value="customer">Customer</option>
                      </select>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border p-2 rounded"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded mt-2"
                      />
                    )}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={(e) => {
                        editingIndex ? updateUser(e) : handleSubmit(e);
                      }}
                      className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                      {editingIndex !== null ? "Update" : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                      className="text-gray-600 px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {userDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">
                  User {userDetailsData._id} Details
                </h3>
                <div className=" p-4 transition-all">
                  <img
                    src=""
                    alt=""
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <button
                    className="w-full text-start"
                    //   onClick={() => getSingleRestaurantUser(item._id)}
                  >
                    <h3 className="text-lg font-bold">
                      {userDetailsData.name}
                    </h3>
                  </button>
                  <span
                    className={`inline-block px-2 py-1 capitalize text-sm font-bold rounded bg-gray-100 text-gray-700`}
                  >
                    {userDetailsData.role}
                  </span>
                  <p className="text-xl">{userDetailsData.email}</p>
                </div>
                <button
                  onClick={() => {
                    setUserDetails(false);
                  }}
                  className="text-gray-600 px-4 py-2 w-full text-end"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
