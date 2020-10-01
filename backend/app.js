const express = require('express');
const path = require('path');
const axios = require('axios');
const dm = require('./dataManager');


// ---------------- ROUTES
const user = require('./routes/user');
const master = require('./routes/master');
const dataUrl = dm.config.dataURL;

console.log('dataURL:', dataUrl);
let dataHealth = false;
async function testReq(){
  const {data} = await axios.get(dataUrl+'/test')
  .catch(function (error) {
    console.log('-----ERROR-----app/testReq');
    if (error.response) {
      console.log('-> RESPONSE ERROR');
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log('-> REQUEST ERROR');
      console.log(error.request);
    } else {
      console.log('-> UNKNOWN ERROR');
      console.log('Error', error.message);
    }
    console.log(' -- error.config --');
    console.log(error.config);
  });
  console.log(data);
  dataHealth = true;
}testReq();


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
app.get('/master', master);


// ---------- PORT SETTING
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`=== Listening on port ${port} ... @app.js`));