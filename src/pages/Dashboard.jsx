import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { MdShoppingCart, MdGroup, MdAttachMoney } from "react-icons/md";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Input } from "@/components/ui/input";
import CountUp from "react-countup";
import OrderTypesCard from "../components/OrderTypesCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  // const LOCAL_HOST = "http://localhost:5000/api/v1";
  const LOCAL_HOST = "https://restaurant-backend-wwjm.onrender.com/api/v1";
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30); // default
  const [total, setTotal] = useState(0);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${LOCAL_HOST}/orders`);
      const order = res.data.data;
      const length = order.length;
      setTotalOrder(length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${LOCAL_HOST}/users`);
      // const res1 = await axios.get(`${LOCAL_HOST}/history/revenue`);
      const order = res.data.length;
      // console.log(res1);
      setTotalUser(order);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${LOCAL_HOST}/history/top-category?days=${days}`
      );
      const raw = res.data.data;
      const formatted = raw.map((item) => ({
        name: item.category,
        value: item.totalQuantity,
      }));

      const totalValue = raw.reduce((sum, item) => sum + item.totalQuantity, 0);

      setPieData(formatted);
      setTotal(totalValue);
    } catch (err) {
      console.error("Error fetching top categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchAllUsers();
    fetchTopCategories();
  }, []);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get(`${LOCAL_HOST}/history/analytics/order-overview`);
        const processed = res.data.map((item) => ({
          name: item._id, // _id is the date string from Mongo
          orders: item.count,
        }));
        setOrdersData(processed);
      } catch (err) {
        console.error("Failed to fetch order overview", err);
      }
    };
    fetchOverview();
  }, []);

  const revenueData = [
    { month: "Apr", income: 10000, expense: 5000 },
    { month: "May", income: 15000, expense: 7000 },
    { month: "Jun", income: 17000, expense: 8000 },
    { month: "Jul", income: 16800, expense: 6000 },
    { month: "Aug", income: 16000, expense: 6500 },
    { month: "Sep", income: 18000, expense: 7200 },
    { month: "Oct", income: 19000, expense: 8000 },
  ];

  const pieColors = ["#FF7043", "#FFA726", "#66BB6A", "#29B6F6"];

  const trendingMenus = [
    {
      name: "Grilled Chicken Delight",
      price: "$18.00",
      rating: 4.9,
      sold: 350,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYQIOsl5L6namfbnmAuHDY-Y5FyuBIqPIKA&s",
    },
    {
      name: "Sunny Citrus Cake",
      price: "$8.50",
      rating: 4.8,
      sold: 400,
      img: "/citrus-cake.jpg",
    },
    {
      name: "Fiery Shrimp Salad",
      price: "$12.00",
      rating: 4.7,
      sold: 270,
      img: "/shrimp-salad.jpg",
    },
  ];

  const recentOrders = [
    {
      id: "ORD1025",
      menu: "Salmon Sushi Roll",
      amount: "$30.00",
      customer: "Dana White",
      status: "On Process",
      img: "/sushi.jpg",
    },
    {
      id: "ORD1026",
      menu: "Spaghetti Carbonara",
      amount: "$15.00",
      customer: "Eve Carter",
      status: "Cancelled",
      img: "/carbonara.jpg",
    },
    {
      id: "ORD1027",
      menu: "Classic Cheeseburger",
      amount: "$10.00",
      customer: "Charlie Brown",
      status: "Completed",
      img: "/burger.jpg",
    },
  ];

  const reviews = [
    {
      name: "Sarah M.",
      date: "Oct 12, 2025",
      text: "The flavor is fantastic, everything was perfect!",
      stars: 5,
      dish: "Classic Italian Penne",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYQIOsl5L6namfbnmAuHDY-Y5FyuBIqPIKA&s",
    },
    {
      name: "Michael R.",
      date: "Oct 15, 2025",
      text: "Generous cheese and the perfect spice in the pepperoni.",
      stars: 4.5,
      dish: "Smokey Supreme Pizza",
      img: "/pizza.jpg",
    },
  ];

  const activities = [
    {
      user: "Sylvester Quilt",
      role: "Inventory Manager",
      action: 'Updated inventory - 10 units of "Organic Chicken Breast"',
      time: "11:20 AM",
    },
    {
      user: "Maria Kings",
      role: "Kitchen Admin",
      action: "Marked order #ORD1028 as completed",
      time: "11:00 AM",
    },
    {
      user: "William Smith",
      role: "Receptionist",
      action: "Guided new reservation for 4 at 7:00 PM",
      time: "10:30 AM",
    },
  ];

  // Utility to format large numbers into "K" notation
  const formatToK = (num) => {
    return num >= 1000 ? `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K` : num;
  };

  // Label with name + percentage
  const renderCustomizedLabel = ({ name, percent }) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  return (
    <div className="grid grid-cols-12 gap-4 bg-customColor p-4 min-h-screen">
      {/* Main Content - Left 9 columns */}
      <div className="col-span-12 lg:col-span-9 grid grid-cols-12 gap-4">
        {/* Summary Cards */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-xl">
          <Card className="bg-white p-6 flex items-center gap-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl text-blue-600 bg-blue-100 p-4 rounded-full shadow-sm">
              <MdShoppingCart />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h2 className="text-3xl font-semibold text-gray-800">
                <CountUp
                  start={0}
                  end={totalOrder}
                  duration={2.5}
                  separator=","
                />
              </h2>
            </div>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded-xl">
          <Card className="bg-white p-6 flex items-center gap-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl text-green-600 bg-green-100 p-4 rounded-full shadow-sm">
              <MdGroup />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <h2 className="text-3xl font-semibold text-gray-800">
                <CountUp
                  start={0}
                  end={totalUser}
                  duration={2.5}
                  separator=","
                />
              </h2>
            </div>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded-xl">
          <Card className="shadow-md p-6 flex items-center gap-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl text-yellow-600 bg-yellow-100 p-4 rounded-full shadow-sm">
              <MdAttachMoney />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h2 className="text-3xl font-semibold text-gray-800">
                <CountUp
                  start={0}
                  end={215860}
                  duration={2.5}
                  separator=","
                  prefix="$"
                />
              </h2>
            </div>
          </Card>
        </div>

        {/* Revenue and Pie Charts */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-gray-800 text-lg">
                Total Revenue
              </p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={revenueData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  stroke="#999"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#999"
                  tickFormatter={formatToK}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => `$${formatToK(value)}`}
                  contentStyle={{ fontSize: "14px", borderRadius: "8px" }}
                  labelStyle={{ color: "#555", fontWeight: "bold" }}
                />
                <Legend verticalAlign="top" iconType="circle" height={30} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#FF7043"
                  name="Income"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#66BB6A"
                  name="Expenses"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center px-6 pt-6">
            <p className="font-semibold text-gray-800 text-lg">
              Top Categories
            </p>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="text-sm border rounded-md px-2 py-1"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </div>
          <div className="p-6 pt-4">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading...</div>
            ) : pieData.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No data available
              </div>
            ) : (
              <>
                <div className="mb-2 text-sm text-gray-600">
                  Total Sales: <span className="font-semibold">{total}</span>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label={renderCustomizedLabel}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} sales`, name]}
                      contentStyle={{ fontSize: "14px", borderRadius: "8px" }}
                      labelStyle={{ color: "#555", fontWeight: "bold" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>

        {/* Orders Overview + Order Types side-by-side */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-xl">
          <Card>
            <CardContent>
              <p className="font-semibold mb-2">Orders Overview</p>
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
                    radius={[10, 10, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <OrderTypesCard />

        {/* Recent Orders */}
        <div className="col-span-12 bg-white rounded-xl">
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Recent Orders</p>
                <Input placeholder="Search orders..." className="w-64" />
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Photo</th>
                    <th>Menu</th>
                    <th>Amount</th>
                    <th>Customer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="border-t text-sm">
                      <td>{order.id}</td>
                      <td>
                        <img
                          src={order.img}
                          alt={order.menu}
                          className="w-10 h-10 rounded"
                        />
                      </td>
                      <td>{order.menu}</td>
                      <td>{order.amount}</td>
                      <td>{order.customer}</td>
                      <td>
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
            </CardContent>
          </Card>
        </div>

        {/* Customer Reviews Slider */}
        <div className="col-span-12">
          <p className="font-semibold mb-4">Customer Reviews</p>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx} className="bg-white rounded-xl">
                <Card className="h-full">
                  <CardContent className="flex gap-4 p-4">
                    <img
                      src={review.img}
                      alt={review.dish}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{review.dish}</p>
                      <p className="text-sm text-gray-600">{review.text}</p>
                      <p className="text-sm mt-1">
                        {review.name} • {review.date} • ⭐ {review.stars}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 bg-white rounded-xl">
          <Card>
            <CardContent>
              <p className="font-semibold mb-2">Recent Activity</p>
              {activities.map((activity, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-medium">
                    {activity.user}{" "}
                    <span className="text-xs text-gray-500">
                      ({activity.role})
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Sidebar - 3 columns */}
      <div className="col-span-12 lg:col-span-3">
        <p className="font-semibold mb-4 text-2xl">Menu Highlights</p>
        {trendingMenus.map((item, idx) => (
          <div key={idx} className="flex flex-col mb-4 bg-white rounded-xl">
            <div className="p-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="px-4">
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-gray-500">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
