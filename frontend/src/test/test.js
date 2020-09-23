const configs = {
  client: {
    loading: true, 
    testSequence: true, 
    
    loadingAmount: 99.9,
    sequenceNow: ( 2 ),
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