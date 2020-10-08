const path = require('path');
const fs = require('fs');

//______________ CONFIIGS ____________
const configPath = path.join(__dirname, './config.json');
let config = readSync(configPath);

function syncConfig() {
  update(configPath, config);
  // console.log(config);
  console.log(' -- config synced');
}

//______________ ESSENTIALS ____________

function readSync(file){
  let rawdata = fs.readFileSync(file);
  let parsed = JSON.parse(rawdata);
  return parsed
}
function writeSync(data, file){
  let writable = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, writable);
}
function update(file, source){
  let target = readSync(file);
  Object.assign(target, source);
  writeSync(target, file);
}



module.exports = { 
  configPath, config,
  readSync, writeSync, update,
  syncConfig,
}