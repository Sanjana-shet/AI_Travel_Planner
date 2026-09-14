// src/components/PlacesToVisit.jsx
import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  if (!trip?.generatedPlan?.itinerary) return <p>No itinerary available</p>;

  const dayPlans = Object.values(trip.generatedPlan.itinerary);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-5">Places to Visit</h2>

      {dayPlans.map((day, index) => (
        <div key={index} className="mt-5">
          <h3 className="font-semibold text-lg mb-3">{`Day ${index + 1}`}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {day.plan.map((place, pIndex) => (
              <PlaceCardItem key={pIndex} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
