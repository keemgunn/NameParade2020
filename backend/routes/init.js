const path = require('path');
const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');

let test = false;

router.use(requestIp.mw())
router.post('/enter', (req, res) => {
  if(req.body.userId === 'writer'){
    console.log('=== CONNECTION FROM WRITER');

    const ip = req.clientIp;
    const uag = req['headers']['user-agent'];
    res.json({ip, uag});
  }
  else if(req.body.userId === 'master'){
    console.log('=== CONNECTION FROM MASTER');

    res.json({foo:'bar'})
  }
  else if(req.body.userId === 'test'){
    test = true;
    console.log('=== CONNECTION FROM TEST');

    const ip = req.clientIp;
    const uag = req['headers']['user-agent'];
    res.json({ip, uag});
  }
  else{
    console.log('something wrong .../init/enter');
    res.json({alert: 'something wrong'});
  }
})












module.exports = router;