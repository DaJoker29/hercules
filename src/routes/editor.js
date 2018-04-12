const { Router } = require('express');

const router = Router();

router.get('/editor', renderEditor);
router.post('/editor/preview', preview);

module.exports = router;

function renderEditor(req, res) {
  res.render('editor');
}

function preview(req, res) {
  res.render('preview', { preview: req.body });
}
