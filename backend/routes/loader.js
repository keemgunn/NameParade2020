const path = require('path');
const express = require('express');
const router = express.Router();

const dm = require('../api/dataManager');


router.get('/file-count', (req, res) => {
  res.json({jsonCount: 2})
})

router.get('/initial', (req, res) => {
  let signs = [ // Array of signArray
    [ // signArray = Array of Paths
      {foo1:'bar1', foo2:'bar2'},{foo3:'bar3', foo4:'bar4'}
    ],[
      {foo1:'bar1', foo2:'bar2'},{foo3:'bar3', foo4:'bar4'}
    ]
  ]
  res.json(signs);
})






















module.exports = router;