import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const FooterSec = () => {
  return (
    <footer className="bg-primary/75 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Drishti</h3>
            <p className="text-gray-100">
              Connecting SHGs and companies for a sustainable future through innovative B2B solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Inventory Management</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Microfinance</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:scale-110 transition-transform">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-100">
            © {new Date().getFullYear()} Drishti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSec;