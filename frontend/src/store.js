import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const animation = require('./assets/javascripts/animation');
const ui = require('./assets/javascripts/uiAction');
const test = require('./test/test');

//_____ userID generate
import randomstring from 'randomstring';
let userId = randomstring.generate({
  length: 12,
  charset: 'alphanumeric'
});

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //__________________CONFIGS
    test: test.configs,
    winSize: { vw: null, vh: null }, 
    viewtype: null,
    sequence: 0,
    seqName: null,
    
    connections: 0,
    filesInServer: null,
    signsArr: null,
    
    //__________________UI
    desColor: [],
    aniTiming: animation.timing,
    
    //__________________PATHMAKER
    writer:{
      paths:[],
      pathGroup: null,
      svg: '',
      width: 0,
      info: {
        userId: userId,
        name: userId,
        ip: null,
        uag: null,
        inTime: null,
        writeTime: null,
        outTime: null
      }
    },
    writerUndo: null,
    writerDone: false,
    boundInfo: {
      top: 0, bottom: 0
    },
    
    //__________________RENDERER
    displayConfig: {
      x:0, y:0, w:0
    },
    renderSign: {
      target: -1,
      scale: 0,
      arr: [],
      name: null
    },
  },


  getters: { 

    TC(state){ // Test Client
      return state.test.client
    },
    TS(state){
      return state.stest.server
    },

    VIEWTYPE(state){
      if(state.winSize.vw < 550){
        if(state.winSize.vw/state.winSize.vh > 0.58){
          state.viewtype = 'small';
          return 'small'
        }else{
          state.viewtype = 'narrow';
          return 'narrow'
        }
      }else{
        if(state.winSize.vw/state.winSize.vh > 1){
          state.viewtype = 'wide';
          return 'wide'
        }else{
          state.viewtype = 'tablet';
          return 'tablet'
        }
      }
    },

    byType(state){
      return {
        _small: (state.viewtype === 'small'),
        _narrow: (state.viewtype === 'narrow'),
        _tablet: (state.viewtype === 'tablet'),
        _wide: (state.viewtype === 'wide'),
      }
    },

    SEQ(state){
      if(state.test.client.testSequence){
        return state.test.client.sequenceNow
      }else{
        return state.sequence
      }
    },

    FILES_IN_SERVER(state){
      return state.filesInServer
    },

    SIGNS(state){
      return state.signsArr
    },

    RENDER_Q(state){
      if(state.renderSign.target === -1){
        return false
      }else{
        return true
      }
    },

    NEW_PATHS(state){
      return state.writer.paths.length
    },

    WRITER_DONE(state){
      if(state.test.client.writerDone){
        return true
      }else{
        return state.writerDone
      }
    },

    USER_NAME(state){
      return state.writer.info.name
    }

  },


  mutations: {

    async PUT_INITDATA(state, recieved){
      console.log('$$$ request ...$m/PUT_INITDATA');
      state.writer.info.ip = recieved.ip;
      state.writer.info.uag = recieved.uag;
      state.connections = recieved.connections;
      state.filesInServer = recieved.signs;
    },

    moveTo(state, sequence){
      state.sequence = sequence;
    },

    pushToSigns(state, arr){
      state.signs.push(arr);
    },
    
    

    //__________________________ UI METHODS

    setBBC(state, {comp, hue}){
      state.desColor = ui.newBBC({comp, hue});
    },

    renderTrigger(state, i){
      state.renderSign.target = -1;
      state.renderSign.scale = 0;
      state.renderSign.arr = [];
      state.renderSign.name = null;
      if(i === -1){ // random
        let tango = ui.randomInt(0, state.loading.filesInServer);
        state.renderSign.scale = state.displayConfig.width / state.signs[tango].scale;
        state.renderSign.arr = state.signs[tango].paths;
        state.renderSign.name = state.signs[tango].name;
        state.renderSign.target = tango;
      }else{
        state.renderSign.scale = state.displayConfig.width / state.signs[i].scale;
        state.renderSign.arr = state.signs[i].paths;
        state.renderSign.name = state.signs[i].name;
        state.renderSign.target = i;
        console.log('asdfasfd', state.displayConfig.width, state.signs[i].scale, state.renderSign.scale);
      }
    },

    UNDO_PATH(state){
      if(state.writer.paths.length){
        state.writerUndo = state.writer.paths.length - 1;
      }
    },
  
    async SEND_PATHS(state){
      if(state.writer.paths.length){
        state.writer.info.writeTime = Date.now();
        const newSign = {
          svg: state.writer.svg,
          info: state.writer.info
        };
        const {data} = await axios.post('/push/paths', newSign);
        if(data.status === 200){
          state.modal = 2;
        }
      }else{
        console.log('draw signs first!');
      }
    },




    
    

  },
  actions: { //==============================
    async INITIATE({commit, state}){
      console.log("==== INITIATING REQUEST ====");
      state.writer.info.inTime = Date.now();
      if(state.test.server.init){
        commit('PUT_INITDATA', {
          ip: 'data.ip-test', 
          uag: 'data.uag-test',
          connections: 8080,
          signs: test.signsArr
        });
      }else{
        const {data} = await axios.post('/api/init', {userId});
        commit('PUT_INITDATA', data);
      }
    },

    async startSignLoad({state}){
      console.log('initiating_SIGNLOAD ...$a/startSignLoad');
      if(state.test.server.signLoad){
        state.signsArr = test.signFiles;
      }else{
        const {data} = await axios.get('/load/initial');
        console.log('initial data recieved:', data.arg.length);
        state.signsArr = data.arg;
      }
    }
  }
})