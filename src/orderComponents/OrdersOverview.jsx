import {
    FaClipboardList,
    FaSpinner,
    FaCheckCircle,
    FaTimesCircle,
  } from "react-icons/fa";
  
  const OrdersOverview = () => {
    const metrics = [
      {
        label: "Total Orders",
        value: 200,
        icon: <FaClipboardList className="text-blue-500 text-xl" />,
      },
      {
        label: "In Process",
        value: 45,
        icon: <FaSpinner className="text-yellow-500 text-xl animate-spin-slow" />,
      },
      {
        label: "Completed",
        value: 140,
        icon: <FaCheckCircle className="text-green-500 text-xl" />,
      },
      {
        label: "Cancelled",
        value: 15,
        icon: <FaTimesCircle className="text-red-500 text-xl" />,
      },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 w-full xl:col-span-2 pt-5 h-full">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow h-fit rounded-xl flex flex-col gap-2 p-4"
          >
            <div>{item.icon}</div>
            <h4 className="text-sm text-gray-600">{item.label}</h4>
            <p className="text-xl font-semibold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default OrdersOverview;
  