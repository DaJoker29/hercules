const { Router } = require('express');
const { Podcast } = require('../controllers');

const router = Router();

router.post('/podcast', Podcast.CREATE_PODCAST);

module.exports = router;
