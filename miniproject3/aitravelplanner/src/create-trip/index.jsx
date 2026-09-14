import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getStaticOrFallbackTrip } from "@/constants/staticTrips";
import { useNavigate } from "react-router-dom";
import { Compass, Sparkles, MapPin, CheckCircle } from "lucide-react";

// Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const KARNATAKA_DESTINATIONS = [
  { id: "bengaluru", name: "Bengaluru", emoji: "🏢", label: "Bengaluru (Bangalore)", desc: "Tech parks, grand palaces, sprawling botanical gardens, and fantastic local cafe crawls." },
  { id: "mysore", name: "Mysuru", emoji: "🕌", label: "Mysuru (Mysore)", desc: "Breath-taking heritage palaces, sacred Chamundi Hills, pure sandalwood, and zoological walks." },
  { id: "hampi", name: "Hampi Ruins", emoji: "🛕", label: "Hampi Ruins", desc: "Magical boulder landscapes, monumental stone chariots, and active 7th-century temples." },
  { id: "coorg", name: "Coorg (Kodagu)", emoji: "⛰️", label: "Coorg (Kodagu)", desc: "Mist-covered coffee estates, rushing waterfalls, elephant camps, and serene valleys." },
  { id: "chikmagalur", name: "Chikmagalur", emoji: "☕", label: "Chikmagalur", desc: "Emerald hills, the highest trekking peaks in Karnataka, and lush forest stays." },
  { id: "gokarna", name: "Gokarna", emoji: "🏖️", label: "Gokarna", desc: "Pristine crescent shores of Om Beach, bohemian beach shacks, and sacred cliffside walks." },
  { id: "badami", name: "Badami Caves", emoji: "🧗", label: "Badami Caves", desc: "Spectacular 6th-century rock-cut sandstone caves, pristine lakes, and ancient forts." },
  { id: "murudeshwar", name: "Murudeshwar", emoji: "🔱", label: "Murudeshwar", desc: "The towering 123ft seaside Shiva statue, sandy beach shores, and scuba diving trips." },
  { id: "jog falls", name: "Jog Falls", emoji: "🌊", label: "Jog Falls", desc: "India's majestic four-cascade roaring waterfalls surrounded by dense tropical forests." },
  { id: "bandipur", name: "Bandipur", emoji: "🐅", label: "Bandipur National Park", desc: "Dense wilderness tiger sanctuaries, open-top jungle safaris, and wild elephant corridors." },
];

