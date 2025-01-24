import { Button } from "@/components/ui/button";
import { Building2, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="min-h-screen flex  justify-center bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10 gap-40">
      <div className="container mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-light mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-center mb-12 text-primary">Choose Your Role</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Link to="/shg-signup">
              <div className="group p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <Users className="w-16 h-16 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h2 className="text-2xl font-semibold mb-2">Self Help Group</h2>
                  <p className="text-gray-600 text-[15px]">Join as a Self Help Group member</p>
                </div>
              </div>
            </Link>
            <Link to="/company-signup">
              <div className="group p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <Building2 className="w-16 h-16 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h2 className="text-2xl font-semibold mb-2">Company</h2>
                  <p className="text-gray-600">Register as a company partner</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;