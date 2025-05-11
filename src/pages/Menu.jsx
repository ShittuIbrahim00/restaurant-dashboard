// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function Menu() {
//   useEffect(() => {
//     fetchMenu();
//     fetchCategories();
//   }, []);
  
//   const fetchMenu = async () => {
//     try {
//       const res = await axios.get("https://restaurant-backend-wwjm.onrender.com/api/v1/get-menu");
//       setMenu(res.data);  // Ensure your backend returns an array of items
//     } catch (err) {
//       console.error("Failed to fetch items", err);
//     }
//   };
  
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("https://restaurant-backend-wwjm.onrender.com/api/v1/get-category");
//       console.log("Category")
//       setCategories(["All", ...res.data.map((cat) => cat.name)]);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };
  

//   // const [items, setItems] = useState(initialItems);
//   const [filter, setFilter] = useState("All");
//   const [sort, setSort] = useState("None");
//   const [items, setItems] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showCatForm, setShowCatForm] = useState(false)
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "Pizza",
//     price: "",
//     promo: "",
//     description: "",
//     image: "",
//     available: true,
//   });

//   const [categoryForm, setCategoryForm] = useState ({
//     admin_id:"",
//     name:"",
//     desc:"",
//     img:"",
//   })

//   const [categories, setCategories] = useState(["All"]);

//   // const categories = ["All", "Pizza", "Fish", "Dessert"];

//   const sortedItems = [...items];

//   if (sort === "Low to High") {
//     sortedItems.sort(
//       (a, b) =>
//         parseFloat(a.price.replace("$", "")) -
//         parseFloat(b.price.replace("$", ""))
//     );
//   } else if (sort === "High to Low") {
//     sortedItems.sort(
//       (a, b) =>
//         parseFloat(b.price.replace("$", "")) -
//         parseFloat(a.price.replace("$", ""))
//     );
//   }

//   const filteredItems =
//     filter === "All"
//       ? sortedItems
//       : sortedItems.filter((item) => item.category === filter);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         image: URL.createObjectURL(file),
//       });
//     }
//   };

//   const handleSaveItem = () => {
//     if (editingIndex !== null) {
//       const updatedItems = [...items];
//       updatedItems[editingIndex] = formData;
//       setItems(updatedItems);
//     } else {
//       setItems((prev) => [...prev, formData]);
//     }

//     setFormData({
//       name: "",
//       category: "Pizza",
//       price: "",
//       promo: "",
//       description: "",
//       image: "",
//       available: true,
//     });
//     setEditingIndex(null);
//     setShowForm(false);
//   };

//   const handleEditItem = (index) => {
//     setFormData(items[index]);
//     setEditingIndex(index);
//     setShowForm(true);
//   };

//   const handleDeleteItem = (index) => {
//     if (confirm("Are you sure you want to delete this item?")) {
//       const updated = [...items];
//       updated.splice(index, 1);
//       setItems(updated);
//     }
//   };

//   const categoryColors = {
//     Pizza: "bg-red-100 text-red-700",
//     Fish: "bg-blue-100 text-blue-700",
//     Dessert: "bg-yellow-100 text-yellow-700",
//   };

//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://restaurant-backend-wwjm.onrender.com/api/v1/create-category", categoryForm);
//       if(res.data.status === 200){
//         alert("Category Created Successfully");
//         fetchCategories();
//         setShowCatForm(false);
//       }
//     } catch (err) {
//       alert("Failed to create category")
//       console.error(err);
//     }
//   };

//   const handleCreateMenu = async () => {
//     try {
//       const res = await axios.post("https://restaurant-backend-wwjm.onrender.com/api/v1/create-menu", formData);
//       if(res.status === 201 || res.data.status === 200){
//         alert("Menu Saved");
//         fetchMenu();
//         setShowForm(false)
//       }
//     } catch (err) {
//       alert("Failed to save Menu")
//       console.error(err);
//     }
//   }

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Sidebar Filter */}
//       <aside className="w-full md:w-1/4 bg-white border-r p-4">
//         <div className="grid grid-cols-2">
//           <h2 className="text-sm font-bold mb-4">Filter by Category</h2>
//           <button
//               className="bg-orange-500 text-white py-2 px-4 rounded"
//               onClick={() => {
//                 setCategoryForm({
//                   admin_id:"",
//                   name:"",
//                   desc:"",
//                   img:"",
//                 });
//                 setEditingIndex(null);
//                 setShowCatForm(true);
//               }}
//             >
//             + Add Category
//           </button>
//         </div>
        
