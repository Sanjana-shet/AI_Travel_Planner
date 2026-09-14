// src/components/TripSummary.jsx
import React from "react";

function TripSummary({ location, budget, duration, travelers }) {
  return (
    <div className="border p-5 rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-3">Trip Summary</h2>
      <p>
        <strong>Location:</strong> {location || "N/A"}
      </p>
      <p>
        <strong>Budget:</strong> {budget || "N/A"}
      </p>
      <p>
        <strong>Duration:</strong> {duration || "N/A"} days
      </p>
      <p>
        <strong>Travelers:</strong> {travelers || "N/A"}
      </p>
    </div>
  );
}

export default TripSummary;
