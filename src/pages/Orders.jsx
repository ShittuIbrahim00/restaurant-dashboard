import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import OrderList from "../orderComponents/OrderList";
import OrdersOverview from "../orderComponents/OrdersOverview";
import OrderTypes from "../orderComponents/OrderTypes";

export default function Orders() {
  const ordersData = [
    { name: "Mon", orders: 120 },
    { name: "Tue", orders: 160 },
    { name: "Wed", orders: 130 },
    { name: "Thu", orders: 185 },
    { name: "Fri", orders: 150 },
    { name: "Sat", orders: 100 },
    { name: "Sun", orders: 95 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 🔷 All top cards on one responsive row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* OrdersOverview spans 2 columns */}
        <div className="xl:col-span-1">
          <OrdersOverview />
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl xl:col-span-2 shadow w-full">
          <Card>
            <CardContent className="p-4">
              <p className="font-semibold text-gray-700 mb-4">
                Weekly Orders Overview
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={ordersData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#999"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#999"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: "14px", borderRadius: "8px" }}
                    labelStyle={{ color: "#555", fontWeight: "bold" }}
                    cursor={{ fill: "#FFECE4" }}
                  />
                  <Bar
                    dataKey="orders"
                    fill="#FF6C1F"
                    radius={[10, 10, 0, 0]} // rounded top corners
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Order Types */}
        <div className="xl:col-span-2 w-full">
          <OrderTypes />
        </div>
      </div>

      {/* 🔻 Order List always sits below */}
      <div>
        <OrderList />
      </div>
    </div>
  );
}
