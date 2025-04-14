import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    name: "Smokey Supreme Pizza",
    category: "Pizza",
    price: "$14.99",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Grilled Salmon",
    category: "Fish",
    price: "$22.99",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: "$8.99",
    rating: 4.9,
  },
  // Add more items as needed
];

export default function MenuDetails() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold"></h2>
        <button className="bg-orange-500 text-white py-2 px-4 rounded">
          + Add Item
        </button>
      </header>

      {/* Menu Grid: 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3
              onClick={() => navigate(`/menu/${item.id}`)}
              className="text-lg font-bold text-orange-600 hover:underline cursor-pointer"
            >
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-sm font-bold">{item.price}</p>
            <p className="text-sm text-yellow-500">⭐️ {item.rating}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
