import { Home, MessageSquare, ShoppingBag, LineChart, UserCircle, Package, Menu, List, LogOut} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "Profile", icon: UserCircle, path: "/profile" },
    { title: "Consultancy", icon: LineChart, path: "/consultancy" },
    { title: "Sales", icon: ShoppingBag, path: "/sales" },
    { title: "Products", icon: Package, path: "/products" },
    { title: "Messages", icon: MessageSquare, path: "/messages" },
    { title: "Company Listing", icon: List, path: "/company" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-purple-500 p-2 rounded-md text-white"
      >
        <Menu />
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:static w-64 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <img
              src="./public/shgimg.png"
              alt="SHG Logo"
              className="w-24 h-24 rounded-full border-4 border-primary p-1"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">Mahila SHG</h1>
              <p className="text-gray-600 text-sm">Empowering Communities</p>
            </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-primary hover:text-white ${
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
                <Link to="/" >
                    <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button></Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;