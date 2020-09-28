const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const dm = require('../api/dataManager');


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
      signs: dm.config.signs
    });
    dm.syncConfig();
  }
})


router.get('/signs', (req, res) => {
  console.log('$request ... /load/initial');
  dm.getAllSigns(res);
})





router.post('/push', (req, res) => {
  const newSign = req.body;
  const signData = newSign.pathArr;
  signData.unshift(
    newSign.info.name, 
    newSign.info.writeTime, 
    newSign.bounds.width, 
    newSign.bounds.height, 
    newSign.bounds.x, 
    newSign.bounds.y,
    newSign.bbc,
  );
  dm.newSign(signData);
  dm.wholeSign(newSign);
  res.json({status: 200});
})





module.exports = router;