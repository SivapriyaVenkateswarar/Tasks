import { HumanMessage } from "@langchain/core/messages";
import { getProvider } from "./providers/commonProvider.js";

export async function processEmailWithAI({ model, text }) {
  const llm = getProvider(model);

  const prompt = `
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

  const response = await llm.invoke([new HumanMessage(prompt)]);
  const content = response.content || response.response?.text();

  const cleaned = content
    .replace(/^```json\s*/, '') 
    .replace(/```$/, '')         
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`LLM response is not valid JSON: ${content}`);
  }
}
