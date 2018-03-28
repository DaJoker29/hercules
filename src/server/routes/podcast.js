const { Router } = require('express');
const multer = require('multer');
const { Podcast } = require('../controllers');

const upload = multer();

const router = Router();

router.post('/podcast', upload.single('cover'), Podcast.CREATE_PODCAST);

module.exports = router;
