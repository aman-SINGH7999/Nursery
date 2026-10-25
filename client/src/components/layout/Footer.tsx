import { Leaf, Instagram, Camera, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2">
              <img
                src="/main-logo.png"
                alt="GreenThumb Logo"
                className="h-16 w-28 object-contain"
              />
            </Link>

            <p className="text-gray-600 text-sm max-w-xs">
              Bringing the serenity of nature into your home with
              sustainably grown plants and eco-friendly accessories.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 text-gray-500">
              <Instagram className="hover:text-green-600 cursor-pointer" />
              <Camera className="hover:text-green-600 cursor-pointer" />
              <Mail className="hover:text-green-600 cursor-pointer" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="#" className="hover:text-green-600">All Plants</Link></li>
              <li><Link to="#" className="hover:text-green-600">New Arrivals</Link></li>
              <li><Link to="#" className="hover:text-green-600">Pots & Planters</Link></li>
              <li><Link to="#" className="hover:text-green-600">Gardening Tools</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="#" className="hover:text-green-600">About Us</Link></li>
              <li><Link to="#" className="hover:text-green-600">Sustainability</Link></li>
              <li><Link to="#" className="hover:text-green-600">Careers</Link></li>
              <li><Link to="#" className="hover:text-green-600">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="#" className="hover:text-green-600">FAQs</Link></li>
              <li><Link to="#" className="hover:text-green-600">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-green-600">Care Guide</Link></li>
              <li><Link to="#" className="hover:text-green-600">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <div>© 2023 GreenHaven Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-green-600">Privacy Policy</Link>
            <Link to="#" className="hover:text-green-600">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
