const express = require('express');
const router = express.Router();
const dm = require('../api/dataManager');

router.post('/paths', (req, res) => {
  const newSign = req.body;
  dm.newSign(newSign);
  res.json({status: 200});
})



















module.exports = router;