export default function CreateTrip() {
  const [selectedDest, setSelectedDest] = useState(null);
  const [customSearch, setCustomSearch] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [budget, setBudget] = useState("");
  const [traveler, setTraveler] = useState("");
  const [loadingGeneration, setLoadingGeneration] = useState(false);

  // Local Guest Login State
  const [openDialog, setOpenDialog] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🎒 Backpacker");

  const navigate = useNavigate();

  const avatars = [
    "🎒 Backpacker",
    "📸 Photographer",
    "🚶 Solo Explorer",
    "🏄 Adventurer",
    "☕ Coffee Connoisseur",
  ];

  const budgetOptions = [
    { label: "Cheap", emoji: "💵", desc: "Budget homestays & local street foods" },
    { label: "Moderate", emoji: "💰", desc: "Comfortable resorts & classic tours" },
    { label: "Luxury", emoji: "💸", desc: "Ultra-luxurious palaces & private safaris" },
  ];

  const travelerOptions = [
    { label: "Just Me", emoji: "✈️", desc: "Solo explorer seeking peace & trails" },
    { label: "A Couple", emoji: "🥂", desc: "Romantic sunsets & candle-lit dining" },
    { label: "Family", emoji: "👪", desc: "Child-friendly parks & spacious transit" },
    { label: "Friends", emoji: "🎉", desc: "High-energy trekking, sports & cafes" },
  ];

  /* ---------------------------------------------------------
     Local Guest Login Function
  ---------------------------------------------------------- */
  const handleLocalLogin = (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const userData = {
      name: guestName,
      pic: selectedAvatar,
      email: guestName.toLowerCase().replace(/\s+/g, "") + "@karunadu.local",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    toast.success(`Welcome to Karunadu, ${guestName}!`);
    setOpenDialog(false);
    
    // Automatically trigger trip generation after logging in
    setTimeout(() => {
      triggerTripGeneration(userData);
    }, 100);
  };

  /* ---------------------------------------------------------
     Save & Navigate Trip locally
  ---------------------------------------------------------- */
  const triggerTripGeneration = (userData) => {
    const activeDest = selectedDest
      ? selectedDest.label
      : customSearch;

    if (!activeDest) {
      toast.error("Please select a destination");
      return;
    }
    if (!noOfDays || parseInt(noOfDays) <= 0) {
      toast.error("Please enter a valid number of days");
      return;
    }
    if (parseInt(noOfDays) > 10) {
      toast.error("Plan is limited to maximum 10 days locally.");
      return;
    }
    if (!budget) {
      toast.error("Please select a budget level");
      return;
    }
    if (!traveler) {
      toast.error("Please select traveler options");
      return;
    }

    setLoadingGeneration(true);

    try {
      // Get the curated details from the local DB!
      const planData = getStaticOrFallbackTrip(activeDest, noOfDays, budget, traveler);

      const tripId = "karn-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      const newTrip = {
        id: tripId,
        userEmail: userData.email,
        location: activeDest,
        days: noOfDays,
        budget: budget,
        traveler: traveler,
        generatedPlan: planData,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage array
      const existingTrips = JSON.parse(localStorage.getItem("karnataka_trips") || "[]");
      existingTrips.push(newTrip);
      localStorage.setItem("karnataka_trips", JSON.stringify(existingTrips));

      toast.success("Itinerary prepared instantly!");
      navigate("/view-trip/" + tripId);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong compiling your itinerary.");
    } finally {
      setLoadingGeneration(false);
    }
  };

  const OnGenerateTrip = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    triggerTripGeneration(JSON.parse(user));
  };

  return (
    <div className="pt-28 pb-16 px-5 sm:px-10 md:px-24 lg:px-44 xl:px-64 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plan Your Karnataka Adventure
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Choose your dream Karnataka destination, select your style, and compile a premium personalized local guide in seconds.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-10">
          
          {/* STEP 1: Karnataka Visual Grid Selector */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-slate-800 flex items-center gap-2">
              <MapPin className="text-amber-500" size={20} />
              1. Select a Famous Destination in Karnataka
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {KARNATAKA_DESTINATIONS.map((dest) => {
                const isSelected = selectedDest?.id === dest.id;
                return (
                  <button
                    type="button"
                    key={dest.id}
                    onClick={() => {
                      setSelectedDest(dest);
                      setCustomSearch(""); // Reset custom search
                    }}
                    className={`
                      text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 group
                      ${
                        isSelected
                          ? "border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/25"
                          : "border-slate-200 hover:border-amber-300 hover:bg-slate-50/50"
                      }
                    `}
                  >
                    <span className="text-3xl p-2 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition">
                      {dest.emoji}
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {dest.name}
                        {isSelected && <CheckCircle size={16} className="text-amber-600 fill-amber-100" />}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {dest.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Search Alternative */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                Or plan for somewhere else
              </p>
              <input
                type="text"
                placeholder="Ex: Udupi, Dandeli, Mangaluru, Kodachadri..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={customSearch}
                onChange={(e) => {
                  setCustomSearch(e.target.value);
                  setSelectedDest(null); // Deselect grid item
                }}
              />
            </div>
          </div>

          {/* STEP 2: Days */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-slate-800 flex items-center gap-2">
              <Compass className="text-amber-500" size={20} />
              2. How many days is your trip?
            </label>
            <input
              type="number"
              min={1}
              max={10}
              placeholder="Ex: 3"
              className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={noOfDays}
              onChange={(e) => setNoOfDays(e.target.value)}
            />
          </div>

          {/* STEP 3: Budget */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-slate-800">
              3. What is your budget level?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {budgetOptions.map((b) => (
                <button
                  type="button"
                  key={b.label}
                  onClick={() => setBudget(b.label)}
                  className={`
                    p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300
                    ${
                      budget === b.label
                        ? "border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/25 shadow-lg"
                        : "border-slate-200 hover:border-amber-300 hover:bg-slate-50/50"
                    }
                  `}
                >
                  <span className="text-3xl">{b.emoji}</span>
                  <div className="mt-4">
                    <div className="font-bold text-slate-900">{b.label}</div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: Travelers */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-slate-800">
              4. Who is traveling with you?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {travelerOptions.map((t) => (
                <button
                  type="button"
                  key={t.label}
                  onClick={() => setTraveler(t.label)}
                  className={`
                    p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300
                    ${
                      traveler === t.label
                        ? "border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/25 shadow-lg"
                        : "border-slate-200 hover:border-amber-300 hover:bg-slate-50/50"
                    }
                  `}
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <div className="mt-4">
                    <div className="font-bold text-slate-900 text-sm">{t.label}</div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* GENERATE BUTTON */}
          <Button
            onClick={OnGenerateTrip}
            disabled={loadingGeneration}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl text-base font-bold shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            {loadingGeneration ? (
              "Drafting Itinerary..."
            ) : (
              <>
                <Sparkles size={18} className="animate-spin text-amber-400" />
                Generate Travel Itinerary
              </>
            )}
          </Button>

          {/* Local Guest Login Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[420px] rounded-3xl p-6">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
                  Welcome, Explorer!
                </DialogTitle>
                <DialogDescription>
                  Setup a quick local profile. No passwords, no API keys, and stored locally on your machine.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleLocalLogin} className="space-y-5 pt-4">
                {/* Guest Name input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name..."
                    className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                {/* Avatar Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Your Title
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {avatars.map((av) => {
                      const isSelected = selectedAvatar === av;
                      return (
                        <button
                          type="button"
                          key={av}
                          onClick={() => setSelectedAvatar(av)}
                          className={`
                            px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-300
                            ${
                              isSelected
                                ? "border-amber-500 bg-amber-50 text-amber-900 shadow-sm"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }
                          `}
                        >
                          {av}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit button */}
                <Button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl">
                  Start Planning
                </Button>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </div>
  );
}
