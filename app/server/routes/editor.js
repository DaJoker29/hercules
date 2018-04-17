const { Router } = require('express');
const { ENSURE_AUTH } = require('@herc/server/middleware').Auth;

const router = Router();

router.get('/editor', ENSURE_AUTH, renderEditor);
router.post('/editor/preview', ENSURE_AUTH, preview);

module.exports = router;

function renderEditor(req, res) {
  res.render('editor');
}

function preview(req, res) {
  if (!req.body.excerpt) {
    req.body.excerpt = req.body.content.substr(0, 257) + '...';
  }
  res.render('preview', { preview: req.body });
}
