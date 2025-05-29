import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import LocationModal from "../components/LocationModal.jsx";

const RestaurantDashboard = () => {
  const restaurantURL = "https://restaurant-backend-wwjm.onrender.com/api/v1";
  const checkUser = JSON.parse(localStorage.getItem("restaurant-user"));
  const userRole = checkUser.user.role;
  const authorizedToken = checkUser.token;

  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showRestaurantEditModal, setShowRestaurantEditModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showEditLocationModal, setShowEditLocationModal] = useState(false);

  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [editingRestaurantId, setEditingRestaurantId] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState({
    name: "",
    owner: "",
    description: "",
  });

  const [allLocations, setAllLocations] = useState([]);
  const [visibleLocationIds, setVisibleLocationIds] = useState([]);
  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    restaurant: "",
  });

  const [restaurantUsers, setRestaurantUsers] = useState([]);

  useEffect(() => {
    fetchRestaurantUsers();
    fetchRestaurants();
    // getSingleRestaurantWithLocation()
  }, []);

  const fetchRestaurantUsers = async () => {
    try {
      const response = await axios.get(`${restaurantURL}/restaurant-users`, {
        headers: { Authorization: `Bearer ${authorizedToken}` },
      });
      setRestaurantUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${restaurantURL}/restaurants`);
      setAllRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocations = async (restaurantId) => {
    try {
      const response = await axios.get(
        `${restaurantURL}/restaurant-locations?restaurantId=${restaurantId}`
      );
      setAllLocations(response.data);
    } catch (error) {
      console.error("Failed to fetch locations", error);
    }
  };

  // const getSingleRestaurantWithLocation = async (Id) => {
  //   try {
  //     const response = await axios.get(
  //       `${restaurantURL}/restaurant-location/${Id}`
  //     );
  //     console.log(response)
  //     // setAllLocations(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch locations", error);
  //   }
  // };

  const toggleLocationVisibility = (restaurantId) => {
    setVisibleLocationIds((prev) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurants, [name]: value });
    setLocationData({ ...locationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${restaurantURL}/create-restaurant`,
        restaurants
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        fetchRestaurants();
        setShowRestaurantModal(false);
        setRestaurants({ name: "", owner: "", description: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${restaurantURL}/restaurant/${editingRestaurantId}`,
        restaurants,
        {
          headers: { Authorization: `Bearer ${authorizedToken}` },
        }
      );
      toast.success("Restaurant updated successfully");
      fetchRestaurants();
      setShowRestaurantEditModal(false);
      setRestaurants({ name: "", owner: "", description: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      const response = await axios.delete(`${restaurantURL}/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${authorizedToken}` },
      });
      toast.success(response.data.message);
      fetchRestaurants();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const openLocationModal = (id) => {
    setSelectedRestaurantId(id);
    setLocationData({ ...locationData, restaurant: id });
    setShowLocationModal(true);
  };

  const handleLocationCreation = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${restaurantURL}/create-location`, locationData, {
        headers: { Authorization: `Bearer ${authorizedToken}` },
      });
      toast.success("Location added successfully");
      fetchLocations(locationData.restaurant);
      setShowLocationModal(false);
      setLocationData({ address: "", city: "", restaurant: "" });
    } catch (error) {
      toast.error("Failed to add location");
    }
  };

  const openEditLocationModal = (location) => {
    setEditingLocation(location);
    setLocationData({
      address: location.address,
      city: location.city,
      restaurant: location.restaurant,
    });
    setShowEditLocationModal(true);
  };

  const handleEditLocation = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        `${restaurantURL}/restaurant-location/${editingLocation._id}`,
        locationData,
        {
          headers: { Authorization: `Bearer ${authorizedToken}` },
        }
      );
      if (resp.status === 200) {
        toast.success("Location updated successfully");
        fetchLocations(locationData.restaurant);
        setShowEditLocationModal(false);
      }
    } catch (error) {
      toast.error("Failed to update location");
    }
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      await axios.delete(`${restaurantURL}/restaurant-location/${locationId}`, {
        headers: { Authorization: `Bearer ${authorizedToken}` },
      });
      toast.success("Location deleted");
      fetchLocations(selectedRestaurantId);
    } catch (error) {
      toast.error("Failed to delete location");
    }
  };

  return (
    <div className="">
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
          <button
            disabled
            title="Only admins can add restaurants"
            className="bg-orange-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
          >
            + Add Restaurant
          </button>
        )}
      </div>

      {allRestaurants.length > 0 ? (
        <div className="bg-white shadow rounded-md overflow-hidden">
          {/* Table view for md and up */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allRestaurants.map((rest) => (
                  <React.Fragment key={rest._id}>
                    <tr className="border-t">
                      <td
                        className="p-3 cursor-pointer text-orange-600 underline"
                        onClick={() => {
                          toggleLocationVisibility(rest._id);
                          fetchLocations(rest._id);
                        }}
                      >
                        {rest.name}
                      </td>
                      <td className="p-3">{rest.description}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => {
                            setEditingRestaurantId(rest._id);
                            setRestaurants({
                              name: rest.name,
                              owner: rest.owner,
                              description: rest.description,
                            });
                            setShowRestaurantEditModal(true);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRestaurant(rest._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => openLocationModal(rest._id)}
                          className="text-green-600 hover:underline"
                        >
                          Add Location
                        </button>
                        {/* <button
                          onClick={() => getSingleRestaurantWithLocation(rest._id)}
                          className="text-green-600 hover:underline"
                        >
                          View More
                        </button> */}
                      </td>
                    </tr>
                    <AnimatePresence>
                      {visibleLocationIds.includes(rest._id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          {allLocations.filter(
                            (loc) => loc.restaurant === rest._id
                          ).length > 0 ? (
                            <ul className="space-y-2 text-sm text-gray-700">
                              {allLocations
                                .filter((loc) => loc.restaurant === rest._id)
                                .map((loc) => (
                                  <li className="px-3" key={loc._id}>
                                    <strong>Address:</strong> {loc.address},{" "}
                                    <strong>City:</strong> {loc.city}
                                    <div className="space-x-2">
                                      <button
                                        onClick={() =>
                                          openEditLocationModal(loc)
                                        }
                                        className="text-blue-600 hover:underline"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteLocation(loc._id)
                                        }
                                        className="text-red-600 hover:underline"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500 px-2 w-full">
                              No location found for this restaurant.
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile */}
          <div className="md:hidden p-4 space-y-4">
            {allRestaurants.map((rest) => (
              <div
                key={rest._id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div
                  className="text-lg font-semibold text-orange-600 underline cursor-pointer"
                  onClick={() => {
                    toggleLocationVisibility(rest._id);
                    fetchLocations(rest._id);
                  }}
                >
                  {rest.name}
                </div>
                <div className="text-gray-700 mt-1">{rest.description}</div>

                <div className="mt-4 space-x-3 text-sm">
                  <button
                    onClick={() => {
                      setEditingRestaurantId(rest._id);
                      setRestaurants({
                        name: rest.name,
                        owner: rest.owner,
                        description: rest.description,
                      });
                      setShowRestaurantEditModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRestaurant(rest._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openLocationModal(rest._id)}
                    className="text-green-600 hover:underline"
                  >
                    Add Location
                  </button>
                </div>

                {/* Mobile location list */}
                <AnimatePresence>
                  {visibleLocationIds.includes(rest._id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      {allLocations.filter((loc) => loc.restaurant === rest._id)
                        .length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-700">
                          {allLocations
                            .filter((loc) => loc.restaurant === rest._id)
                            .map((loc) => (
                              <li key={loc._id}>
                                <strong>Address:</strong> {loc.address},{" "}
                                <strong>City:</strong> {loc.city}
                                <div className="space-x-2">
                                  <button
                                    onClick={() => openEditLocationModal(loc)}
                                    className="text-blue-600 hover:underline"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteLocation(loc._id)
                                    }
                                    className="text-red-600 hover:underline"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No location found for this restaurant.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center text-center items-center">
          <p className="text-3xl my-4">No restaurant available</p>
        </div>
      )}

      {/* Add Restaurant Modal */}
      {showRestaurantModal && (
        <Modal
          title="Add Restaurant"
          isOpen={true}
          onClose={() => setShowRestaurantEditModal(false)}
          onSubmit={handleEditSubmit}
          restaurantUsers={restaurantUsers}
          formData={restaurants}
          setFormData={setRestaurants}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={restaurants.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <select
              name="owner"
              value={restaurants.owner}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Owner</option>
              {restaurantUsers
                .filter((user) => user.role === "restaurant-owner")
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
            </select>
            <textarea
              name="description"
              value={restaurants.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRestaurantModal(false)}
                className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Restaurant Modal */}
      {showRestaurantEditModal && (
        <Modal
          title="Edit Restaurant"
          isOpen={true}
          onClose={() => setShowRestaurantEditModal(false)}
          onSubmit={handleEditSubmit}
          restaurantUsers={restaurantUsers}
          formData={restaurants}
          setFormData={setRestaurants}
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={restaurants.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <select
              name="owner"
              value={restaurants.owner}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Owner</option>
              {restaurantUsers
                .filter((user) => user.role == "restaurant-owner")
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
            </select>
            <textarea
              name="description"
              value={restaurants.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRestaurantEditModal(false)}
                className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Location Modal */}
      {showLocationModal && (
        <LocationModal
          title="Add Location"
          isOpen={true}
          onClose={() => setShowLocationModal(false)}
          onSubmit={handleLocationCreation}
          formData={locationData}
          setFormData={setLocationData}
          restaurants={allRestaurants}
        />
      )}

      {/* Edit Location Modal */}
      {showEditLocationModal && (
        <LocationModal
          title="Edit Location"
          isOpen={true}
          onClose={() => setShowEditLocationModal(false)}
          onSubmit={handleEditLocation}
          formData={locationData}
          setFormData={setLocationData}
          restaurants={allRestaurants}
        />
      )}
    </div>
  );
};

export default RestaurantDashboard;
