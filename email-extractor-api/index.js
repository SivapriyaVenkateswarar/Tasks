require('dotenv').config();
const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

async function processEmail(model, prompt) {
    let result;

    if (model === 'openai') {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not set in .env');
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', 
            messages: [
                {
                    role: 'user',
                    content: `Extract the sender's email and provide a concise summary in JSON format. Email:\n${prompt}\nFormat: {"mailFrom":"", "summary":""}`
                }
            ],
        });

        result = completion.choices[0].message.content;

    } else if (model === 'gemini') {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('Gemini API key is not set in .env');
        }

        const response = await axios.post(
            'https://api.gemini.com/v1/chat/completions',
            {
                model: 'gemini-1.5',
                messages: [
                    {
                        role: 'user',
                        content: `Extract the sender's email and provide a concise summary in JSON format. Email:\n${prompt}\nFormat: {"mailFrom":"", "summary":""}`
                    }
                ],
            },
            {
                headers: { 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` }
            }
        );

        result = response.data.choices[0].message.content;
    }

    console.log('LLM raw result:', result);

    try {
        return JSON.parse(result);
    } catch (err) {
        throw new Error(`LLM response is not valid JSON: ${result}`);
    }
}

app.post('/extract-email-details', async (req, res) => {
    const { model, prompt } = req.body;

    if (!model || !prompt || !['openai', 'gemini'].includes(model)) {
        return res.status(400).json({
            error: 'Invalid request. Ensure "model" is "openai" or "gemini" and "prompt" is provided.'
        });
    }

    try {
        const data = await processEmail(model, prompt);
        return res.status(200).json(data);
    } catch (err) {
        console.error('Error processing email:', err.message);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

app.get('/', (req, res) => {
    res.send('Email Extractor API is running. Use POST /extract-email-details');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
