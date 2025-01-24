import { Edit, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AppSidebar from "@/components/AppSidebar";

const revenueData = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 1500 },
  { month: "Mar", revenue: 1300 },
  { month: "Apr", revenue: 1800 },
  { month: "May", revenue: 2000 },
  { month: "Jun", revenue: 2500 },
];

const companies = [
  {
    name: "Tech Solutions Ltd",
    description: "Technology • Software Development",
    score: 95,
    logo: "/placeholder.svg",
  },
  {
    name: "Green Earth Co",
    description: "Sustainability • Eco-friendly Products",
    score: 88,
    logo: "/placeholder.svg",
  },
  {
    name: "Local Crafts Inc",
    description: "Handicrafts • Artisan Products",
    score: 92,
    logo: "/placeholder.svg",
  },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Business Information</h2>
            <div className="flex flex-col gap-5 items-start justify-between mb-4">
              <div className="flex flex-col items-start space-x-4 border border-primary-light py-1 px-2 rounded-lg bg-primary-light/10">
                <img
                  src="/shgimg.png"
                  alt="Business Logo"
                  className="w-24 h-24 rounded-full border border-primary"
                />
                <div className="">
                  <h2 className="text-2xl font-bold text-gray-800">Mahila Self Help Group</h2>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">5.0 (120 reviews)</span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    A women-led cooperative focused on empowering local communities through sustainable business practices.
                  </p>
                  <div className="flex gap-8 mt-3">
                    <div>
                      <span className="text-gray-600">Location</span>
                      <p className="font-semibold">Mumbai, Maharashtra</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Members</span>
                      <p className="font-semibold">25 Active</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-primary hover:text-primary/80"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-semibold text-gray-800">Revenue Growth</h3>
              <Link
                to="/sales"
                className="flex items-center space-x-2 text-primary hover:text-primary/80"
              >
                <span>View Sales Details</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Best Company Matches
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <div
                key={company.name}
                className="relative p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded text-sm">
                  Score: {company.score}%
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={'./public/companyimg.png'}
                    alt={company.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{company.name}</h4>
                    <p className="text-gray-600 text-sm">{company.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;