const CustomerInfo = () => {
    const customer = {
      name: "Frank Miller",
      address: "789 Oak Lane",
      email: "millerfrank@email.com",
      phone: "(555) 345-7890",
      image: "https://via.placeholder.com/100", // Placeholder image URL
    };
  
    return (
      <div className="flex-1 p-6 bg-white rounded-xl shadow flex flex-col items-center lg:items-start space-y-4">
        {/* Customer Profile Image */}
        <img
          src={customer.image}
          alt="Customer Profile"
          className="w-24 h-24 rounded-full shadow-lg"
        />
  
        {/* Customer Details */}
        <div className="text-center lg:text-left">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Customer Details
          </h4>
          <ul>
            {Object.entries(customer)
              .filter(([key]) => key !== "image")
              .map(([key, value]) => (
                <li key={key} className="text-gray-600 mb-2">
                  <strong className="capitalize">{key}: </strong> {value}
                </li>
              ))}
          </ul>
        </div>
  
        {/* Message Button */}
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600">
          Message {customer.name}
        </button>
      </div>
    );
  };
  
  export default CustomerInfo;
  