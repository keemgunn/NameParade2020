const express = require('express');
const router = express.Router();
const dm = require('../api/dataManager');

router.post('/paths', (req, res) => {
  const { writer } = req.body;
  dm.newSign(writer);
  res.json({status: 200});
})



















module.exports = router;