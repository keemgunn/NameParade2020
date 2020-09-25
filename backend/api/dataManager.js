const path = require('path');
const fs = require('fs');
const randomstring = require('randomstring');
const { EventEmitter } = require('events');

const configPath = path.join(__dirname, '../data/config.json');
const signsPath = path.join(__dirname, '../data/signs/');
let config = readSync(configPath);
updateConfigs();


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


//______________ CONFIIGS ____________

function updateConfigs(){
  config.signs = getSignsArrAsc();
  config.emptySeats = getEmptySeatsArr();
  syncConfig();
}

function syncConfig() {
  update(configPath, config);
  console.log(config);
  console.log(' -- config synced');
}

function getEmptySeatsArr(){
  let result = []; 
  let lastNum = config.signs[config.signs.length-1];
  for(var i=0; i<lastNum; i++){
    if(!config.signs.includes(i)){
      result.push(i);
    }
  }
  result = result.sort((a,b)=>{
    return b - a
  }) // ... DESCENDING 
  return result;
}

function getSignsArrAsc() {
  let result = fs.readdirSync(signsPath, (err, files) => {
    if(err){
      return console.log('something wrong ...@dataManager/getSignsArrAsc');
    }
  }); // result == files array
  let intArr = [];
  for(var i=0; i < result.length; i++){
    const names = result[i].split('.');
    intArr.push(parseInt(names[0]));
  }
  // _____ SORT ASCENDING
  intArr = intArr.sort((a,b)=>{
    return a - b
  });
  return intArr;
}


//______________ SIGN METHODS ____________
let monitor = new EventEmitter();

function getAllSigns(res) {
  const queryID = ResponseMonitor(monitor, res);
  let result = []; let readCount = 0
  let fileNames = fs.readdirSync(signsPath, (err, files) => {
    if(err){
      return console.log('something wrong ...@dataManager/getAllFiles');
    }
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
function ResponseMonitor(monitor, res) {
  const queryID = randomstring.generate(4);
  monitor.on(queryID, (arg) => {
    res.json({arg});
    console.log('responsed... queryID: ', queryID);
  });
  return queryID
}



function newSign(data){
  let newSeat = findSeat()
  let path = SignPath(newSeat);
  writeSync(data, path);
    console.log(' -- sign saved:', path);
  config.signs.push(newSeat);
  config.signs = config.signs.sort((a,b)=>{
    return a - b
  });
  syncConfig();
}

function SignPath(i) {
  return signsPath + i + '.json'
}

function findSeat(){
  if(config.emptySeats.length){
    return comfig.sings.emptySeats.pop()
  }else{
    return config.signs.length
  }
}





//______________ MONITOR SETTINGS ____________
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






module.exports = { 
  configPath, signsPath, config,
  readSync, writeSync, update,
  syncConfig, updateConfigs,
  getAllSigns, newSign
}