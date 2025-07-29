import { Link } from "react-router-dom";
import { LayoutTemplate } from "lucide-react";
import { ProfileInfoCard } from "./Cards";

const Navbar = () => {
  return (
    <div className="h-16 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group transition-all duration-200"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50 group-hover:shadow-blue-300/70 transition-all duration-300">
            <LayoutTemplate className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            ResumeXpert
          </span>
        </Link>

        {/* Navigation Links - Add if needed */}
        {/* <div className="hidden md:flex items-center gap-6">
          <Link to="/templates" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Templates
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Pricing
          </Link>
          <Link to="/examples" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Examples
          </Link>
        </div> */}

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <ProfileInfoCard />
        </div>
      </div>
    </div>
  );
};

export default Navbar;