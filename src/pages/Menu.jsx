import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthData } from "../pages/utils/auth";
import toast from "react-hot-toast";

const API_BASE_URL = "https://restaurant-backend-wwjm.onrender.com/api/v1"; // Your Render Base URL
const CATEGORIES_URL = `${API_BASE_URL}/get-category`;
const MENUS_URL = `${API_BASE_URL}/get-menu`;
const MENUS_BY_CATEGORY_URL = (categoryId) =>
  `${API_BASE_URL}/category/${categoryId}/menus`;
const CREATE_CATEGORY_URL = `${API_BASE_URL}/create-category`;
const DELETE_CATEGORY_URL = (categoryId) =>
  `${API_BASE_URL}/delete-category/${categoryId}`;
const DELETE_MENU_URL = (menuId) => `${API_BASE_URL}/delete-menu/${menuId}`;
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

// Simple Delete Icon
const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.288.222m3.288-.222l1.096 6.248m-1.096-6.248V4.5A2.25 2.25 0 0110.5 2.25h3A2.25 2.25 0 0115.75 4.5v1.29m0 0l-2.675 15.255M12 12.75h.008v.008H12v-.008z"
    />
  </svg>
);

export default function MenuManager() {
  // const LOCAL_HOST = "http://localhost:5000/api/v1";
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]); // Stores all menus
  const [filteredMenus, setFilteredMenus] = useState([]); // Menus displayed based on category
  const [activeCategory, setActiveCategory] = useState(null); // Store the whole category object
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingMenu, setIsEditingMenu] = useState(false);

  const [currentCategory, setCurrentCategory] = useState({
    _id: null,
    name: "",
    desc: "",
  });
  const [currentMenu, setCurrentMenu] = useState({
    _id: null,
    category_id: "",
    name: "",
    desc: "",
    price: "",
    availability: true,
    img: "",
    ingredients: [], // Initialize as an empty array
  });
  const [expandedMenuItemId, setExpandedMenuItemId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORIES_URL);
      setCategories(res.data?.categories || []);
    } catch (err) {
      console.error(
        "Error fetching categories:",
        err.response?.data?.message || err.message
      );
      // TODO: Add user-friendly error notification (e.g., toast)
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await axios.get(MENUS_URL);
      console.log(res);
      setMenus(res.data?.menus || []);
      if (!activeCategory) {
        setFilteredMenus(res.data?.menus || []);
      }
    } catch (err) {
      console.error(
        "Error fetching menus:",
        err.response?.data?.message || err.message
      );
      // TODO: Add user-friendly error notification
    }
  };

  const fetchMenusByCategory = async (categoryId) => {
    try {
      if (!categoryId) {
        setFilteredMenus(menus); // Show all menus
        return;
      }
      const res = await axios.get(MENUS_BY_CATEGORY_URL(categoryId));
      setFilteredMenus(res.data?.menus || []);
    } catch (err) {
      console.error(
        "Error fetching menus by category:",
        err.response?.data?.message || err.message
      );
      setFilteredMenus([]); // Clear menus on error or if category has no menus
      // TODO: Add user-friendly error notification
    }
  };

  const adminData = JSON.parse(localStorage.getItem("restaurant-user"));

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);

  // --- Category Actions ---
  const handleCategoryClick = (category) => {
    // category can be an object or null
    setActiveCategory(category);
    if (category) {
      fetchMenusByCategory(category._id);
    } else {
      setFilteredMenus(menus); // Show all menus
    }
  };

  const openAddCategoryModal = () => {
    setIsEditingCategory(false);
    setCurrentCategory({ _id: null, name: "", desc: "" });
    setShowCategoryModal(true);
  };

  const openEditCategoryModal = (category) => {
    setIsEditingCategory(true);
    setCurrentCategory(category); // category should include _id, name, desc
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = async () => {
    if (!currentCategory.name.trim()) {
      toast.error("Category name cannot be empty."); // Simple validation
      return;
    }

    const token = getAuthData();
    if (!token || !token.user || !token.user._id || !token.token) {
      console.error("Authentication data is missing or incomplete.");
      toast.error("Authentication error. Please log in again.");
      return;
    }
    const admin_id = token.user._id;
    const payload = {
      admin_id,
      name: currentCategory.name,
      desc: currentCategory.desc,
    };

    try {
      if (isEditingCategory && currentCategory._id) {
        console.log("Simulating update category:", payload); // Placeholder
        toast.error("Category update functionality not yet implemented on frontend.");
      } else {
        await axios.post(CREATE_CATEGORY_URL, payload, {
          headers: { Authorization: `Bearer ${token.token}` },
        });
      }
      setShowCategoryModal(false);
      fetchCategories(); // Refresh category list
      setCurrentCategory({ _id: null, name: "", desc: "" }); // Reset form
    } catch (err) {
      console.error(
        `Error ${isEditingCategory ? "updating" : "creating"} category:`,
        err.response?.data?.message || err.message
      );
      toast.error(
        `Error: ${err.response?.data?.message || "Could not save category."}`
      );
    }
  };

  const deleteCategory = async (categoryId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category? This might also delete associated menu items depending on backend setup."
      )
    )
      return;
    try {
      const token = getAuthData();
      if (!token || !token.token) {
        console.error("Authentication token is missing.");
        alert("Authentication error. Please log in again.");
        return;
      }
      await axios.delete(DELETE_CATEGORY_URL(categoryId), {
        headers: { Authorization: `Bearer ${token.token}` },
      });
      fetchCategories(); // Refresh categories
      // If the deleted category was active, reset to 'All Menus'
      if (activeCategory && activeCategory._id === categoryId) {
        setActiveCategory(null);
        setFilteredMenus(menus); // Show all menus
      } else if (activeCategory) {
        fetchMenusByCategory(activeCategory._id); // Refresh current active category's menus
      } else {
        fetchMenus(); // Refresh all menus if 'All' was selected
      }
    } catch (err) {
      console.error(
        "Error deleting category:",
        err.response?.data?.message || err.message
      );
      alert(
        `Error: ${err.response?.data?.message || "Could not delete category."}`
      );
    }
  };

  // --- Menu Item Actions ---
  const openAddMenuModal = () => {
    setIsEditingMenu(false);
    setCurrentMenu({
      _id: null,
      category_id: activeCategory?._id || "",
      name: "",
      desc: "",
      price: "",
      availability: true,
      img: "",
      // Initialize with an empty string for the first select, or a default value
      ingredients: allAvailableIngredients.length > 0 ? [""] : [],
    });
    setShowMenuModal(true);
  };

  const openEditMenuModal = (menuItem) => {
    setIsEditingMenu(true);
    setCurrentMenu({
      ...menuItem,
      ingredients:
        menuItem.ingredients && menuItem.ingredients.length > 0
          ? menuItem.ingredients
          : allAvailableIngredients.length > 0
          ? [""]
          : [],
    });
    setShowMenuModal(true);
  };

  const [allAvailableIngredients, setAllAvailableIngredients] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchMenus();
    fetchAllAvailableIngredients();
  }, []);

  // Fetch all ingredients from inventory API
  const fetchAllAvailableIngredients = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/inventories`, {
        headers: { Authorization: `Bearer ${adminData.token}` },
      });
      setAllAvailableIngredients(res.data);
    } catch (err) {
      console.error(
        "Error fetching all available ingredients:",
        err.response?.data?.message || err.message
      );
      toast.error("Failed to load ingredients.");
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...currentMenu.ingredients];
    newIngredients[index] = value;
    setCurrentMenu((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const removeIngredientField = (index) => {
    const newIngredients = currentMenu.ingredients.filter(
      (_, i) => i !== index
    );
    setCurrentMenu({
      ...currentMenu,
      ingredients: newIngredients.length > 0 ? newIngredients : [""],
    });
  };

  const addIngredientField = () => {
    setCurrentMenu({
      ...currentMenu,
      ingredients: [...currentMenu.ingredients, ""],
    });
  };

  const handleMenuSubmit = async () => {
    const { name, desc, price, category_id, availability, img, _id } =
      currentMenu;
    if (!name.trim() || !desc.trim() || !String(price).trim() || !category_id) {
      toast.error(
        "Name, Description, Price, and Category are required for a menu item."
      );
      return;
    }

    const tokenData = getAuthData();
    if (
      !tokenData ||
      !tokenData.user ||
      !tokenData.user._id ||
      !tokenData.token
    ) {
      console.error("Authentication data is missing or incomplete.");
      toast.error("Authentication error. Please log in again.");
      return;
    }
    const admin_id = tokenData.user._id;

    // Clean and filter ingredients (only non-empty strings)
    const finalIngredients = currentMenu.ingredients
      .map((ing) => (typeof ing === "string" ? ing.trim() : ""))
      .filter((ing) => ing && ing !== "");

    const payload = {
      admin_id,
      category_id,
      name,
      desc,
      price: +price,
      availability,
      img,
      ingredients: finalIngredients,
    };

    try {
      if (isEditingMenu && _id) {
        // UPDATE MENU ITEM
        await axios.put(`${API_BASE_URL}/menus/${_id}`, payload, {
          headers: { Authorization: `Bearer ${tokenData.token}` },
        });
        toast.success("Menu item updated successfully!");
      } else {
        // CREATE MENU ITEM
        await axios.post(`${API_BASE_URL}/create-menu`, payload, {
          headers: { Authorization: `Bearer ${tokenData.token}` },
        });
        toast.success("Menu item created successfully!");
      }

      setShowMenuModal(false);
      setCurrentMenu({
        _id: null,
        category_id: "",
        name: "",
        desc: "",
        price: "",
        availability: true,
        img: "",
        ingredients: [""],
      });

      if (activeCategory) {
        fetchMenusByCategory(activeCategory._id);
      } else {
        fetchMenus();
      }
    } catch (err) {
      console.error(
        "Error saving menu item:",
        err.response?.data?.message || err.message
      );
      toast.error(
        `Error: ${err.response?.data?.message || "Could not save menu item."}`
      );
    }
  };

  const deleteMenu = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu item?"))
      return;
    try {
      const token = getAuthData();
      if (!token || !token.token) {
        console.error("Authentication token is missing.");
        alert("Authentication error. Please log in again.");
        return;
      }
      await axios.delete(DELETE_MENU_URL(menuId), {
        headers: { Authorization: `Bearer ${token.token}` },
      });
      // Refresh menus based on current view
      if (activeCategory) {
        fetchMenusByCategory(activeCategory._id);
      }
      fetchMenus(); // This will update the main 'menus' state and also filteredMenus if no category is active
    } catch (err) {
      console.error(
        "Error deleting menu:",
        err.response?.data?.message || err.message
      );
      alert(
        `Error: ${err.response?.data?.message || "Could not delete menu item."}`
      );
    }
  };

  const toggleExpandMenuItem = (id) =>
    setExpandedMenuItemId((prev) => (prev === id ? null : id));

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 border-b border-gray-300">
            <h1 className="text-3xl font-bold text-red-700 tracking-tight">
              SpicyHunt Menu Manager
            </h1>
            <div className="flex gap-3">
              <button
                onClick={openAddCategoryModal}
                className="bg-orange-500 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-150 text-sm font-semibold flex items-center gap-2"
              >
                <span className="text-xl leading-none">+</span> Add Category
              </button>
              <button
                onClick={openAddMenuModal}
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-150 text-sm font-semibold flex items-center gap-2"
              >
                <span className="text-xl leading-none">+</span> Add Menu Item
              </button>
            </div>
          </div>
        </header>

        {/* Categories Section */}
        <section className="mb-8 p-5 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 shadow-sm hover:shadow-md
                ${
                  !activeCategory
                    ? "bg-red-600 text-white ring-2 ring-red-300"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              All Menus
            </button>
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center gap-2 group">
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 shadow-sm hover:shadow-md
                    ${
                      activeCategory?._id === cat._id
                        ? "bg-orange-500 text-white ring-2 ring-orange-300"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }`}
                >
                  {cat.name}
                  {cat.desc && (
                    <span className="text-xs opacity-75 hidden sm:inline ml-1">
                      ({cat.desc})
                    </span>
                  )}
                </button>
                {activeCategory?._id === cat._id && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditCategoryModal(cat);
                      }}
                      className="p-1.5 text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 rounded-full shadow-sm transition-colors"
                      title="Edit Category"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCategory(cat._id);
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 rounded-full shadow-sm transition-colors"
                      title="Delete Category"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Menu Items Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {activeCategory ? `Menu: ${activeCategory.name}` : "All Menu Items"}
            <span className="text-base text-gray-500 ml-2">
              ({filteredMenus.length} items)
            </span>
          </h2>
          {filteredMenus.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {activeCategory
                  ? `No menu items found in ${activeCategory.name}.`
                  : "No menu items available."}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeCategory
                  ? "Try adding some delicious dishes!"
                  : "Get started by adding a new menu item."}
              </p>
              <div className="mt-6">
                <button
                  onClick={openAddMenuModal}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  + Add New Menu Item
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenus.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
                >
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-52 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=No+Image"; /* Fallback image */
                      }}
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-1 truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 h-16 overflow-y-auto custom-scrollbar">
                      {item.desc}
                    </p>
                    <div className="mt-auto">
                      {" "}
                      {/* Pushes content below to the bottom */}
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-2xl font-bold text-red-600">
                          ${parseFloat(item.price).toFixed(2)}
                        </p>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.availability
                              ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                              : "bg-red-100 text-red-700 ring-1 ring-red-300"
                          }`}
                        >
                          {item.availability ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleExpandMenuItem(item._id)}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium mb-3 w-full text-left flex justify-between items-center"
                      >
                        <span>
                          {expandedMenuItemId === item._id
                            ? "Hide Details"
                            : "Show Details & Ingredients"}
                        </span>
                        <span
                          className={`inline-block transform transition-transform ${
                            expandedMenuItemId === item._id ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedMenuItemId === item._id && (
                        <div className="mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
                          {item.ingredients && item.ingredients.length > 0 && (
                            <>
                              <h4 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                                Ingredients:
                              </h4>
                              <ul className="list-disc list-inside text-xs text-gray-700 mb-4 space-y-0.5 pl-2">
                                {item.ingredients.map((ingredient) => (
                                  <li key={ingredient._id}>{ingredient.inventoryItem}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          <div className="flex gap-2.5 mt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditMenuModal(item);
                              }}
                              className="flex-1 text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <EditIcon /> Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMenu(item._id);
                              }}
                              className="flex-1 text-sm bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <DeleteIcon /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-5 transform transition-all duration-300 scale-95 opacity-0 animate-modalEnter">
            <h3 className="text-2xl font-semibold text-gray-800">
              {isEditingCategory ? "Edit Category" : "Add New Category"}
            </h3>
            <div>
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                id="categoryName"
                type="text"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  })
                }
                className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Appetizers"
              />
            </div>
            <div>
              <label
                htmlFor="categoryDesc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description (Optional)
              </label>
              <input
                id="categoryDesc"
                type="text"
                value={currentCategory.desc}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    desc: e.target.value,
                  })
                }
                className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-orange-500 focus:border-orange-500"
                placeholder="A short description"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCategorySubmit}
                className="px-5 py-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                {isEditingCategory ? "Save Changes" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Item Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-5 transform transition-all duration-300 scale-95 opacity-0 animate-modalEnter max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-2xl font-semibold text-gray-800">
              {isEditingMenu ? "Edit Menu Item" : "Add New Menu Item"}
            </h3>

            {/* Name */}
            <div>
              <label
                htmlFor="menuName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="menuName"
                type="text"
                placeholder="e.g., Spicy Chicken Biryani"
                value={currentMenu.name}
                onChange={(e) =>
                  setCurrentMenu({ ...currentMenu, name: e.target.value })
                }
                className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="menuDesc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="menuDesc"
                placeholder="Detailed description of the dish..."
                value={currentMenu.desc}
                onChange={(e) =>
                  setCurrentMenu({ ...currentMenu, desc: e.target.value })
                }
                className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-red-500 focus:border-red-500 h-24 resize-none"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="menuPrice"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  id="menuPrice"
                  type="number"
                  placeholder="0.00"
                  value={currentMenu.price}
                  onChange={(e) =>
                    setCurrentMenu({ ...currentMenu, price: e.target.value })
                  }
                  className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-red-500 focus:border-red-500"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label
                  htmlFor="menuCategory"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="menuCategory"
                  value={currentMenu.category_id}
                  onChange={(e) =>
                    setCurrentMenu({
                      ...currentMenu,
                      category_id: e.target.value,
                    })
                  }
                  className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="menuImg"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL (Optional)
              </label>
              <input
                id="menuImg"
                type="text"
                placeholder="https://example.com/image.jpg"
                value={currentMenu.img}
                onChange={(e) =>
                  setCurrentMenu({ ...currentMenu, img: e.target.value })
                }
                className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients
              </label>
              <div className="space-y-2">
                {currentMenu.ingredients.map((selectedIngredientId, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select
                      value={selectedIngredientId}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      className="flex-grow border-gray-300 rounded-lg shadow-sm px-4 py-2.5 focus:ring-red-500 focus:border-red-500 bg-white"
                    >
                      <option value="">-- Select an Ingredient --</option>
                      {allAvailableIngredients.map((ingredient) => (
                        <option key={ingredient._id} value={ingredient._id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </select>

                    {currentMenu.ingredients.length > 0 && (
                      <button
                        type="button"
                        onClick={() => removeIngredientField(index)}
                        className="p-2 text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                        title="Remove Ingredient"
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {allAvailableIngredients.length > 0 ? (
                <button
                  type="button"
                  onClick={addIngredientField}
                  className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium py-1.5 px-3 border border-orange-300 rounded-md hover:bg-orange-50 transition-colors"
                >
                  + Add Another Ingredient
                </button>
              ) : (
                <p className="mt-2 text-xs text-gray-500">
                  No predefined ingredients available. Please add some in the
                  system.
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center pt-2">
              <input
                id="menuAvailability"
                type="checkbox"
                checked={currentMenu.availability}
                onChange={(e) =>
                  setCurrentMenu({
                    ...currentMenu,
                    availability: e.target.checked,
                  })
                }
                className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor="menuAvailability"
                className="ml-2 block text-sm text-gray-900"
              >
                Item is Currently Available
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowMenuModal(false)}
                className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleMenuSubmit}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-medium"
              >
                {isEditingMenu ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
