const path = require('path');
const fs = require('fs');
const randomstring = require('randomstring');
const { EventEmitter } = require('events');



const configPath = path.join(__dirname, '../data/config.json');
let config = readSync(configPath);
function syncConfig() {
  update(configPath, config);
  console.log(config);
  console.log(' -- config synced');
}

const signsPath = path.join(__dirname, '../data/signs/');
let signsCount = fileCounter(signsPath);
config.signs = signsCount;
syncConfig();


function fileCounter(path) {
  let result = fs.readdirSync(path, (err, files) => {
    if(err){
      return console.log('something wrong ...@dataManager/fileCounter');
    }
    return files.length
  });
  return result;
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


//______________ SIGN METHODS ____________

let monitor = new EventEmitter();

function SignPath(i) {
  return signsPath + i + '.json'
}

function getAllSigns(res) {
  const queryID = ResponseMonitor(monitor, res);
  let result = []; let readCount = 0
  let fileNames = fs.readdirSync(signsPath, (err, files) => {
    if(err){
      return console.log('something wrong ...@dataManager/getAllFiles');
    }
    return files
  });

  monitor.on('read-done', () => {
    readCount += 1;
    if(readCount < fileNames.length){
      readForEachSync(
        monitor, 
        signsPath + fileNames[readCount], 
        result
      );
    }else{
      monitor.emit(queryID, result);
      console.log('result: ', result.length, ' ... @dataManager/getAllFiles');
      monitor.emit('delete-listener', queryID);
      monitor.emit('delete-listener', 'read-done')
    }
  })

  if(fileNames.length){
    readForEachSync(
      monitor, 
      signsPath + fileNames[readCount], 
      result
    );
  }else{
    monitor.emit(queryID, result);
    console.log('result: ', result.length, ' ... @dataManager/getAllFiles');
    monitor.emit('delete-listener', queryID);
    monitor.emit('delete-listener', 'read-done')
  }
}
function readForEachSync(monitor, path, resArr) {
  let rawdata = fs.readFileSync(path);
  let parsed = JSON.parse(rawdata);
  resArr.push(parsed);
  monitor.emit('read-done');
}





//______________ MONITOR SETTINGS ____________

function ResponseMonitor(monitor, res) {
  const queryID = randomstring.generate(4);
  monitor.on(queryID, (arg) => {
    console.log(arg);
    res.json({arg});
    console.log('responsed... queryID: ', queryID);
  });
  return queryID
}

monitor.on('query success', (arg) => {
  console.log('$$$ QUERY SUCCESS ... @dataManager/monitor\n   affected: ', arg.affectedRows);
  affected += arg.affectedRows;
  log.push(arg);
});
monitor.on('query error', (arg) => {
  console.log('$$$ QUERY ERROR ... @dataManager/monitor');
  console.log(arg);
});
monitor.on('delete-listener', (name) => {
  monitor.removeAllListeners(name);
  console.log('$$$ listener-deleted:', name);
});




module.exports.configPath = configPath;
module.exports.signsPath = signsPath;
module.exports.config = config;

module.exports.fileCounter = fileCounter;
module.exports.readSync = readSync;
module.exports.writeSync = writeSync;
module.exports.update = update;

module.exports.SignPath = SignPath;
module.exports.getAllSigns = getAllSigns;
module.exports.syncConfig = syncConfig;