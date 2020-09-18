const path = require('path');
const express = require('express');
const router = express.Router();

const dm = require('../api/dataManager');

router.get('/file-count', (req, res) => {
  res.json({jsonCount: dm.signsCount});
})

router.get('/initial', (req, res) => {
  let signs = dm.getAllSigns();
  res.json(signs);
})






















module.exports = router;