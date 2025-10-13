// src/providers/listModels.js
require('dotenv').config();
const axios = require('axios');

async function listModels() {
  try {
    const response = await axios.get(
      'https://generativelanguage.googleapis.com/v1beta/models',
      {
        headers: { Authorization: `Bearer ${process.env.GOOGLE_API_KEY}` },
      }
    );
    console.log('Available models:', response.data);
  } catch (err) {
    console.error('Error listing models:', err.message);
  }
}

listModels();
