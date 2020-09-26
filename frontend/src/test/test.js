const configs = {
  client: {
    // testSequence: true, 
    // signLoadDone: true,
    // titleSignRendered: true,
    // writerDone: true,


    
    loadingAmount: 100,
    sequenceNow: ( 0 ),
  },
  server: {
    // init: true,
    // filesInServer: true,
    // signLoad: true,
    // sendPaths: true,

    foo: 'bar',
  },
  // modal: true,
}

import signTest0 from './signs/0.json';
import signTest1 from './signs/1.json';
const signsArr = [0 ,1];
const signFiles = [signTest0, signTest1];



export { 
  configs, 
  signsArr,
  signFiles
};