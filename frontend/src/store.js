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

    //__________________UI
    desColor: [],
    aniTiming: animation.timing,

    //__________________LOADER
    loadedArr: [],
    loading: {
      fakeOffset: 0,
      faker: 100 + 150,
      filesInServer: 0
    }, 
    
    //__________________PATHMAKER
    writer:{
      paths:[],
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
    
    //__________________RENDERER
    signs: [],
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
      return state.loading.filesInServer
    },
    LOADING_PROGRESS(state, getters){
      let result;
      if(getters.SEQ === 0){
        result = (state.signs.length + state.loading.fakeOffset) / (state.loading.filesInServer + state.loading.faker);
        if(result >= 1){
          result = 1;
        }
        if(state.test.client.loading){ 
          result = (state.test.client.loadingAmount)/100 
        }
      }else{
        result = 1;
      }
      return result
    },

    SIGNS(state){
      return state.signs
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
  },


  mutations: {

    async PUT_INITDATA(state, recieved){
      console.log('$$$ request ...$m/PUT_INITDATA');
        state.loading.fakeOffset += 30;
      state.writer.info.ip = recieved.ip;
      state.writer.info.uag = recieved.uag;
      if(state.test.server.filesInServer){
        state.loading.filesInServer = test.signs.length; 
      }else{
        const {data} = await axios.get('/load/file-count');
        state.loading.filesInServer = data.jsonCount; 
      }
    },

    moveTo(state, sequence){
      state.sequence = sequence;
    },

    pushToSigns(state, arr){
      state.signs.push(arr);
    },
    
    fakeOff(state, amount){
      state.loading.fakeOffset += amount;
    },

    

    async SEND_PATHS(state){
      if(state.writer.paths.length){
        state.writer.info.writeTime = Date.now();
        const {data} = await axios.post('/push/paths', {writer: state.writer});
        if(data.status === 200){
          state.modal = 2;
        }
      }else{
        console.log('draw signs first!');
      }
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



    

    CHECK_FILES(){

    },

    LOAD_FILES(){

    },
  
    SEND_PATH(){

    }




    
    

  },
  actions: { //==============================
    async INITIATE({commit, state}){
      console.log("==== INITIATING REQUEST ====");
      commit('fakeOff', 20);
      state.writer.info.inTime = Date.now();
      if(state.test.server.init){
        commit('PUT_INITDATA', {ip: 'data.ip', uag: 'data.uag'});
      }else{
        const {data} = await axios.post('/init/enter', {userId});
        commit('PUT_INITDATA', {ip: data.ip, uag: data.uag});
      }
    },

    async startSignLoad({commit, state}){
      console.log('initiating_SIGNLOAD ...$a/startSignLoad');
      commit('fakeOff', 20);
      if(state.test.server.signLoad){
        state.loadedArr = test.signs;
      }else{
        const {data} = await axios.get('/load/initial');
        console.log('initial data recieved: ',data.length);
        state.loadedArr = data.arg;
      }
    }

  }
})