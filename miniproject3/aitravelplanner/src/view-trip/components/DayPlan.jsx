import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function DayPlan({ day, dayNumber }) {
  if (!day?.plan) {
    console.log("❌ Day has no places:", day);
    return null;
  }

  return (
    <div className="border p-5 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Day {dayNumber}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {day.plan.map((place, index) => (
          <PlaceCardItem key={index} place={place} />
        ))}
      </div>
    </div>
  );
}

export default DayPlan;
