const path = require('path');
const express = require('express');
const router = express.Router();

const dm = require('../api/dataManager');

router.get('/file-count', (req, res) => {
  console.log('$request ... /load/file-count');
  res.json(dm.config.signs);
})

router.get('/initial', (req, res) => {
  console.log('$request ... /load/initial');
  dm.getAllSigns(res);
})

router.post('/mysign', (req, res) => {
  console.log('$request ... /load/sendMySign');
  dm.writeSync(req.body.signPackage, dm.SignPath(999));
})





















module.exports = router;