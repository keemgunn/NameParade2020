const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const axios = require('axios');
const dm = require('../dataManager');
const dataUrl = dm.config.dataURL;


// _________________________ INITIATING 

router.use(requestIp.mw())
router.post('/init', (req, res) => {
  if(req.body.userId === 'master'){
    console.log('=== CONNECTION FROM MASTER');
    res.json({foo:'bar'})
  }
  else{
    console.log('=== CONNECTION FROM WRITER');
    console.log('userId:', req.body.userId);
    dm.config.connectionRequests += 1;
    const ip = req.clientIp;
    const uag = req['headers']['user-agent'];
    res.json({
      ip,
      uag,
      connections: dm.config.connectionRequests,
      dataUrl,
      version: dm.config.version,
      build: dm.config.build,
      signs: dm.config.signs
    });
    dm.syncConfig();
  }
})

router.get('/sign-indexes', (req, res) => {
  console.log('$request ... /load/initial');
  res.json({signIndexArr: dm.config.signs});
  console.log('responsed, signs:', dm.config.signs.length);
})


// _________________________ PUSH DATA 

router.post('/push', async (req, res) => {
  const newSign = req.body;
  const {data} = await axios.post(dataUrl + '/push', newSign);
  dm.config.signs.push(data.newSeat);
  dm.syncConfig();
  res.json({status: 200});
})


module.exports = router;