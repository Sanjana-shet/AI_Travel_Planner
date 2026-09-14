# AI Travel Planner ✈️

AI Travel Planner is a web application that helps users create personalized travel plans based on their destination, number of days, and trip preferences. The application uses AI to generate travel recommendations and organizes the trip into a structured itinerary.

## Features

* 🌍 Search and select travel destinations
* 🗓️ Generate personalized day-wise travel itineraries
* 🤖 AI-powered travel recommendations using Google Gemini API
* 🏨 Display recommended hotels and places to visit
* 💬 AI chatbot for travel-related queries
* 📋 View and manage generated trips
* 📱 Responsive and user-friendly interface
* 🔐 Firebase integration for application data

## Technologies Used

* **Frontend:** React.js, Vite
* **Styling:** Tailwind CSS
* **Programming:** JavaScript
* **AI:** Google Gemini API
* **Backend/API:** Node.js API routes
* **Database/Backend Services:** Firebase
* **Version Control:** Git & GitHub

## Project Structure

```text
AI_Travel_Planner/
│
├── app/
│   └── api/
│       └── generate-trip/
│
├── src/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── create-trip/
│   ├── my-trips/
│   ├── pages/
│   ├── services/
│   └── view-trip/
│
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## How It Works

1. The user enters a destination and trip preferences.
2. The application collects the required travel details.
3. The Google Gemini API generates travel recommendations.
4. The generated information is organized into a day-wise itinerary.
5. Users can view recommended hotels and places to visit.
6. Generated trips can be accessed through the application.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sanjana-shet/AI_Travel_Planner.git
```

### 2. Navigate to the project

```bash
cd AI_Travel_Planner
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure API keys

Create the required environment configuration file and add the necessary API keys.

**Do not upload API keys or other sensitive credentials to GitHub.**

### 5. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Future Improvements

* Add more travel preferences and filters
* Improve itinerary customization
* Add map integration
* Add weather information for destinations
* Improve authentication and user profile management
