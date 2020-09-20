const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const dm = require('../api/dataManager');


router.use(requestIp.mw())
router.post('/enter', (req, res) => {
  if(req.body.userId === 'master'){
    console.log('=== CONNECTION FROM MASTER');

    res.json({foo:'bar'})
  }
  else{
    console.log('=== CONNECTION FROM WRITER');
    console.log('userId:', req.body.userId);
    dm.config.connectionRequests += 1;
    dm.syncConfig();
    const ip = req.clientIp;
    const uag = req['headers']['user-agent'];
    res.json({ip, uag});
  }
})












module.exports = router;