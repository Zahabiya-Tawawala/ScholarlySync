const express = require('express');
const router = express.Router();
const { getProjectCards } = require('../controllers/projectCard');
const { createProjectCards } =  require('../controllers/projectCard')
const { submitGithubAndVideoLink } = require('../controllers/projectCard')

router.get('/projectCards', getProjectCards);
router.post('/createProjectCards', createProjectCards)
router.post('/submitGithubAndVideoLink', submitGithubAndVideoLink)

module.exports = router;