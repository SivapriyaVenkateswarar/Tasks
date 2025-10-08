// services.js
const { HumanMessage } = require('@langchain/core/messages');
const { getProvider } = require('./providers/commonProvider');

/**
 * Process an email using the selected LLM (OpenAI or Gemini)
 * and return structured data: name, mailFrom, summary
 * @param {Object} options
 * @param {string} options.model - "openai" or "gemini"
 * @param {string} options.text - full email text
 * @returns {Object} { name, mailFrom, summary }
 */
async function processEmailWithAI({ model, text }) {
  const llm = getProvider(model);

  const emailExtractionPrompt = `
Extract the sender's name and email, and provide a concise one-to-two sentence summary of this email.
Return the result as JSON in this format:
{
  "name": "",
  "mailFrom": "",
  "summary": ""
}
Email:
${text}
`;

  const response = await llm.invoke([new HumanMessage(emailExtractionPrompt)]);
  const content = response.content || response.response?.text();

  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error(`LLM response is not valid JSON: ${content}`);
  }
}

module.exports = { processEmailWithAI };
