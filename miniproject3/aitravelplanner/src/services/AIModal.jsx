import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY is missing from your .env.local file!");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// EXPORT THIS FUNCTION — NAME MUST MATCH THE IMPORT
export async function sendAIMessage(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text;
  } catch (err) {
    console.error("Gemini AI ERROR:", err);
    return null;
  }
}

