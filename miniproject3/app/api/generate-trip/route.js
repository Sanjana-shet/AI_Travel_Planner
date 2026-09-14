import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { location, days, budget, travelType } = body;

    // AI Prompt
    const prompt = `
      Create a detailed ${days}-day travel itinerary for ${location}.
      Travel type: ${travelType}
      Budget level: ${budget}

      Include:
      - Daily plan (morning, afternoon, evening)
      - Food recommendations
      - Travel tips
      - Estimated cost per day
      - Best places to visit
      - Summary at the end

      Write in simple bullet points.
      Format response as JSON only:

      {
        "location": "",
        "days": "",
        "budget": "",
        "travelType": "",
        "itinerary": [],
        "totalCost": ""
      }
    `;

    // --- Gemini API Call ---
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    const aiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const aiData = await aiRes.json();

    // Extract AI reply safely
    const textResponse =
      aiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    const json = JSON.parse(textResponse);

    return NextResponse.json({
      success: true,
      data: json,
    });
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
