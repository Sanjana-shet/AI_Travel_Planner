import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Dynamically fetch local user whenever route changes
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        fixed top-0 left-0 w-full z-50 
        backdrop-blur-xl bg-white/80 
        border-b border-slate-200/65 
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} className="h-8 w-8 object-contain animate-pulse" alt="logo" />
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Karunadu Travels
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-slate-600 font-bold text-sm">
          <Link to="/" className="hover:text-amber-600 transition">Home</Link>

          {user && (
            <Link to="/my-trips" className="hover:text-amber-600 transition">
              My Saved Trips
            </Link>
          )}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:block">
          {!user ? (
            <Link to="/create-trip">
              <Button className="rounded-full px-6 py-2.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md">
                Plan a Trip
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/my-trips" title="My Saved Trips" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/50 hover:bg-slate-200/50 transition">
                <span className="text-base">{user.pic || "🎒"}</span>
                <span className="text-xs font-extrabold text-slate-700 max-w-[120px] truncate">{user.name}</span>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="rounded-full px-4 py-1.5 text-xs font-bold border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-500">
                Log Out
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-800 focus:outline-none" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-slate-200 p-5 flex flex-col gap-4 text-slate-600 font-bold text-sm shadow-inner"
        >
          <Link to="/" className="hover:text-amber-600 py-2 border-b border-slate-50" onClick={() => setOpen(false)}>Home</Link>

          {user && (
            <Link to="/my-trips" className="hover:text-amber-600 py-2 border-b border-slate-50" onClick={() => setOpen(false)}>
              My Saved Trips
            </Link>
          )}

          {!user ? (
            <Link to="/create-trip" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full rounded-full bg-slate-900 text-white font-bold py-3 text-sm">
                Plan a Trip
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/my-trips"
                className="flex items-center gap-2.5 py-3 px-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700"
                onClick={() => setOpen(false)}
              >
                <span className="text-xl">{user.pic || "🎒"}</span>
                <span className="text-xs font-black truncate">Dashboard: {user.name}</span>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="w-full rounded-2xl py-3 border border-slate-200 text-slate-500 font-bold hover:bg-red-50 hover:text-red-600">
                Log Out
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
