import { useState } from "react";

const RestaurantDashboard = () => {
  const checkUser = JSON.parse(localStorage.getItem("restaurant-user"));
  const userRole = checkUser.user.role;
  console.log(userRole);

  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [restaurants, setRestaurants] = useState([
    {
      id: "1",
      name: "Tasty Bites",
      email: "contact@tastybites.com",
    },
    {
      id: "2",
      name: "Ocean View",
      email: "hello@oceanview.com",
    },
  ]);

  const openLocationModal = (id) => {
    setSelectedRestaurantId(id);
    setShowLocationModal(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"></h2>
        {userRole === "admin" ? (
          <button
            onClick={() => setShowRestaurantModal(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            + Add Restaurant
          </button>
        ) : (
          (userRole === "branch-manager" ||
            userRole === "restaurant-owner") && (
            <button
              disabled
              title="Only admins can add restaurants"
              className="bg-orange-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
            >
              + Add Restaurant
            </button>
          )
        )}
      </div>

      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              {userRole == "branch-manager" ? (
                <th></th>
              ) : (
                userRole === "restaurant-owner" ||
                ("admin" && <th className="p-3">Actions</th>)
              )}
            </tr>
          </thead>
          <tbody>
            {restaurants.map((rest) => (
              <tr key={rest.id} className="border-t">
                <td className="p-3">{rest.name}</td>
                <td className="p-3">{rest.email}</td>
                {userRole == "branch-manager" ? (
                  <td></td>
                ) : (
                  userRole === "restaurant-owner" ||
                  ("admin" && (
                    <td className="p-3 space-x-2">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                      <button
                        onClick={() => openLocationModal(rest.id)}
                        className="text-green-600 hover:underline"
                      >
                        Add Location
                      </button>
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Restaurant Modal */}
      {showRestaurantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add Restaurant</h3>
            {/* Form inputs go here */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRestaurantModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add Location</h3>
            {/* Location Form inputs */}
            <input
              type="text"
              placeholder="Address"
              className="w-full mb-4 border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full mb-4 border px-3 py-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLocationModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDashboard;
