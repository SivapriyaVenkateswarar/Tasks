const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const geminiProvider = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-turbo", 
  apiKey: process.env.GOOGLE_API_KEY,
});

module.exports = geminiProvider;
