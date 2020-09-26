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




router.post('/paths', (req, res) => {
  const newSign = req.body;
  dm.newSign(newSign);
  res.json({status: 200});
})





module.exports = router;