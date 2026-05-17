import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export const askGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite"
    });

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);

    if (error.message.includes("429")) {
      return "Daily free AI quota reached. Try again later.";
    }

    return "Gemini connection failed.";
  }
};