const express = require('express');
const router = express.Router();
const { getSchemes, calculateReturns } = require('../controllers/schemeController');

router.get('/', getSchemes);
router.post('/calculate', calculateReturns);

module.exports = router;
