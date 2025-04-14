const timeline = [
    { step: "Order Placed", time: "Oct 12, 2035, 10:15 AM", status: "completed" },
    { step: "Order Confirmed", time: "Oct 12, 2035, 10:18 AM", status: "completed" },
    { step: "Preparing Food", time: "Oct 12, 2035, 10:30 AM", status: "completed" },
    { step: "Out for Delivery", time: "Oct 12, 2035, 11:00 AM", status: "pending" },
    { step: "Delivered", time: "Oct 12, 2035, 11:30 AM", status: "pending" },
  ];
  
  const OrderTimeline = () => {
    return (
      <div className="flex-1 p-6 bg-white rounded-xl shadow">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Order Timeline</h4>
        <div className="relative">
          {timeline.map(({ step, time, status }, index) => (
            <div key={index} className="flex items-center mb-6">
              {/* Connector */}
              {index > 0 && (
                <div className="w-1 h-6 bg-gray-300 mx-auto"></div>
              )}
              {/* Status Indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  status === "completed" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              {/* Timeline Content */}
              <div className="ml-4">
                <p className="font-semibold">{step}</p>
                <p className="text-sm text-gray-500">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default OrderTimeline;
  