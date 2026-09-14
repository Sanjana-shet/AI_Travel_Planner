import React, { useState, useEffect } from "react";
import { generatePlaceImage } from "@/services/AIImageGen";
import placeHolderImage2 from "../../assets/placeHolderImage2.png";

function HotelCardItem({ hotel }) {
  const [imgUrl, setImgUrl] = useState(placeHolderImage2);

  useEffect(() => {
    if (hotel?.hotelName) {
      generatePlaceImage(hotel.hotelName).then((url) => {
        if (url) setImgUrl(url);
      });
    }
  }, [hotel]);

  if (!hotel) return null;

  return (
    <div className="border p-4 rounded-xl shadow-xl bg-white hover:scale-[1.02] transition-all">
      {/* Hotel Image */}
      <img
        src={imgUrl}
        alt={hotel.hotelName}
        className="w-full h-56 object-cover rounded-lg mb-3"
      />

      <h2 className="font-bold text-xl mb-2">{hotel.hotelName}</h2>
      <p className="text-gray-700 mb-2">{hotel.description}</p>

      <p><strong>Address:</strong> {hotel.hotelAddress}</p>
      <p><strong>Price:</strong> {hotel.pricePerNight || hotel.price || "N/A"}</p>
      <p><strong>Rating:</strong> ⭐ {hotel.rating || "N/A"}</p>
    </div>
  );
}

export default HotelCardItem;

