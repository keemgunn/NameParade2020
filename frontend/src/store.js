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
    
    //__________________UI
    bbcAppear: false,
    backBlue: true,
    desColor: [],
    aniTiming: animation.timing,
    circleAnime: {
      blockSize: null,
      colCount: null, rowCount: null, 
      fieldWidth: null, fieldHeight: null,
      wOff: null, hOff: null,
    },
    blocks: [], blockRendered: false,

    //___________________ ANIME TIMING
    bbcTiming: {
      loadingTransition: 300 +'ms',
      loadedTransition: 400 + 'ms',
      fadeBlackTransition: 800 +'ms',
      circleVelocity: 0.4,
      hueVelocity: 0.5,
      levelVelocity: 0.1,
    },
    cellTiming: {
      mounted: 0,
      typoRendered: 0,
      paradeTitleCellCount: 0,
      paradeTitleMounted: 0,
    },
    // displayTiming: {
    //   titleGraphicStart: false,
    // }, // ... DEPRECATED 


    //__________________PATHMAKER
    writer:{
      paths:[],
      pathGroup: null,
      svg: '',
      bounds: {
        width: 0, height: 0,
        x: 0, y: 0
      },
      bbc:[0, 0, 0, 0, 0, 0],
      info: {
        userId: userId,
        name: userId,
        ip: null,
        uag: null,
        inTime: null,
        writeTime: null
      }
    },
    writerUndo: null,
    writerDone: false,
    signSent: false,

    
    //__________________RENDERER
    renderStatus: 0, 
      // 1:mounted 2:rendered 3:pending
    signsArr: null,


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
    bs(state){
      return state.circleAnime.blockSize;
    },
    fw(state){
      return state.circleAnime.fieldWidth;
    },
    fh(state){
      return state.circleAnime.fieldHeight;
    },
    FIELD(state){
      return {
        'width': state.circleAnime.fieldWidth +'px',
        'height': state.circleAnime.fieldHeight +'px',
        'top': state.circleAnime.wOff +'px',
        'left': state.circleAnime.hOff +'px'
      }
    },
    wOff(state){
      return state.circleAnime.wOff
    },
    hOff(state){
      return state.circleAnime.hOff
    },
    blockCounts(state){
      return {
        c: state.circleAnime.colCount,
        r: state.circleAnime.rowCount
      }
    },
    CELL_TIMING(state){
      return state.cellTiming
    },
    CELL_MOUNTED(state){
      if(state.blocks.length === state.cellTiming.mounted){
        return true
      }else{
        return false
      }
    },
    TYPO_RENDERED(state){
      if(state.cellTiming.typoRendered === 22){
        return true
      }else{
        return false
      }
    },
    PARADE_TITLE_MOUNTED(state){
      if(state.cellTiming.paradeTitleMounted === state.cellTiming.paradeTitleCellCount){
        return true
      }else{
        return false
      }
    },

    FILES_IN_SERVER(state){
      return state.filesInServer
    },

    SIGNS(state){
      return state.signsArr
    },

    SIGNS_COUNT(state){
      return state.signsArr.length
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
    },

    SIGN_SENT(state){
      return state.signSent
    }



  },


  mutations: {

    bbcTrigger(state, bool){
      this.state.bbcAppear = bool;
    },
    setBBC(state, {comp, hue}){
      state.desColor = ui.newBBC({comp, hue});
      if(!state.writerDone){
        state.writer.bbc = state.desColor;
      }
    },

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
    
    UNDO_PATH(state){
      if(state.writer.paths.length){
        state.writerUndo = state.writer.paths.length - 1;
      }
    },
  
    async SEND_PATHS(state){
      if(state.test.server.sendPaths){
        state.signSent = true;
      }else{
        state.writer.info.writeTime = Date.now();
        let pathArr = [];
        let paths = state.writer.svg.split('<path d="');
        for(var i=1; i < paths.length; i++){
          const eachPath = paths[i].split('"');
          pathArr.push(eachPath[0]);
        }
        const newSign = {
          info: state.writer.info,
          bounds: state.writer.bounds,
          bbc: state.writer.bbc,
          pathArr,
        };
        const {data} = await axios.post('api/push', newSign);
        if(data.status === 200){
          state.signSent = true;
        }
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
        state.signsArr = test.signFiles.sort(() => {
          return Math.random() - Math.random();
        });
      }else{
        const {data} = await axios.get('/api/signs');
        console.log('initial data recieved:', data.arg.length);
        state.signsArr = data.arg.sort(() => {
          return Math.random() - Math.random();
        });
      }
    }
  }
})