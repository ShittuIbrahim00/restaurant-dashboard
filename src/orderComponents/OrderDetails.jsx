const OrderDetails = () => {
  const items = [
    { name: "Smokey Supreme Pizza", category: "Pizza", quantity: 1, price: "$12.00", notes: "Extra cheese" },
    { name: "Garlic Bread", category: "Bakery", quantity: 1, price: "$5.00", notes: "Lightly toasted" },
    { name: "Caesar Salad", category: "Salad", quantity: 2, price: "$8.00", notes: "Dressing on the side" },
    { name: "Chocolate Lava Cake", category: "Dessert", quantity: 1, price: "$10.00", notes: "Extra chocolate drizzle" },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow">
    <h4 className="text-lg font-semibold text-gray-700 mb-4">Order Details (#ORD1028)</h4>
    
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="border-b p-2">Item</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Quantity</th>
            <th className="border-b p-2">Price</th>
            <th className="border-b p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.price}</td>
              <td className="p-2">{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    <p className="text-right mt-4 font-semibold">Total: $43.00</p>
  </div>
  
  );
};

export default OrderDetails;
