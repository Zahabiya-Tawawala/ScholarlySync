const express = require('express');
const router = express.Router();
const { getProjectCards } = require('../controllers/projectCard');

router.get('/projectCards', getProjectCards);

module.exports = router;