import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

// const resourceHost = 'http://localhost:3000'
Vue.use(Vuex)
export default new Vuex.Store({
  state: { //================================
    test: false,
    // test: true,
    
    modal: "something",

    backBlurColors: [
      {r: 45, g: 74, b: 227},
      {r: 250, g: 255, b: 89},
      {r: 255, g: 104, b: 248},
      {r: 44, g: 209, b: 252},
      {r: 54, g: 233, b: 84},
    ],

    pathStrokes: 0,





  },
  getters: { //==============================
    
    BBC(state){
      if(state.pathStrokes){
        return [
          {r: 45, g: 74, b: 227},
          {r: 250, g: 255, b: 89},
          {r: 255, g: 104, b: 248},
          {r: 44, g: 209, b: 252},
          {r: 54, g: 233, b: 84},
        ]
      }else{
        return state.backBlurColors
      }
    }
    






  },
  mutations: { //============================

  


    
    

  },
  actions: { //==============================
    
   
    

  }
})