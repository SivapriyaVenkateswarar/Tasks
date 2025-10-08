const express = require('express');
const { handleEmailExtraction } = require('./controller');
const router = express.Router();

router.post('/extract-email-details', handleEmailExtraction);

module.exports = router;
