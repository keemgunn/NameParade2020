import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

// const resourceHost = 'http://localhost:3000'



const colorHarmonies = [
  [-30, 30, -40, +40, 0],
  [-35, 35, -45, +45, 0],
  // [-30, 30, -40, +40, 180],
  [0, 0, 180, 180, 180],
  [-20, +20, +180, +180, 0]
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}



Vue.use(Vuex)
export default new Vuex.Store({
  state: { //================================
    test: false,
    // test: true,
    modal: "something",

    winSize: {
      vw: null,
      vh: null,
    },
    
    colorScheme: [],

    pathStrokes: 0,





  },
  getters: { //==============================
    
    BBC(state){
      return state.colorScheme
    }
    






  },
  mutations: { //============================

    setBBC(state, {comp, hue}){
      console.log(comp);
      console.log(hue);
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
    }
  


    
    

  },
  actions: { //==============================
    
   
    

  }
})