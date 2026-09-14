// services/GlobalApi.jsx
import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask":[
      'places.photos',
      'places.displayName',
      'places.id'
    ]
       // order does not matter
  }
};

/**
 * Search places using Google Places API v1
 * @param {Object} data - Request body { textQuery: "location name" }
 */
export const GetPlaceDetails = (data) =>
  axios.post(BASE_URL, data, config);

/**
 * Template URL for rendering Google Photos
 * Replace NAME with actual photo.name returned by API
 */
export const PHOTO_REF_URL = 
  "https://places.googleapis.com/v1/NAME/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
