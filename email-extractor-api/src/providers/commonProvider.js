const openaiProvider = require("./openaiProvider");
const geminiProvider = require("./geminiProvider");

function getProvider(modelName) {
  switch (modelName) {
    case "openai":
      return openaiProvider;
    case "gemini":
      return geminiProvider;
    default:
      throw new Error("Unsupported model provider");
  }
}

module.exports = { getProvider };
