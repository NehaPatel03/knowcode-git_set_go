import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SHG {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
}

const initialSHGs: SHG[] = [
  {
    id: "1",
    name: "Mahila Self Help Group",
    category: "Handicrafts",
    description: "Women-led cooperative focused on empowering local communities through sustainable business practices.",
    logo: "/public/shgimg.png",
  },
  {
    id: "2",
    name: "Rural Artisans Collective",
    category: "Textiles",
    description: "A collective of skilled artisans creating traditional textiles and handicrafts.",
    logo: "/public/shgimg.png",
  },
];

export const SearchSHGs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [shgs, setSHGs] = useState<SHG[]>(initialSHGs);

  const filteredSHGs = shgs.filter(shg => 
    shg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePartnershipRequest = (shgName: string) => {
    toast({
      title: "Partnership Request Sent",
      description: `Your partnership request to ${shgName} has been sent successfully.`,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Search SHGs</h2>
      
      <Input
        placeholder="Search by SHG name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      <div className="space-y-6">
        {filteredSHGs.map((shg) => (
          <div key={shg.id} className="border rounded-lg p-4">
            <div className="flex gap-4 items-start">
              <img src={shg.logo} alt={shg.name} className="w-12 h-12 rounded" />
              <div className="flex-1">
                <h3 className="font-medium">{shg.name}</h3>
                <p className="text-sm text-purple-600 mb-2">{shg.category}</p>
                <p className="text-sm text-gray-600 mb-4">{shg.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/company-messages")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handlePartnershipRequest(shg.name)}
                  >
                    Send Partnership Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};