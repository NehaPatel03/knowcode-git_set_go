import { Home, MessageSquare, Package, Users, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export const CompanySidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/company-dashboard" },
    { icon: Package, label: "Orders", path: "/orders" },
    { icon: MessageSquare, label: "Messages", path: "/company-messages" },
    { icon: Users, label: "Partnership", path: "/partnership" },
  ];

  return (
    <div className="min-h-screen w-64 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <img src="public/companyimg.png" alt="Logo" className="w-8 h-8" />
          <div>
            <h1 className="font-semibold">Tech Solutions Ltd.</h1>
            <p className="text-sm text-muted-foreground">Business Portal</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};