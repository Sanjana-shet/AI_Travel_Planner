import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Sparkles, Tent, Trees } from 'lucide-react';
import { motion } from 'framer-motion';

function Hero() {
  const featuredPlaces = [
    {
      title: "Hampi Ruins",
      desc: "Vijayanagara Stone Chariot & Temples",
      tag: "UNESCO Heritage",
      bg: "from-amber-500/20 to-orange-600/30",
      border: "border-amber-500/30",
      icon: <Sparkles className="text-amber-500" size={20} />
    },
    {
      title: "Mysore Palace",
      desc: "Grand Royal Heritage & Chamundi Hills",
      tag: "Royal Splendor",
      bg: "from-yellow-400/20 to-amber-500/30",
      border: "border-yellow-500/30",
      icon: <Compass className="text-yellow-500" size={20} />
    },
    {
      title: "Coorg Mist",
      desc: "Coffee Plantations & Abbey Waterfalls",
      tag: "Scotland of India",
      bg: "from-emerald-500/20 to-teal-600/30",
      border: "border-emerald-500/30",
      icon: <Trees className="text-emerald-500" size={20} />
    },
    {
      title: "Gokarna Beaches",
      desc: "Pristine Om Beach & Cliff Hikes",
      tag: "Coastal Escape",
      bg: "from-cyan-500/20 to-blue-600/30",
      border: "border-cyan-500/30",
      icon: <Tent className="text-cyan-500" size={20} />
    }
  ];

  return (
    <div className='relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-slate-50'>
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-emerald-400/25 blur-[140px] pointer-events-none" />

      {/* Main Hero Header */}
      <div className="max-w-4xl text-center z-10 space-y-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider"
        >
          <MapPin size={14} className="animate-bounce" /> Explore One State, Many Worlds
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
        >
          Discover the Majestic Wonders of <br />
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
            Karnataka
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Create fully customized, premium multi-day itineraries for Karnataka's top destinations instantly. 100% key-free, locally curated, and fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-4"
        >
          <Link to='/create-trip'>
            <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold text-base shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all">
              Plan Your Adventure
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Featured Karnataka Destinations Showcases */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-6xl mt-16 z-10"
      >
        <h2 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Curated Karnataka Magic
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlaces.map((place, idx) => (
            <div
              key={idx}
              className={`
                relative p-5 rounded-2xl border ${place.border} 
                bg-gradient-to-br ${place.bg} backdrop-blur-md 
                hover:scale-[1.04] hover:-translate-y-1 transition-all duration-300
                shadow-sm flex flex-col justify-between group cursor-pointer
              `}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-white shadow-sm">
                  {place.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/70 px-2 py-0.5 rounded-full">
                  {place.tag}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-800 transition">
                  {place.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {place.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;