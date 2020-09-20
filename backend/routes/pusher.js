const express = require('express');
const router = express.Router();
const dm = require('../api/dataManager');

router.post('/paths', (req, res) => {
  const { writer } = req.body;
  dm.writeSync(writer, dm.SignPath(dm.config.signs));
  console.log(' -- path saved:', dm.config.signs + '.json');
  dm.config.signs += 1;
  dm.syncConfig();
  res.json({status: 200});
})



















module.exports = router;