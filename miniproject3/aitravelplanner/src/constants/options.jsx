
// Budget options used for selection in the form
export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💰'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💸'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: '💎'
    },
];

// Traveler options used for selection in the form
export const SelectTravelerOptions = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '✈️'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travels in tandem',
        icon: '🥂'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '🥳'
    },
];

// AI Prompt Template
// This template contains placeholders ({location}, {totalDays}, {traveler}, {budget})
// which will be dynamically replaced by the user's form data in the component.
export const AI_PROMPT = `Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget.
Provide a list of 3-4 recommended hotels and a detailed day-by-day itinerary.
Format the output STRICTLY as a single JSON object matching this schema exactly:
{
  "hotels": [
    {
      "hotelName": "Name of the hotel",
      "hotelAddress": "Full address of the hotel",
      "pricePerNight": "Approx price per night (e.g., $80 / night)",
      "rating": "Rating (e.g., 4.5)",
      "description": "Short description of the hotel"
    }
  ],
  "itinerary": {
    "day1": {
      "plan": [
        {
          "placeName": "Name of the sightseeing place",
          "placeDetails": "Brief details and interesting history of the place",
          "ticketPricing": "Ticket cost or Free",
          "rating": "Rating (e.g., 4.7)",
          "travelTime": "Approx travel time from previous destination or starting point",
          "bestTimeToVisit": "Best time of the day to visit"
        }
      ]
    }
  }
}
Make sure to generate plans for exactly {totalDays} days in the itinerary keyed as "day1", "day2", etc. inside the "itinerary" object. Return ONLY the JSON object. Do not include markdown code block wrappers (like \`\`\`json).`;