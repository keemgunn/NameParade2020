<template>
<div class="loader-wrapper" :style="wrapper">

<div class="loader" :class="byType">

</div>


</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

const name = "Loader";
export default {
  name,
  data() { return {
    name: name,
    fakeAmount: 3,
    pushIndex: 0,
  }},
  computed: {
    ...mapState([ 
        'aniTiming',
      ]),
    ...mapGetters([ 
        'VIEWTYPE', 
        'byType', 
        'SEQ',
      ]),
      AT: function(){
        return this['aniTiming'][name]
      },
    wrapper: function(){
      if(this.SEQ === 0){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '46vh',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '46vh',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '50vh',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '50vh',
          }
        }
      }else if(this.SEQ === 1){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '38vh',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '38vh',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '40vh',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '40vh',
          }
        }
      }else if(this.SEQ === 2){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '22vw',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '22vw',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '20vw',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '5vw',
          }
        }
      }else if(this.SEQ === 3){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '12vw',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '12vh',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '20vw',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '5vw',
          }
        }
      }else{
        return {'height': '0vh'}
      }
    }
  },
  methods: {
    ...mapMutations([
        'moveTo',
      ]),


  },
  watch: {

  },
  created() {

  },
  mounted() {
    
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.loader-wrapper{
  position: relative; top: 0; left: 0;
  width: 100vw; height: 100vh;
  transition: 500ms;
  transition-timing-function: cubic-bezier(0,0,.17,1);
  background-color: rgba(230, 12, 55, 0.315);
  .loader{
    position: absolute; bottom: 0px; left: 0;
    // background-color: rgba(255, 255, 255, 0.185);
  }

}



</style>