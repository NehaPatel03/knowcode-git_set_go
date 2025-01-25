import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const OrderStatistics = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Order Statistics</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-purple-600 font-medium">Pending Orders</h3>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-muted-foreground">Awaiting fulfillment</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-purple-600 font-medium">Completed Orders</h3>
          <p className="text-2xl font-bold">48</p>
          <p className="text-sm text-muted-foreground">Successfully delivered</p>
        </div>
      </div>

      <Button 
        className="w-full" 
        onClick={() => navigate("/partnership")}
      >
        Place New Order
      </Button>
    </div>
  );
};