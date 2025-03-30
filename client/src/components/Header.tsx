import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"; 

export default function Header() {
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user initials for the avatar
  const getInitials = () => {
    if (!user.name) return "FT";
    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="py-4 px-6 flex justify-between items-center sticky top-0 z-10 bg-white/70 backdrop-blur-md border border-white/25 rounded-b-lg">
      <div className="flex items-center gap-3">
        <motion.div 
          className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bx bx-pulse text-xl"></i>
        </motion.div>
        <h1 className="text-2xl font-heading font-semibold text-neutral-800">FitTrack</h1>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <motion.a 
          href="#" 
          className="text-neutral-600 hover:text-primary transition-colors"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Dashboard
        </motion.a>
        <motion.a 
          href="#" 
          className="text-neutral-600 hover:text-primary transition-colors"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Workouts
        </motion.a>
        <motion.a 
          href="#" 
          className="text-neutral-600 hover:text-primary transition-colors"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Nutrition
        </motion.a>
        <motion.a 
          href="#" 
          className="text-neutral-600 hover:text-primary transition-colors"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Progress
        </motion.a>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.button 
          className="p-2 rounded-full hover:bg-neutral-200 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="bx bx-bell text-xl text-neutral-600"></i>
        </motion.button>
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getInitials()}
          </motion.div>
          <span className="hidden md:inline text-sm font-medium">{user.name}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          className="text-neutral-600 hover:text-red-500"
        >
          <LogOut className="h-5 w-5" />
        </Button>
        
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'} text-xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="absolute top-full left-0 right-0 bg-white shadow-md p-4 md:hidden flex flex-col space-y-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <a href="#" className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-700">Dashboard</a>
          <a href="#" className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-700">Workouts</a>
          <a href="#" className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-700">Nutrition</a>
          <a href="#" className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-700">Progress</a>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-red-50 rounded-lg text-red-500 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </motion.div>
      )}
    </header>
  );
}
