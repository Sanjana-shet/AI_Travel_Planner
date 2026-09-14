import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TripSummary from "../components/TripSummary";
import HotelList from "../components/HotelList";
import DayPlan from "../components/DayPlan";
import { CloudSun, UtensilsCrossed, Luggage, ArrowLeft, Thermometer, Compass, Calendar, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = () => {
      setLoading(true);
      try {
        const localTrips = JSON.parse(localStorage.getItem("karnataka_trips") || "[]");
        const matched = localTrips.find((t) => t.id === tripId);

        if (matched) {
          console.log("🔥 Local Trip Loaded:", matched);
          setTrip(matched);
        } else {
          console.warn("⚠️ Trip not found in localStorage");
        }
      } catch (err) {
        console.error("Error fetching local trip: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-3">
        <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
        <p className="text-slate-500 font-semibold">Compiling your local guide...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 space-y-6">
        <div className="text-6xl">🗺️</div>
        <h2 className="text-2xl font-extrabold text-slate-800">Itinerary Not Found</h2>
        <p className="text-slate-500 text-sm">
          We couldn't find this trip in your local storage. It might have been deleted or planned on another device.
        </p>
        <Link to="/create-trip">
          <Button className="bg-slate-900 text-white rounded-xl">Create a New Trip</Button>
        </Link>
      </div>
    );
  }

  const plan = trip.generatedPlan || {};

  /* ---------------------------------------------------------
     Generate Custom Travel Widgets based on Location & Type
  ---------------------------------------------------------- */
  const getLocationKey = () => {
    const loc = (trip.location || "").toLowerCase();
    if (loc.includes("bengaluru") || loc.includes("bangalore")) return "bengaluru";
    if (loc.includes("mysore") || loc.includes("mysuru")) return "mysore";
    if (loc.includes("hampi")) return "hampi";
    if (loc.includes("coorg") || loc.includes("kodagu")) return "coorg";
    if (loc.includes("chikmagalur")) return "chikmagalur";
    if (loc.includes("gokarna")) return "gokarna";
    if (loc.includes("badami")) return "badami";
    if (loc.includes("murudeshwar")) return "murudeshwar";
    if (loc.includes("jog")) return "jog";
    if (loc.includes("bandipur")) return "bandipur";
    return "other";
  };

  const locationKey = getLocationKey();

  // Mock Weather Data
  const weatherConfigs = {
    bengaluru: { temp: "26°C", label: "Sunny & Pleasant", desc: "Classic Bangalore breeze. Perfect for city sightseeing." },
    mysore: { temp: "28°C", label: "Clear Skies", desc: "Mild heat. Great for exploring palaces and gardens." },
    hampi: { temp: "34°C", label: "Hot & Sunny", desc: "Dry climate. Wear a hat, sunglasses, and carry water." },
    coorg: { temp: "20°C", label: "Misty & Humid", desc: "Chilly highlands air with light fog. Carry an umbrella." },
    chikmagalur: { temp: "21°C", label: "Misty Highlands", desc: "Cool mountain heights. Light windbreaker recommended." },
    gokarna: { temp: "31°C", label: "Warm Coastal", desc: "High humidity with a refreshing ocean breeze. Ideal for swimming." },
    badami: { temp: "33°C", label: "Warm & Dry", desc: "Sandstone cliff climate. Keep hydrated during rock walks." },
    murudeshwar: { temp: "31°C", label: "Warm Coastal", desc: "High coastal breeze. Perfect for shoreline walks." },
    jog: { temp: "23°C", label: "Humid & Misty", desc: "Frequent monsoonal sprays. Carry slip-resistant footwear." },
    bandipur: { temp: "27°C", label: "Warm Jungle", desc: "Pleasant deciduous forest breeze. Clear visibility for safaris." },
    other: { temp: "28°C", label: "Sunny & Warm", desc: "Favorable weather for walking tours and exploration." },
  };

  const weather = weatherConfigs[locationKey] || weatherConfigs.other;

  // Local Food Specialties
  const localFoodConfigs = {
    bengaluru: ["Bisi Bele Bath (hot lentil rice)", "Vidyarthi Bhavan Masala Dosa", "Traditional Filter Kaapi", "Rava Idli at MTR"],
    mysore: ["Authentic Mysore Pak (royal ghee sweet)", "Mysore Masala Dosa (with red spicy chutney)", "Mouth-watering Mysore Mallige Idli"],
    hampi: ["Shenga Holige (sweet peanut flatbread)", "Jolada Roti Meal (sorghum flatbread)", "Tungabhadra River Fish Fry"],
    coorg: ["Kadavuttu (steamed rice balls)", "Pandi Curry (spiced wild-herb curry)", "Bamboo Shoot Pickle & Curry"],
    chikmagalur: ["Fresh Chikmagalur Filter Kaapi", "Akki Roti (crispy rice flatbread)", "Pathrode (colocasia leaf rolls)"],
    gokarna: ["Coastal Sea Food Thali", "Banana Buns with coconut chutney", "Namaste Cafe woodfired pizzas"],
    badami: ["Jolada Roti (jowar flatbread)", "Yennegai (stuffed eggplant gravy)", "Spicy Shenga Chutney powder"],
    murudeshwar: ["Kori Rotti (spicy chicken & thin rice sheets)", "Fresh Silverfish Fry", "Soft Neer Dosa"],
    jog: ["Todadevu (super-thin sweet crepe)", "Steamed Jackfruit Dumplings", "Sharavathi organic herbal tea"],
    bandipur: ["Ragi Mudde (finger millet steam balls)", "Pure Forest Honey Teas", "Traditional South Karnataka Veg Meals"],
    other: ["Classic Karnataka Masala Dosa", "Soft Idli-Vada combos", "Fragrant Filter Coffee"],
  };

  const foodItems = localFoodConfigs[locationKey] || localFoodConfigs.other;

  // Smart Packing Checklist
  const getPackingList = () => {
    const list = ["Comfortable walking shoes", "Sunscreen & Sunglasses", "Reusable water bottle", "Mobile power bank"];
    
    // Add terrain items
    if (["coorg", "chikmagalur", "jog"].includes(locationKey)) {
      list.push("Light jacket or sweater", "Umbrella / Raincoat", "Insect repellent");
    } else if (["gokarna", "murudeshwar"].includes(locationKey)) {
      list.push("Beachwear & Flip-flops", "Quick-dry micro towels", "Swimming goggles");
    } else if (["hampi", "badami"].includes(locationKey)) {
      list.push("Wide-brim hat / cap", "Cotton light-color clothing", "ORSL/Electrolyte packs");
    } else if (locationKey === "bandipur") {
      list.push("Camouflage or dark forest clothes", "Binoculars for animal spotting", "Full sleeves (mosquitos)");
    }

    // Add traveler items
    if (trip.traveler === "Just Me") {
      list.push("Personal trip journal", "Compact tripod for solo photos");
    } else if (trip.traveler === "A Couple") {
      list.push("Polaroid camera", "Semi-formal dining wear");
    } else if (trip.traveler === "Family") {
      list.push("Basic first-aid kit", "Kid travel snacks", "Wet wipes");
    } else if (trip.traveler === "Friends") {
      list.push("Mini bluetooth speaker", "Decks of cards / board games");
    }

    return list;
  };

  const packingList = getPackingList();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link to="/my-trips" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition text-sm font-semibold">
          <ArrowLeft size={16} /> Back to My Trips
        </Link>

        {/* Dynamic Title Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {trip.location}
            </h1>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2">
              <Compass size={16} className="animate-spin text-amber-400" /> Curated Karunadu Itinerary
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-semibold">
                <Calendar size={13} className="text-amber-400" /> {trip.days} Days Plan
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-semibold">
                <Thermometer size={13} className="text-emerald-400" /> {trip.budget} Budget
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-semibold">
                <UserCheck size={13} className="text-cyan-400" /> {trip.traveler} Holiday
              </span>
            </div>
          </div>
        </div>

        {/* Main Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Hotels & Day Itineraries */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel recommendations */}
            {plan?.hotels?.length > 0 ? (
              <HotelList hotels={plan.hotels} />
            ) : (
              <div className="bg-white border rounded-2xl p-6 text-center text-slate-500">
                No hotel recommendations available.
              </div>
            )}

            {/* Daily Itineraries */}
            {plan.itinerary && Object.keys(plan.itinerary).length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight pl-1">
                  Your Day-by-Day Journey
                </h2>
                <div className="space-y-6">
                  {Object.values(plan.itinerary).map((day, index) => (
                    <DayPlan key={index} day={day} dayNumber={index + 1} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border rounded-2xl p-6 text-center text-slate-500">
                No daily travel routes found.
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Travel Companion Sidebar */}
          <div className="space-y-6">
            
            {/* Widget 1: Weather Watcher */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                <CloudSun className="text-cyan-500" size={20} />
                Weather Watcher
              </h3>
              
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                  {weather.temp}
                </span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{weather.label}</div>
                  <p className="text-[10px] text-slate-500 leading-normal">{weather.desc}</p>
                </div>
              </div>
            </div>

            {/* Widget 2: Must-Try Local Delicacies */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                <UtensilsCrossed className="text-amber-500" size={20} />
                Must-Try Local Food
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Karnataka is famous for rich culinary palettes. Make sure to sample these traditional delicacies while traveling:
              </p>
              
              <ul className="space-y-2">
                {foodItems.map((food, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <span className="text-sm">🍛</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 3: Smart Packing Checklist */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                <Luggage className="text-emerald-500" size={20} />
                Smart Packing Checklist
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tailored based on your active traveler profile ({trip.traveler}) and geographical terrain:
              </p>

              <ul className="space-y-2">
                {packingList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-slate-700 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                    <input
                      type="checkbox"
                      id={`pack-${idx}`}
                      className="w-4 h-4 text-emerald-600 rounded-md focus:ring-emerald-500 border-slate-300 focus:outline-none cursor-pointer"
                    />
                    <label htmlFor={`pack-${idx}`} className="cursor-pointer">
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ViewTrip;
