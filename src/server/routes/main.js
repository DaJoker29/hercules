const { Router } = require('express');
const { Podcast } = require('../controllers');

const router = Router();

router.get('/', Podcast.RENDER_HOME);

module.exports = router;
