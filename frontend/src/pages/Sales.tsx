import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Package2, Truck, Box, Receipt, ChevronDown } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 2000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
];

const topProducts2023 = [
  {
    name: "Handwoven Scarf",
    image: "/public/productimg.png",
    description: "Traditional handwoven scarf with natural dyes",
    sales: 1200,
  },
  {
    name: "Bamboo Basket",
    image: "/public/productimg.png",
    description: "Eco-friendly storage solution",
    sales: 950,
  },
  {
    name: "Organic Soap",
    image: "/public/productimg.png",
    description: "Natural handmade soap with essential oils",
    sales: 800,
  },
];

const topProducts2022 = [
  {
    name: "Cotton Bag",
    image: "/public/productimg.png",
    description: "Reusable shopping bag",
    sales: 1100,
  },
  {
    name: "Jute Mat",
    image: "/public/productimg.png",
    description: "Traditional handwoven mat",
    sales: 900,
  },
  {
    name: "Pottery Set",
    image: "/public/productimg.png",
    description: "Handcrafted ceramic set",
    sales: 750,
  },
];

const orderHistory = [
  {
    orderNo: "#ORD001",
    description: "Bulk order - Handwoven Scarves",
    amount: 2500,
    timeAgo: "2 weeks ago",
  },
  {
    orderNo: "#ORD002",
    description: "Mixed crafts bundle",
    amount: 1800,
    timeAgo: "1 month ago",
  },
  {
    orderNo: "#ORD003",
    description: "Festival special collection",
    amount: 3200,
    timeAgo: "2 months ago",
  },
];

const Sales = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  const salesMetrics = [
    { title: "To be Packed", value: 45, icon: Box },
    { title: "To be Shipped", value: 32, icon: Package2 },
    { title: "To be Delivered", value: 28, icon: Truck },
    { title: "To be Invoiced", value: 15, icon: Receipt },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />
      <main className="flex-1 p-6 lg:p-8">
        {/* Sales Activity Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Sales Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {salesMetrics.map((metric) => (
              <div
                key={metric.title}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">{metric.title}</p>
                    <h3 className="text-2xl font-bold">{metric.value}</h3>
                  </div>
                  <metric.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Products and Order History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Top Selling Products</h2>
              <Select
                value={selectedYear}
                onValueChange={(value) => setSelectedYear(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              {(selectedYear === "2023" ? topProducts2023 : topProducts2022).map(
                (product) => (
                  <div
                    key={product.name}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                      <p className="text-sm font-medium text-primary mt-1">
                        {product.sales} units sold
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Order History */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Order History</h2>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.orderNo}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{order.orderNo}</p>
                    <p className="text-sm text-gray-600">{order.description}</p>
                    <p className="text-sm text-gray-500">{order.timeAgo}</p>
                  </div>
                  <p className="font-semibold text-primary">₹{order.amount}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Revenue Breakdown Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center gap-40 items-center mb-6">
            <h2 className="text-xl font-bold">Revenue Breakdown</h2>
            <Tabs
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="daily">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#6366F1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="weekly">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#0D9488" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="monthly">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#F43F5E" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Upcoming Orders Section */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Upcoming Orders</h2>
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div
                key={order.orderNo}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{order.orderNo}</p>
                  <p className="text-sm text-gray-600">{order.description}</p>
                  <p className="text-sm text-gray-500">Due next week</p>
                </div>
                <Button variant="outline">View Details</Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sales;