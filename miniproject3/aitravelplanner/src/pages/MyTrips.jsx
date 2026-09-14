import React, { useEffect, useState } from "react";
import UserTripCardItem from "../view-trip/components/UserTripCardItem.jsx";
import { toast } from "sonner";
import { Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const localTrips = JSON.parse(localStorage.getItem("karnataka_trips") || "[]");

      if (!user) {
        // If not logged in, show all trips in local storage
        setUserTrips(localTrips);
      } else {
        // Filter by current active user profile
        const filtered = localTrips.filter((t) => t.userEmail === user.email);
        setUserTrips(filtered);
      }
    } catch (err) {
      console.error("Error reading saved trips: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = (tripId) => {
    try {
      const localTrips = JSON.parse(localStorage.getItem("karnataka_trips") || "[]");
      const updated = localTrips.filter((t) => t.id !== tripId);
      localStorage.setItem("karnataka_trips", JSON.stringify(updated));

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setUserTrips(updated);
      } else {
        setUserTrips(updated.filter((t) => t.userEmail === user.email));
      }

      toast.success("Itinerary removed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete itinerary");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 text-xs">Loading your adventures...</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 md:p-16 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center pb-6 border-b border-slate-100">
        <div>
          <h2 className="font-black text-3xl text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="text-amber-500" size={26} /> My Saved Itineraries
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Manage your personal travel plans offline
          </p>
        </div>
        <Link to="/create-trip">
          <Button className="bg-slate-900 text-white rounded-full text-xs font-semibold px-4 py-2 hover:scale-[1.03] transition-all">
            + Plan New Trip
          </Button>
        </Link>
      </div>

      {userTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} onDelete={handleDeleteTrip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 space-y-4 max-w-sm mx-auto">
          <div className="text-6xl animate-pulse">🎒</div>
          <h3 className="font-extrabold text-slate-800 text-lg">No Itineraries Found</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            You haven't compiled any trip itineraries yet. Click below to begin your adventure in Karnataka!
          </p>
          <div className="pt-2">
            <Link to="/create-trip">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md">
                Plan First Trip
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
