import { useState } from "react";

const LocationManagement = () => {
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"></h2>
        <button
          onClick={() => setShowRestaurantModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-500"
        >
          + Add Location
        </button>
      </div>

      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((rest) => (
              <tr key={rest.id} className="border-t">
                <td className="p-3">{rest.name}</td>
                <td className="p-3">{rest.email}</td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Restaurant Modal */}
      {showRestaurantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add Location</h3>
            {/* Form inputs go here */}
            <form>
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
            </form>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRestaurantModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManagement;
