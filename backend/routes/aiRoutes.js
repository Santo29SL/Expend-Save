const express = require('express');
const router = express.Router();
const { getAiSuggestion } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/suggest', protect, getAiSuggestion);

module.exports = router;
