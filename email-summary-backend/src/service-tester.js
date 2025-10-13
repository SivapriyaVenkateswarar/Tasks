// src/service-tester.js
import 'dotenv/config';
import { HumanMessage } from '@langchain/core/messages';
import { getProvider } from './providers/commonProvider.js';

async function testOpenAI() {
  try {
    const llm = getProvider('openai'); // use 'openai'

    const prompt = `From: Alice Smith <alice.smith@example.com>
Subject: Q4 Revenue Report

Hi team, the Q4 revenue exceeded our projections. Please review the attached report.`;

    const response = await llm.invoke([
      new HumanMessage(
        `Extract the sender's email and provide a concise summary in JSON format:
{"mailFrom": "", "summary": ""} from this email: ${prompt}`
      ),
    ]);

    const content = response.content || response.response?.text();
    console.log('OpenAI Test Result:', content);
  } catch (err) {
    console.error('Error testing OpenAI:', err);
  }
}

testOpenAI();
