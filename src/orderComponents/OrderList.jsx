import { Link } from "react-router-dom";

const orders = [
  {
    id: "ORD1023",
    customer: "Alice Johnson",
    type: "Dine-In",
    quantity: 1,
    amount: "$18.00",
    status: "Completed",
  },
  {
    id: "ORD1024",
    customer: "Bob Smith",
    type: "Takeaway",
    quantity: 2,
    amount: "$24.00",
    status: "Cancelled",
  },
  // Add more orders as needed
];

const OrderList = () => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Order List</h4>
      
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2 whitespace-nowrap">Order ID</th>
              <th className="border-b p-2 whitespace-nowrap">Customer</th>
              <th className="border-b p-2 whitespace-nowrap">Type</th>
              <th className="border-b p-2 whitespace-nowrap">Quantity</th>
              <th className="border-b p-2 whitespace-nowrap">Amount</th>
              <th className="border-b p-2 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">
                  <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                    {order.customer}
                  </Link>
                </td>
                <td className="p-2">{order.type}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">{order.amount}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
