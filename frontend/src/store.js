import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import randomstring from 'randomstring';

// const resourceHost = 'http://localhost:3000'

//_____ userID generate
let userId = randomstring.generate({
  length: 12,
  charset: 'alphanumeric'
});

//_____ color variations for BBC
const colorHarmonies = [
  [-30, 30, -40, +40, 0],
  [-35, 35, -45, +45, 0],
  [-30, 30, -40, +40, 180],
  [0, 0, 180, 180, 180],
  [-20, +20, +180, +180, 0]
]

//_____ random methods for UIs
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // 최댓값은 제외, 최솟값은 포함
} 

//_____ names of sequence state
const seqStates = {
  0: 'loading-init',
  1: 'loading-done',
  2: 'writer-des',
  3: 'writer-pm',
  4: 'parade-'
};

//_____ import test configurations
import signs_test from './test/signs_test.json';
const test = {
  client: {
    loading: true, 
    testSequence: true, 
    renderWhenPathsAreReady: true,
    
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


Vue.use(Vuex)
export default new Vuex.Store({
  state: { //================================
    test: test,
    winSize: {
      vw: null,
      vh: null,
    }, viewtype: null,
    sequence: 0,
    seqName: null,

    loadedArr: [],
    loading: {
        fakeOffset: 0,
        faker: 100 + 150,
      filesInServer: 0
    },
    colorScheme: [],

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
  getters: { //==============================

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
        state.seqName = seqStates[state.test.client.sequenceNow];
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
      if(state.test.client.renderWhenPathsAreReady){
        if(state.renderSign.arr.length){
          return true
        }else{
          return false
        }
      }else{
        if(state.renderSign.target === -1){
          return false
        }else{
          return true
        }
      }
    },

    NEW_PATHS(state){
      return state.writer.paths.length
    },

    BBC(state){
      return state.colorScheme
    },


    






  },
  mutations: { //============================

    //__________________________ DATA METHODS

    async PUT_INITDATA(state, recieved){
      console.log('$$$ request ...$m/PUT_INITDATA');
        state.loading.fakeOffset += 30;
      state.writer.info.ip = recieved.ip;
      state.writer.info.uag = recieved.uag;
      if(state.test.server.filesInServer){
        state.loading.filesInServer = signs_test.length; 
      }else{
        const {data} = await axios.get('/load/file-count');
        state.loading.filesInServer = data.jsonCount; 
      }
    },

    moveTo(state, sequence){
      state.sequence = sequence;
    },

    fakeOff(state, amount){
      state.loading.fakeOffset += amount;
    },

    pushToSigns(state, arr){
      state.signs.push(arr);
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
      let harmonies, stdColor;
      if(comp<0){
        harmonies = colorHarmonies[getRandomInt(0, colorHarmonies.length)];
      }else{
        harmonies = colorHarmonies[comp]
      }
      if(hue<0){
        stdColor = getRandomInt(0, 361);
      }else{
        stdColor = hue
      }
      state.colorScheme = [
        stdColor,
        stdColor + harmonies[0],
        stdColor + harmonies[1],
        stdColor + harmonies[2],
        stdColor + harmonies[3],
        stdColor + harmonies[4]
      ]
    },

    renderTrigger(state, i){
      state.renderSign.target = -1;
      state.renderSign.scale = 0;
      state.renderSign.arr = [];
      state.renderSign.name = null;
      if(i === -1){ // random
        let tango = getRandomInt(0, state.loading.filesInServer);
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
        state.loadedArr = signs_test;
      }else{
        const {data} = await axios.get('/load/initial');
        console.log('initial data recieved: ',data.length);
        state.loadedArr = data.arg;
      }
    }



    
  }
})