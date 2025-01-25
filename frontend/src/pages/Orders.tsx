import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CompanySidebar } from "../components/CompanySidebar";

interface Order {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  quantity: number;
  date: string;
}

const Orders = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [pendingOrders, setPendingOrders] = useState<Order[]>([
    {
      id: "1",
      title: "Handicraft Order #1",
      organization: "Craftworks SHG",
      category: "Handicrafts",
      description: "100 handmade baskets - Traditional design with natural materials",
      quantity: 100,
      date: "2024-02-20"
    },
    {
      id: "2",
      title: "Textile Order #1",
      organization: "Textile Artisans",
      category: "Textiles",
      description: "50 hand-woven scarves - Cotton blend with traditional patterns",
      quantity: 50,
      date: "2024-02-19"
    }
  ]);

  const [completedOrders, setCompletedOrders] = useState<Order[]>([
    {
      id: "3",
      title: "Pottery Order #1",
      organization: "Clay Creators SHG",
      category: "Pottery",
      description: "200 ceramic pots - Decorative with glazed finish",
      quantity: 200,
      date: "2024-02-15"
    },
    {
      id: "4",
      title: "Jewelry Order #1",
      organization: "Artisan Jewelers",
      category: "Jewelry",
      description: "75 handcrafted necklaces - Traditional tribal design",
      quantity: 75,
      date: "2024-02-10"
    }
  ]);

  const handleComplete = (order: Order) => {
    setPendingOrders(prev => prev.filter(o => o.id !== order.id));
    setCompletedOrders(prev => [...prev, order]);
    toast({
      title: "Order Completed",
      description: `${order.title} has been marked as completed.`
    });
  };

  const handleReorder = (order: Order) => {
    const newOrder = { ...order, id: Math.random().toString(), date: new Date().toISOString().split('T')[0] };
    setPendingOrders(prev => [...prev, newOrder]);
    toast({
      title: "Order Resubmitted",
      description: `${order.title} has been resubmitted as a new order.`
    });
  };

  const handleMessage = () => {
    navigate("/company-messages");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar/>
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Orders */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-700">Pending Orders</h2>
            {pendingOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{order.title}</h3>
                    <p className="text-purple-600">{order.organization}</p>
                    <p className="text-gray-600">{order.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMessage()}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleComplete(order)}
                    >
                      Complete
                    </Button>
                  </div>
                </div>
                <p className="text-gray-700">{order.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Quantity: {order.quantity}</span>
                  <span>Date: {order.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Completed Orders */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-700">Completed Orders</h2>
            {completedOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{order.title}</h3>
                    <p className="text-purple-600">{order.organization}</p>
                    <p className="text-gray-600">{order.category}</p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleReorder(order)}
                  >
                    Reorder
                  </Button>
                </div>
                <p className="text-gray-700">{order.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Quantity: {order.quantity}</span>
                  <span>Date: {order.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;