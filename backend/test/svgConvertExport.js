const path = require('path');
const fs = require('fs');
const svg = require('./svgTest');

const software = ['software', svg.software];
const graphic = ['graphic', svg.graphic];
const system = ['system', svg.system];
const interactive = ['interactive', svg.interactive];
const motion = ['motion', svg.motion];
const ux = ['ux', svg.ux];
const thanks = ['thanks', svg.thanks]

function getStrings(target){
  let filepath = path.join(__dirname, './exports/' + target[0] +'.json');
  let paths = target[1].split('<path d="');
  let resultArr = [];
  for(var i=1; i < paths.length; i++){
    const eachPath = paths[i].split('"');
    resultArr.push(eachPath[0]);
  }
  return {filepath, resultArr}
}

function exportToJSON({filepath, resultArr}){
  let writable = JSON.stringify(resultArr, null, 2);
  fs.writeFileSync(filepath, writable);
}

exportToJSON(getStrings(software));
exportToJSON(getStrings(graphic));
exportToJSON(getStrings(system));
exportToJSON(getStrings(interactive));
exportToJSON(getStrings(motion));
exportToJSON(getStrings(ux));
exportToJSON(getStrings(thanks));




