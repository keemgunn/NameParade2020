const express = require('express');
const path = require('path');
const axios = require('axios');


// ---------------- ROUTES
const user = require('./routes/user');
const master = require('./routes/master');



function testReq(){
  const {data} = axios.get('http://192.168.0.4/test');
  console.log(data);
}
testReq();




// ---------------- APP SETTING
const app = express();
app.use(express.json({
  limit: "50mb"
}));
app.use(express.text({
  defaultCharset:"utf-8",
  limit: "50mb"
}));


// ---------------- SERVE
app.use(express.static(path.join(__dirname, 'public')));
const appEndpoint = path.join(__dirname, './public/index.html');
app.get('/nameparade', (req,res)=>{
  res.sendFile(appEndpoint);
})
app.get('/',(req, res)=>{
  res.redirect('/nameparade')
})
app.use('/api', user);
app.get('/master/config', master);


// ---------- PORT SETTING
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`=== Listening on port ${port} ... @app.js`));