//         <ul className="space-y-2 mb-6">
//           {categories.map((cat) => (
//             <li key={cat}>
//               <button
//                 onClick={() => setFilter(cat)}
//                 className={`w-full text-left p-2 rounded ${
//                   filter === cat
//                     ? "bg-orange-500 text-white"
//                     : "hover:bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 {cat}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Sort Options */}
//         <h2 className="text-lg font-bold mb-2">Sort by Price</h2>
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="w-full border p-2 rounded"
//         >
//           <option value="None">None</option>
//           <option value="Low to High">Low to High</option>
//           <option value="High to Low">High to Low</option>
//         </select>
//       </aside>

//       {/* Menu Items */}
//       <main className="flex-1 p-4 bg-gray-50">
//         <header className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Menu</h2>
//           <button
//             className="bg-orange-500 text-white py-2 px-4 rounded"
//             onClick={() => {
//               setFormData({
//                 name: "",
//                 category: "Pizza",
//                 price: "",
//                 promo: "",
//                 description: "",
//                 image: "",
//                 available: true,
//               });
//               setEditingIndex(null);
//               setShowForm(true);
//             }}
//           >
//             + Add Item
//           </button>
//         </header>

//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredItems.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded shadow hover:shadow-lg p-4 transition-all"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-32 object-cover rounded mb-4"
//               />
//               <Link to={`/menu/${item.id}`}>
//                 <h3 className="text-lg font-bold">{item.name}</h3>
//               </Link>
//               <span
//                 className={`inline-block px-2 py-1 text-xs rounded ${
//                   categoryColors[item.category] || "bg-gray-100 text-gray-700"
//                 } mb-1`}
//               >
//                 {item.category}
//               </span>
//               <p className="text-sm mb-2">{item.description}</p>
//               <p className="font-bold">{item.price}</p>
//               {item.promo && (
//                 <p className="text-sm text-orange-500">{item.promo}</p>
//               )}
//               <p
//                 className={`text-sm mt-2 ${
//                   item.available ? "text-green-600" : "text-red-500"
//                 }`}
//               >
//                 {item.available ? "Available" : "Out of Stock"}
//               </p>
//               <div className="flex justify-end space-x-2 mt-4">
//                 <button
//                   onClick={() => handleEditItem(index)}
//                   className="text-blue-600 text-sm hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteItem(index)}
//                   className="text-red-600 text-sm hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </main>

