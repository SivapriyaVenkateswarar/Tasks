import openaiProvider from "./openaiProvider.js";
import geminiProvider from "./geminiProvider.js";

export function getProvider(modelName) {
  switch (modelName) {
    case "openai":
      return openaiProvider;
    case "gemini":
      return geminiProvider;
    default:
      throw new Error("Unsupported model provider. Use 'openai' or 'gemini'.");
  }
}
