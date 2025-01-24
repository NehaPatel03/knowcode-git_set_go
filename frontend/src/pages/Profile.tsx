import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppSidebar from "@/components/AppSidebar";
import { MessageSquare, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AppSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/public/shgimg.png"
                alt="SHG Logo"
                className="w-32 h-32 rounded-full border-4 border-primary"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Mahila SHG</h1>
                <p className="text-gray-600 mb-4">Led by: Sarah Johnson</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.8/5.0</span>
                  <span className="text-gray-500">(120 ratings)</span>
                </div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Link to="/sales">
                    <Button className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      View Sales
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Check Messages
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Empower local women through entrepreneurship</li>
                  <li>• Achieve sustainable growth in handicraft exports</li>
                  <li>• Expand market reach to international buyers</li>
                  <li>• Provide skill development training</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Orders Fulfilled</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold">50</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Years Active</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Mahila SHG is a women-led self-help group dedicated to empowering local
                communities through sustainable entrepreneurship. Founded in 2018, we
                specialize in creating high-quality handicrafts while providing
                employment opportunities to skilled artisans in our region.
              </p>
              <div className="mt-4 space-y-2">
                <p className="font-semibold">Key Achievements:</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Winner of Best SHG Award 2022</li>
                  <li>Successfully exported to 15+ countries</li>
                  <li>Trained over 200 women in various crafts</li>
                  <li>Established partnerships with 20+ retail chains</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;