const path = require('path');
const express = require('express');
const router = express.Router();

const dm = require('../api/dataManager');

router.get('/file-count', (req, res) => {
  console.log('$request ... /load/file-count');
  res.json({jsonCount: dm.config.signs});
})

router.get('/initial', (req, res) => {
  console.log('$request ... /load/initial');

  dm.getAllSigns(res);
})






















module.exports = router;