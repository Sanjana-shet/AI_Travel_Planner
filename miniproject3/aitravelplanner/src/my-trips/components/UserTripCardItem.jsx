// src/my-trip/components/UserTripCardItem.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  const placeholderImg = "/placeholder.jpg"; // put your image in public folder

  useEffect(() => {
    // load photo from first hotel or first place
    const plan = trip.generatedPlan?.[0]?.travelPlan;

    const firstHotelImg = plan?.hotelOptions?.[0]?.hotelImageUrl;
    const firstPlaceImg =
      plan?.itinerary?.day1?.places?.[0]?.placeImageUrl ||
      plan?.itinerary?.day2?.places?.[0]?.placeImageUrl;

    setPhotoUrl(firstHotelImg || firstPlaceImg || null);
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl || placeholderImg}
          alt="Trip"
          className="object-cover rounded-xl h-[220px] w-full"
        />

        <div className="mt-2">
          <h2 className="font-bold text-lg">
            {trip.userSelection?.location?.label ||
              trip.generatedPlan?.[0]?.travelPlan?.location}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip.userSelection?.noOfDays} days trip with{" "}
            {trip.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
