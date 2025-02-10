const express = require('express');
const router = express.Router();
const { getProjectCards } = require('../controllers/projectCard');
const { createProjectCards } =  require('../controllers/projectCard')

router.get('/projectCards', getProjectCards);
router.post('/createProjectCards', createProjectCards)

module.exports = router;