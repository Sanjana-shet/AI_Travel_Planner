import React, { useState } from "react";

function LocationSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchPlaces = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=6`
    );

    const data = await res.json();
    setResults(data.features || []);
  };

  return (
    <div className="relative w-full">
      <input
        value={query}
        onChange={(e) => searchPlaces(e.target.value)}
        placeholder="Search destination..."
        className="border p-3 rounded-md w-full shadow-sm outline-none focus:ring-2 focus:ring-black"
      />

      {results.length > 0 && (
        <ul className="absolute mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {results.map((place, index) => (
            <li
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                const name =
                  place.properties.name ||
                  place.properties.city ||
                  place.properties.country;

                const fullName =
                  `${name}, ${
                    place.properties.state || place.properties.country
                  }`;

                onSelect({
                  name: fullName,
                  lat: place.geometry.coordinates[1],
                  lng: place.geometry.coordinates[0],
                });

                setQuery(fullName);
                setResults([]);
              }}
            >
              {place.properties.name || place.properties.city},{" "}
              {place.properties.state || place.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSearch;
