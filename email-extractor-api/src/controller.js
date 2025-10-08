const { processEmailWithAI } = require('./services');

async function handleEmailExtraction(req, res) {
  try {
    const { model, text } = req.body;

    if (!model || !text || !['openai', 'gemini'].includes(model)) {
      return res.status(400).json({
        error: 'Invalid request. "model" must be "openai" or "gemini", and "text" is required.'
      });
    }

    const result = await processEmailWithAI({ model, text });
    res.json(result);
  } catch (err) {
    console.error('Error processing email:', err.message);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
}

module.exports = { handleEmailExtraction };
