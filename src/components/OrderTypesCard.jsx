import { UtensilsCrossed, ShoppingBag, Bike } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const OrderTypesCard = () => {
  const [selectedRange, setSelectedRange] = useState("weekly");
  const { ref, inView } = useInView({ triggerOnce: true });

  const orderData = {
    weekly: [
      { type: "Dine-In", value: 55, color: "bg-blue-500", icon: <UtensilsCrossed size={30} className="text-[#FF8849] bg-[#FFEEE0] p-1 rounded-md"/> },
      { type: "Takeaway", value: 30, color: "bg-green-500", icon: <ShoppingBag size={30} className="text-[#FF8849] bg-[#FFEEE0] p-1 rounded-md" /> },
      { type: "Delivery", value: 15, color: "bg-orange-500", icon: <Bike size={30} className="text-[#FF8849] bg-[#FFEEE0] p-1 rounded-md" /> },
    ],
    monthly: [
      { type: "Dine-In", value: 60, color: "bg-blue-500", icon: <UtensilsCrossed size={30} className="text-[#FF8849] bg-[#FFEEE0] p-1 rounded-md" /> },
      { type: "Takeaway", value: 25, color: "bg-green-500", icon: <ShoppingBag size={30} className="text-[#FF8849] bg-[#FFEEE0] p-1 rounded-md" /> },
      { type: "Delivery", value: 15, color: "bg-orange-500", icon: <Bike size={30} className="text-[#FF8849] bg-[#FFEEE0] p-1 rounded-md" /> },
    ],
  };

  const currentData = orderData[selectedRange];

  return (
    <div className="col-span-12 md:col-span-6 bg-white rounded-xl" ref={ref}>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-gray-800 text-lg">Order Types</p>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-lime-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {currentData.map((order, idx) => (
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
