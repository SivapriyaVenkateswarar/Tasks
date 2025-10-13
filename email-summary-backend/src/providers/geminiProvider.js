import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

if (!process.env.GOOGLE_API_KEY) {
  console.warn(
    "Gemini API key not set. Gemini calls will fail until you provide a key from AI Studio."
  );
}

const geminiProvider = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

export default geminiProvider;
