import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// const resourceHost = 'http://localhost:3000'

const colorHarmonies = [
  [-30, 30, -40, +40, 0],
  [-35, 35, -45, +45, 0],
  [-30, 30, -40, +40, 180],
  [0, 0, 180, 180, 180],
  [-20, +20, +180, +180, 0]
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
} //최댓값은 제외, 최솟값은 포함


Vue.use(Vuex)
export default new Vuex.Store({
  state: { //================================
    test: true,
    testModal: true,

    viewtype: null,
    modal: "loading",

    winSize: {
      vw: null,
      vh: null,
    },
    
    loading: {
      justLoaded: 0,
      filesLoaded: 0,
      fakeOffset: 0,
        filesToLoad: 0,
        faker: 0
    },

    colorScheme: [],

    writer:{
      scopeSize: {width:0, height:0},
      relocation: {x:0, y:0},
      pixelRatio: 0,
      paths:[],
      info: {
        name: null,
        ip: null,
        uag: null
      }
    }


  },
  getters: { //==============================

    VW(state){
      return state.winSize.vw
    },
    VH(state){
      return state.winSize.vh
    },
    
    FILES_TO_LOAD(state){
      return state.loading.filesToLoad
    },
    LOADING_PROGRESS(state){
      if(state.test){
        return (100) / 100
      }else{
        return ((state.loading.filesLoaded + state.loading.fakeOffset) / (state.loading.filesToLoad + state.loading.faker))
      }
    },


    BBC(state){
      return state.colorScheme
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
    






  },
  mutations: { //============================

    async PUT_INITDATA(state, recieved){
      console.log('$$$ request ...$mutation/PUT_INITDATA');
      state.writer.info.ip = recieved.ip;
      state.writer.info.uag = recieved.uag;
      console.log(state.writer.info);
      const {data} = await axios.get('/init/request-data-info');
      state.loading.filesToLoad = data.jsonCount;
    },

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




    

    CHECK_FILES(){

    },

    LOAD_FILES(){

    },
  
    SEND_PATH(){

    }




    
    

  },
  actions: { //==============================
    async INITIATE({commit}){
      console.log("==== INITIATING REQUEST ====");
      const {data} = await axios.post('/init/enter', {userId: 'writer'});
      commit('PUT_INITDATA', {ip: data.ip, uag: data.uag});
    },
   
    

  }
})