import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const initialItems = [
    {
      id: 1,
      name: "Smokey Supreme Pizza",
      category: "Pizza",
      price: "$14.99",
      promo: "20% OFF",
      description:
        "A rich and smoky pizza topped with pepperoni, sausage, and mozzarella.",
      image: "https://via.placeholder.com/150",
      available: true,
    },
    {
      id: 2,
      name: "Grilled Salmon",
      category: "Fish",
      price: "$22.99",
      promo: "",
      description:
        "Fresh Atlantic salmon grilled to perfection and served with vegetables.",
      image: "https://via.placeholder.com/150",
      available: false,
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      category: "Dessert",
      price: "$8.99",
      promo: "",
      description:
        "Warm chocolate cake with a gooey center, served with vanilla ice cream.",
      image: "https://via.placeholder.com/150",
      available: true,
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("None");
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Pizza",
    price: "",
    promo: "",
    description: "",
    image: "",
    available: true,
  });

  const categories = ["All", "Pizza", "Fish", "Dessert"];
  const sortedItems = [...items];

  if (sort === "Low to High") {
    sortedItems.sort(
      (a, b) =>
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", ""))
    );
  } else if (sort === "High to Low") {
    sortedItems.sort(
      (a, b) =>
        parseFloat(b.price.replace("$", "")) -
        parseFloat(a.price.replace("$", ""))
    );
  }

  const filteredItems =
    filter === "All"
      ? sortedItems
      : sortedItems.filter((item) => item.category === filter);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSaveItem = () => {
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = formData;
      setItems(updatedItems);
    } else {
      setItems((prev) => [...prev, formData]);
    }

    setFormData({
      name: "",
      category: "Pizza",
      price: "",
      promo: "",
      description: "",
      image: "",
      available: true,
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleEditItem = (index) => {
    setFormData(items[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteItem = (index) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
    }
  };

  const categoryColors = {
    Pizza: "bg-red-100 text-red-700",
    Fish: "bg-blue-100 text-blue-700",
    Dessert: "bg-yellow-100 text-yellow-700",
  };

  return (
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

        {/* Sort Options */}
        <h2 className="text-lg font-bold mb-2">Sort by Price</h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="None">None</option>
          <option value="Low to High">Low to High</option>
          <option value="High to Low">High to Low</option>
        </select>
      </aside>

      {/* Menu Items */}
      <main className="flex-1 p-4 bg-gray-50">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded"
            onClick={() => {
              setFormData({
                name: "",
                category: "Pizza",
                price: "",
                promo: "",
                description: "",
                image: "",
                available: true,
              });
              setEditingIndex(null);
              setShowForm(true);
            }}
          >
            + Add Item
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded shadow hover:shadow-lg p-4 transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded mb-4"
              />
              <Link to={`/menu/${item.id}`}>
                <h3 className="text-lg font-bold">{item.name}</h3>
              </Link>
              <span
                className={`inline-block px-2 py-1 text-xs rounded ${
                  categoryColors[item.category] || "bg-gray-100 text-gray-700"
                } mb-1`}
              >
                {item.category}
              </span>
              <p className="text-sm mb-2">{item.description}</p>
              <p className="font-bold">{item.price}</p>
              {item.promo && (
                <p className="text-sm text-orange-500">{item.promo}</p>
              )}
              <p
                className={`text-sm mt-2 ${
                  item.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.available ? "Available" : "Out of Stock"}
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEditItem(index)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit Item" : "Add New Item"}
            </h3>
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
              <select
                className="w-full border p-2 rounded"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Pizza">Pizza</option>
                <option value="Fish">Fish</option>
                <option value="Dessert">Dessert</option>
              </select>
              <input
                type="text"
                placeholder="Price (e.g., $12.99)"
                className="w-full border p-2 rounded"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Promo (optional)"
                className="w-full border p-2 rounded"
                value={formData.promo}
                onChange={(e) =>
                  setFormData({ ...formData, promo: e.target.value })
                }
              />
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
              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) =>
                    setFormData({ ...formData, available: e.target.checked })
                  }
                />
                <span>Available</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleSaveItem}
                className="bg-green-600 text-white px-4 py-2 rounded"
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
          </div>
        </div>
      )}
    </div>
  );
}
