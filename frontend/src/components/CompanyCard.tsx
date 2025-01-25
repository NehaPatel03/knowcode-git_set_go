import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner"; // Assuming you are using the same toast library

interface CompanyCardProps {
  company: {
    id: number;
    name: string;
    image: string;
    category: string;
    requirement: string;
    quantity: number;
  };
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const handleSendRequest = () => {
    toast.success(`Request sent to ${company.name} successfully!`);
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <img
        src={company.image}
        alt={company.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="ml-4 flex-grow">
        <h3 className="font-semibold text-lg">{company.name}</h3>
        <p className="text-sm text-gray-600">
          {company.category} • {company.requirement} • Qty: {company.quantity}
        </p>
      </div>
      <div className="flex gap-2">
        <Link to="/messages">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            Chat
          </Button>
        </Link>
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleSendRequest}
        >
          <Send className="w-4 h-4" />
          Send Request
        </Button>
      </div>
    </div>
  );
};

export default CompanyCard;
