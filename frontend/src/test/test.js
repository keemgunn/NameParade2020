const configs = {
  client: {
    loading: true, 
    testSequence: true, 
    writerDone: true,
    
    loadingAmount: 99.9,
    sequenceNow: ( 3 ),
  },
  server: {
    init: true,
    signLoad: true,
    filesInServer: true,

    foo: 'bar',
  },
  // modal: true,
}





import signs from './signs_test.json';
export { configs, signs };