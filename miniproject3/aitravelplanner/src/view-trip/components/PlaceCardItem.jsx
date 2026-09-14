// src/components/PlaceCardItem.jsx
import React, { useState, useEffect } from "react";
import { generatePlaceImage } from "@/services/AIImageGen";
import placeHolderImage1 from "../../assets/placeHolderImage1.png";

function PlaceCardItem({ place }) {
  const [imgUrl, setImgUrl] = useState(placeHolderImage1);

  useEffect(() => {
    if (place?.placeName) {
      generatePlaceImage(place.placeName).then((url) => {
        if (url) setImgUrl(url);
      });
    }
  }, [place]);

  const travelTime =
    place.travelTime ||
    place.timeTravel ||
    place.time ||
    place.timeToTravel ||
    place.travelTimeFromHubliCenter ||
    place.travelTimeFromUnkalLake ||
    place.travelTimeFromNrupatungaBetta ||
    place.travelTimeFromChandramouleshwaraTemple ||
    "N/A";

  return (
    <div className="border p-4 rounded shadow bg-white hover:scale-[1.02] transition-all">
      <img
        src={imgUrl}
        alt={place.placeName}
        className="w-full h-56 object-cover rounded-lg mb-2"
      />

      <h3 className="font-semibold text-lg">{place.placeName}</h3>
      <p className="text-gray-600">{place.placeDetails}</p>
      <p className="text-gray-500">
        <strong>Ticket:</strong> {place.ticketPricing || "Free"}
      </p>
      <p className="text-gray-500">
        <strong>Rating:</strong> ⭐ {place.rating || "N/A"}
      </p>
      <p className="text-gray-500">
        <strong>Travel Time:</strong> {travelTime}
      </p>
      <p className="text-gray-500">
        <strong>Best Time:</strong> {place.bestTimeToVisit || "N/A"}
      </p>
    </div>
  );
}

export default PlaceCardItem;

