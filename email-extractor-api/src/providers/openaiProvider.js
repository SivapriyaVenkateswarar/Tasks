import { ChatOpenAI } from "@langchain/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OpenAI API key not set in .env");
}

const openaiProvider = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export default openaiProvider;
