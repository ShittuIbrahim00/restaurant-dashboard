import { useEffect, useState } from "react";
import axios from "axios";
import { UtensilsCrossed, ShoppingBag, Bike } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const iconStyles = "text-[#FF8849] bg-[#FFEEE0] p-1 rounded-md";

const iconMap = {
  "Dine-in": <UtensilsCrossed size={30} className={iconStyles} />,
  "Takeaway": <ShoppingBag size={30} className={iconStyles} />,
  "Delivery": <Bike size={30} className={iconStyles} />,
};

const colorMap = {
  "Dine-in": "bg-blue-500",
  "Takeaway": "bg-green-500",
  "Delivery": "bg-orange-500",
};

const OrderTypesCard = () => {
  // const LOCAL_HOST = "http://localhost:5000/api/v1";
  const LOCAL_HOST = "https://restaurant-backend-wwjm.onrender.com/api/v1";
  const [selectedRange] = useState("weekly"); // keep this in case you expand later
  const [orderData, setOrderData] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const fetchOrderTypes = async () => {
      try {
        const res = await axios.get(`${LOCAL_HOST}/history/analytics/order-type-distribution`);
        const processed = res.data.map((item) => ({
          type: item.type,
          value: item.percentage,
          icon: iconMap[item.type],
          color: colorMap[item.type],
        }));
        setOrderData(processed);
      } catch (err) {
        console.error("Failed to fetch order type distribution", err);
      }
    };
    fetchOrderTypes();
  }, []);

  return (
    <div className="col-span-12 md:col-span-6 bg-white rounded-xl" ref={ref}>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-gray-800 text-lg">Order Types</p>
          </div>

          {orderData.map((order, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex gap-4 items-center">
                <div className="mt-2">{order.icon}</div>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="text-sm font-medium text-gray-700 flex justify-between">
                    <span className="font-jakarta text-sm text-black">{order.type}</span>
                    <span className="text-gray-500">{order.value}%</span>
                  </div>
                  <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-5 ${order.color} rounded-full transition-all duration-[1500ms] ease-in-out`}
                      style={{
                        width: inView ? `${order.value}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTypesCard;
