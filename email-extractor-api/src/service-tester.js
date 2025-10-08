// src/service-tester.js
require('dotenv').config();
const { HumanMessage } = require('@langchain/core/messages');
const { getProvider } = require('./providers/commonProvider');

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

    console.log('OpenAI Test Result:', response.content);
  } catch (err) {
    console.error('Error testing OpenAI:', err);
  }
}

testOpenAI();
