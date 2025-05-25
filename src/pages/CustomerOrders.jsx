import AllCustomerOrder from "../orderComponents/AllCustomerOrders";
import PromoBanner from "../orderComponents/PromoBanner";

const CustomerOrders = () => {
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Orders List */}
        <AllCustomerOrder />
        {/* Promo Section */}
        {/* <PromoBanner /> */}
      </div>
    </div>
  );
};

export default CustomerOrders;
