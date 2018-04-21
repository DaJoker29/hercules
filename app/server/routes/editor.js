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
    req.body.excerpt =
      req.body.content
        .replace(/\[\S+\]|\(\S+\)|[^A-Za-z0-9,;.'"\s()[\]{}]/g, '')
        .substr(0, 257)
        .replace(/[.|,|;|?|!]+$/g, '') + '...';
  }
  res.render('preview', { preview: req.body });
}
