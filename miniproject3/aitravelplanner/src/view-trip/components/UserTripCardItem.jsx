import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generatePlaceImage } from "@/services/AIImageGen";
import { Trash2 } from "lucide-react";

function UserTripCardItem({ trip, onDelete }) {
  const [imgUrl, setImgUrl] = useState("https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80");

  useEffect(() => {
    const destination = trip?.location || trip?.userSelection?.location?.label;
    if (destination) {
      generatePlaceImage(destination).then((url) => {
        if (url) setImgUrl(url);
      });
    }
  }, [trip]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(trip.id);
    }
  };

  // Support both new schema (root level) and old schema (userSelection) for full backwards compatibility
  const locationName = trip?.location || trip?.userSelection?.location?.label || "Adventure Trip";
  const tripDays = trip?.days || trip?.userSelection?.noOfDays || "N/A";
  const tripBudget = trip?.budget || trip?.userSelection?.budget || "N/A";

  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="relative p-4 rounded-2xl border border-slate-100 shadow-sm hover:scale-[1.03] transition-all bg-white hover:shadow-xl duration-300 group">
        <img
          src={imgUrl}
          alt={locationName}
          className="w-full h-40 object-cover rounded-xl"
        />

        {/* Delete Button overlay on hover */}
        {onDelete && (
          <button
            onClick={handleDeleteClick}
            type="button"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/90 hover:bg-red-500 hover:text-white backdrop-blur text-red-600 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Delete Trip"
          >
            <Trash2 size={15} />
          </button>
        )}

        <h2 className="font-extrabold text-slate-800 text-lg mt-3 truncate pl-0.5">
          {locationName}
        </h2>

        <p className="text-slate-400 text-xs mt-1 pl-0.5 font-semibold">
          {tripDays} days trip · Budget: {tripBudget}
        </p>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
