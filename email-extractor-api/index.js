require('dotenv').config(); 

const express = require('express');
const routes = require('./src/routes'); 

const app = express();
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Email Extractor API is running. Use POST /api/extract-email-details');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
