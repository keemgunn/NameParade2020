const path = require('path');
const fs = require('fs');


const configPath = path.join(__dirname, '../data/config');
let config = readSync(configPath);

const signsPath = path.join(__dirname, '../data/signs/');
let signsCount = fileCounter(signsPath);


function fileCounter(path) {
  fs.readdir(path, (err, files) => {
    if(err){
      return console.log('something wrong ...@dataManager/fileCounter');
    }
    return files.length
  });
}
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

function SignPath(i) {
  return signsPath + i + '.json'
}

function getAllSigns() {
  let result = [];
  fs.readdir(signsPath, (err, files) => {
    if(err){
      return console.log('something wrong ...@dataManager/getAllFiles');
    }
    let temp;
    files.forEach((file) => {
      temp = readSync(signsPath + file);
      result.push(temp);
    })
    return result
  });
}

function syncConfig() {
  update(configPath, config);
  console.log(' -- config synced');
}


module.exports.configPath = configPath;
module.exports.signsPath = signsPath;

module.exports.config = config;
module.exports.signsCount = signsCount;

module.exports.fileCounter = fileCounter;
module.exports.readSync = readSync;
module.exports.writeSync = writeSync;
module.exports.update = update;

module.exports.SignPath = SignPath;
module.exports.getAllSigns = getAllSigns;
module.exports.syncConfig = syncConfig;