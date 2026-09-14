import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY is missing from your .env.local file!");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const SYSTEM_INSTRUCTION = `You are Kaveri, the friendly and extremely knowledgeable AI Travel Assistant and Tour Guide for "Karunadu Travels" (a dedicated Karnataka Tourism platform).
Your goal is to help travellers explore the beautiful state of Karnataka, India.

Guidelines:
1. Act as a local expert on Karnataka's heritage spots (Hampi, Pattadakal, Mysore Palace, Belur, Halebidu), nature/wildlife (Coorg, Kabini, Bandipur, Chikmagalur), beaches (Gokarna, Murudeshwar, Karwar, Mangalore), cuisines (Mysore Masala Dosa, Neer Dosa, Bisi Bele Bath, Ragi Mudde, Karavali seafood dishes), and hidden gems.
2. Keep your tone warm, welcoming, enthusiastic, and polite. Proactively use a few common Kannada words where appropriate (e.g., "Namaskara" for greeting, "Dhanyavadagalu" for thank you, "Karunadu" for Karnataka, "Hogi Banni" for see you/come back soon).
3. Provide helpful formatting in your responses (bullet points, clear sections, bold text) but keep them relatively concise so they look great inside a chat window.
4. If asked about places outside Karnataka, politely redirect the conversation back to exploring Karnataka, as you are a dedicated Karnataka specialist.
5. If the user asks for a Kannada phrase translation, help them happily and provide the pronunciation!`;

export async function sendChatToGemini(history) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Format chat history for Gemini API
    // Gemini expects an array of content objects:
    // { role: "user" | "model", parts: [{ text: string }] }
    const formattedContents = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const result = await model.generateContent({
      contents: formattedContents,
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in Kaveri Chat Service:", error);
    throw error;
  }
}
