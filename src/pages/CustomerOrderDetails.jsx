import CustomerInfo from "../orderComponents/CustomerInfo";
import DriverInfo from "../orderComponents/DriverInfo";
import OrderDetails from "../orderComponents/OrderDetails";
import OrderTimeline from "../orderComponents/OrderTimeline";
import PromoBanner from "../orderComponents/PromoBanner";

const CustomerOrderDetails = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Order Details */}
      <OrderDetails />

      {/* Customer & Timeline Row */}
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        <CustomerInfo />
        <OrderTimeline />
      </div>

      {/* Driver Info */}
      <DriverInfo />

      {/* Promotional Banner */}
      <PromoBanner />
    </div>
  );
};

export default CustomerOrderDetails;
