import React from "react";
import HotelCardItem from "./HotelCardItem";

function HotelList({ hotels }) {
  if (!hotels || hotels.length === 0) return <p>No hotels available</p>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-center mb-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default HotelList;
