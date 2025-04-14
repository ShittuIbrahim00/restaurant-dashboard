const DriverInfo = () => {
  const driver = {
    name: "Samuel Peterson",
    phone: "(555) 678-1234",
    vehicle: "Motorcycle - XY12345",
    status: "On Route",
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Driver Details</h4>
      <ul>
        <li className="mb-2">
          <strong className="text-gray-600">Name:</strong> {driver.name}
        </li>
        <li className="mb-2">
          <strong className="text-gray-600">Phone:</strong> {driver.phone}
        </li>
        <li className="mb-2">
          <strong className="text-gray-600">Vehicle:</strong> {driver.vehicle}
        </li>
        <li>
          <strong className="text-gray-600">Status:</strong> {driver.status}
        </li>
      </ul>
    </div>
  );
};

export default DriverInfo;
