import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import randomstring from 'randomstring';

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

let userId = randomstring.generate({
  length: 12,
  charset: 'alphanumeric'
});

const test = {
  client: {
    // loading: true,
    // MODAL: true,
      modal:0,
    

  },
  foo: 'bar',
  modal: true,
}

Vue.use(Vuex)
export default new Vuex.Store({
  state: { //================================
    test: test,
    
    winSize: {
      vw: null,
      vh: null,
    },
    viewtype: null,
    modal: 0,
      // 0:loading, 1:writer, 2:parade, 3:story

    loadedArr: [],
    loading: {
      processing: 0, // 1:loading, 2:done
        fakeOffset: 0,
        faker: 200 + 200,
      filesInServer: 0
    },

    colorScheme: [],

    writer:{
      scale: 0,
      paths:[],
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
    SIGNS: [],


  },
  getters: { //==============================

    MODAL(state){
      if(state.test.client.MODAL){
        return state.test.client.modal
      }else{
        return state.modal
      }
    },

    FILES_IN_SERVER(state){
      return state.loading.filesInServer
    },
    FILES_LOADED(state){
      return state.SIGNS.length
    },
    LOADING_PROGRESS(state){
      let result;
      if(state.loading.processing < 2){
        result = (state.SIGNS.length + state.loading.fakeOffset) / (state.loading.filesInServer + state.loading.faker);
          if(state.test.client.loading){ 
            result = ( 100 )/100 
          }
      }else{
        result = ( 100 )/100
      }return result
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

    //__________________________ INITIATING METHODS
    async PUT_INITDATA(state, recieved){
      console.log('$$$ request ...$m/PUT_INITDATA');
        state.loading.fakeOffset += 30;
      state.writer.info.ip = recieved.ip;
      state.writer.info.uag = recieved.uag;
      console.log(state.writer.info);
      const {data} = await axios.get('/load/file-count');
      state.loading.filesInServer = data.jsonCount; 
        // -- trigger @App/ FILES_IN_SERVER
    },


    async UPDATE_SIGNS(state, amount){
      const {data} = await axios.post('/load/update', {amount});
      state.loadedArr = data;
      this.pushToSIGNS();
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
      const {data} = await axios.post('/init/enter', {userId});
      state.writer.info.inTime = Date.now();
      commit('PUT_INITDATA', {ip: data.ip, uag: data.uag});
    },

    async startSignLoad({state}){
      console.log('initiating_SIGNLOAD ...$a/startSingLoad');
        state.loading.fakeOffset += 40;
      const {data} = await axios.get('/load/initial');
      console.log(data);
      state.loadedArr = data.arg;
    }



    
  }
})