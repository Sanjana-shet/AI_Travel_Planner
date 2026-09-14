// src/components/InfoSection.jsx
import React from "react";


function InfoSection({ trip }) {
  if (!trip) {
    return (
      <div className="p-5">Loading trip summary...</div>
    );
  }

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-3">Trip Summary</h1>

      <p><strong>Location:</strong> {trip.location || "N/A"}</p>
      <p><strong>Budget:</strong> {trip.budget || "N/A"}</p>
      <p><strong>Duration:</strong> {trip.days || "N/A"} days</p>
<p><strong>Total Days:</strong> {trip.totalDays || "N/A"}</p>

    </div>
  );
}

export default InfoSection;
