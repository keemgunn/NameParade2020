const seqStates = {
  0: 'loading-init',
  1: 'loading-done',
  2: 'writer-pm',
  3: 'writer-ig',
  4: 'parade-intro',

};

const configs = {
  client: {
    // testSequence: true, 
    // writerDone: true,


    
    sequenceNow: ( 2 ),
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
  seqStates,
  configs, 
  signsArr,
  signFiles,

};