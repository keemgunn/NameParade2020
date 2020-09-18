const express = require('express');
const router = express.Router();
const dm = require('../api/dataManager');

router.post('/paths', (req, res) => {
  const { writer } = req.body;
  dm.writeSync(writer, dm.SignPath(dm.config.signs));
  dm.config.signs += 1;
  dm.syncConfig();
})



















module.exports = router;