//       {/* Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded shadow w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">
//               {editingIndex !== null ? "Edit Item" : "Add New Item"}
//             </h3>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full border p-2 rounded"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//               <select
//                 className="w-full border p-2 rounded"
//                 value={formData.category}
//                 onChange={(e) =>
//                   setFormData({ ...formData, category: e.target.value })
//                 }
//               >
//                 <option value="Pizza">Pizza</option>
//                 <option value="Fish">Fish</option>
//                 <option value="Dessert">Dessert</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Price (e.g., $12.99)"
//                 className="w-full border p-2 rounded"
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Promo (optional)"
//                 className="w-full border p-2 rounded"
//                 value={formData.promo}
//                 onChange={(e) =>
//                   setFormData({ ...formData, promo: e.target.value })
//                 }
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full border p-2 rounded"
//               />
//               {formData.image && (
//                 <img
//                   src={formData.image}
//                   alt="Preview"
//                   className="w-full h-32 object-cover rounded mt-2"
//                 />
//               )}
//               <textarea
//                 placeholder="Description"
//                 className="w-full border p-2 rounded"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//               />
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.available}
//                   onChange={(e) =>
//                     setFormData({ ...formData, available: e.target.checked })
//                   }
//                 />
//                 <span>Available</span>
//               </label>
//             </div>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 onClick={handleCreateMenu}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 {editingIndex !== null ? "Update" : "Save"}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingIndex(null);
//                 }}
//                 className="text-gray-600 px-4 py-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       {showCatForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded shadow w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">
//               {editingIndex !== null ? "Edit Item" : "Add New Item"}
//             </h3>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full border p-2 rounded"
//                 value={categoryForm.name}
//                 onChange={(e) =>
//                   setCategoryForm({ ...categoryForm, name: e.target.value })
//                 }
//               />
//               <select
//                 className="w-full border p-2 rounded"
//                 value={categoryForm.category}
//                 onChange={(e) =>
//                   setCategoryForm({ ...categoryForm, category: e.target.value })
//                 }
//               >
//                 <option value="Pizza">Pizza</option>
//                 <option value="Fish">Fish</option>
//                 <option value="Dessert">Dessert</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Price (e.g., $12.99)"
//                 className="w-full border p-2 rounded"
//                 value={categoryForm.price}
//                 onChange={(e) =>
//                   setCategoryForm({ ...categoryForm, price: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Promo (optional)"
//                 className="w-full border p-2 rounded"
//                 value={formData.promo}
//                 onChange={(e) =>
//                   setCategoryForm({ ...categoryForm, promo: e.target.value })
//                 }
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full border p-2 rounded"
//               />
//               {categoryForm.image && (
//                 <img
//                   src={categoryForm.image}
//                   alt="Preview"
//                   className="w-full h-32 object-cover rounded mt-2"
//                 />
//               )}
//               <textarea
//                 placeholder="Description"
//                 className="w-full border p-2 rounded"
//                 value={categoryForm.description}
//                 onChange={(e) =>
//                   setCategoryForm({ ...categoryForm, description: e.target.value })
//                 }
//               />
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.available}
//                   onChange={(e) =>
//                     setCategoryForm({ ...categoryForm, available: e.target.checked })
//                   }
//                 />
//                 <span>Available</span>
//               </label>
//             </div>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 onClick={handleCreateCategory}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 {editingIndex !== null ? "Update" : "Save"}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowCatForm(false);
//                   setEditingIndex(null);
//                 }}
//                 className="text-gray-600 px-4 py-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MenuManager() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [menuData, setMenuData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://restaurant-backend-wwjm.onrender.com/api/v1/get-category');
      setCategories(res.data?.categories || []);
      console.log("Fetched categories", res.data)
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  // Fetch menus
  const fetchMenus = async () => {
    try {
      const res = await axios.get('https://restaurant-backend-wwjm.onrender.com/api/v1/get-menu');
      setMenus(res.data?.menus || []);
      console.log("Fetched Menus",res.data)
    } catch (err) {
      console.error('Error fetching menus', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);

  // Create Category
  const createCategory = async () => {
    try {
      await axios.post('https://restaurant-backend-wwjm.onrender.com/api/v1/create-category', {
        name: categoryName
      });
      setCategoryName('');
      setShowCategoryModal(false);
      fetchCategories();
    } catch (err) {
      console.error('Error creating category', err);
    }
  };

  // Create Menu
  const createMenu = async () => {
    try {
      await axios.post('https://restaurant-backend-wwjm.onrender.com/api/v1/create-menu', menuData);
      setMenuData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
      });
      setShowMenuModal(false);
      fetchMenus();
    } catch (err) {
      console.error('Error creating menu', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-red-600">SpicyHunt Menu Manager</h1>
        <div className="space-x-4">
          <button onClick={() => setShowCategoryModal(true)} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            + Add Category
          </button>
          <button onClick={() => setShowMenuModal(true)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            + Add Menu
          </button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span key={cat._id} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{cat.name}</span>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menus.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="font-semibold text-red-500 mt-2">${item.price}</p>
              <p className="text-sm text-orange-600">{item.category}</p>
              {item.image && <img src={item.image} alt={item.name} className="mt-2 rounded-lg h-32 object-cover" />}
            </div>
          ))}
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-lg">
            <h3 className="text-lg font-bold">Add New Category</h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Category name"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCategoryModal(false)} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
              <button onClick={createCategory} className="px-4 py-2 rounded bg-orange-500 text-white">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] space-y-4 shadow-lg">
            <h3 className="text-lg font-bold">Add New Menu Item</h3>
            <input
              type="text"
              placeholder="Name"
              value={menuData.name}
              onChange={(e) => setMenuData({ ...menuData, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={menuData.description}
              onChange={(e) => setMenuData({ ...menuData, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={menuData.price}
              onChange={(e) => setMenuData({ ...menuData, price: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
            <select
              value={menuData.category}
              onChange={(e) => setMenuData({ ...menuData, category: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Image URL"
              value={menuData.image}
              onChange={(e) => setMenuData({ ...menuData, image: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowMenuModal(false)} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
              <button onClick={createMenu} className="px-4 py-2 rounded bg-red-500 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

