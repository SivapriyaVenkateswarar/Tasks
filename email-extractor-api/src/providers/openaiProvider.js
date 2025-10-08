const { ChatOpenAI } = require("@langchain/openai");

const openaiProvider = new ChatOpenAI({
  modelName: "gpt-4o-mini", 
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openaiProvider;
