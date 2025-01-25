import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ShoppingCart, XOctagon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CompanySidebar } from "../components/CompanySidebar";

interface SHG {
    id: string;
    name: string;
    description: string;
    location: string;
    rating: number;
    activeOrders: number;
    categories: string[];
    image: string;
}

const Partnership = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [partnerships, setPartnerships] = useState<SHG[]>([
        {
            id: "1",
            name: "SHG Group 1",
            description: "Specializing in handmade textiles and crafts",
            location: "Rural District 1",
            rating: 4.5,
            activeOrders: 3,
            categories: ["Textiles", "Handicrafts", "Pottery"],
            image: "/public/shgimg.png"
        },
        {
            id: "2",
            name: "SHG Group 2",
            description: "Expert artisans in traditional crafts",
            location: "Rural District 2",
            rating: 4.8,
            activeOrders: 2,
            categories: ["Jewelry", "Woodcraft", "Paintings"],
            image: "/public/shgimg.png"
        },
        {
            id: "3",
            name: "SHG Group 3",
            description: "Sustainable farming and organic products",
            location: "Rural District 3",
            rating: 4.2,
            activeOrders: 1,
            categories: ["Organic Foods", "Natural Dyes", "Herbal Products"],
            image: "/public/shgimg.png"
        }
    ]);

    const filteredPartnerships = partnerships.filter(shg =>
        shg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChat = () => {
        navigate("/company-messages");
    };

    const handleOrder = (shgName: string) => {
        toast({
            title: "Order Placed",
            description: `Your order with ${shgName} has been placed successfully.`,
        });
        navigate("/company-orders");
    };

    const handleBreakPartnership = (shgId: string, shgName: string) => {
        setPartnerships(prev => prev.filter(p => p.id !== shgId));
        toast({
            title: "Partnership Ended",
            description: `Your partnership with ${shgName} has been terminated.`,
            variant: "destructive"
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <CompanySidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Your Partnerships</h1>

                <div className="flex justify-between">
                    <Input
                        placeholder="Search partnerships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md mb-8"
                    />
                    <Button>Top Recommended SHGs</Button>
                </div>

                <div className="grid gap-6">
                    {filteredPartnerships.map((shg) => (
                        <div key={shg.id} className="bg-white rounded-lg p-6 shadow-sm border">
                            <div className="flex gap-6">
                                <img
                                    src={shg.image}
                                    alt={shg.name}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-semibold">{shg.name}</h3>
                                            <p className="text-gray-600 mb-1">{shg.description}</p>
                                            <p className="text-gray-500 text-sm mb-2">{shg.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">Rating: {shg.rating}</div>
                                            <div className="text-purple-600">{shg.activeOrders} Active Orders</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {shg.categories.map((category) => (
                                            <Badge key={category} variant="secondary">
                                                {category}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleChat}
                                        >
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Chat
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleOrder(shg.name)}
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Order
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleBreakPartnership(shg.id, shg.name)}
                                        >
                                            <XOctagon className="w-4 h-4 mr-2" />
                                            Break Partnership
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partnership;