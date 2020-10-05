const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const axios = require('axios');
const dm = require('../dataManager');
const dataUrl = dm.config.dataURL;


router.post('/config/sign-displays', async (req, res) => {
  const { password } = req.body;
  const { authorized } = await axios.post(dataUrl + '/master/authenticate', { password });
  if(authorized) {
    res.json({signs: dm.config.signs, status: 200});
  }else{
    res.json({signs: [], status: 404});
  }
})

router.post('/get-config-info', async (req, res) => {
  const { password } = req.body;
  const { authorized } = await axios.post(dataUrl + '/master/authenticate', { password });
  if(authorized) {
    res.json({config: dm.config, status: 200});
  }else{
    res.json({config: {}, status: 404});
  }
})

router.post('/config/sign-index-adjustment', async (req, res) => {
  const { password } = req.body;
  const { newArr } = req.body;
  const { authorized } = await axios.post(dataUrl + '/master/authenticate', { password });
  if(authorized) {
    dm.config.signs = newArr;
    dm.syncConfig();
    res.json({status: 200});
  }else{
    res.json({status: 404});
  }
})


// undisplay signs;









module.exports = router;