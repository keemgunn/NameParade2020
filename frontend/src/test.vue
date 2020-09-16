<template>
<div id="test" 
@mousedown="moveTrigger($event)"
@mouseup="mover = false"
@mouseleave="mover = false"
@mousemove="move($event)"
:style="{'top':X, 'left':Y}"
>
  vw: {{winSize.vw}} <br>
  vh: {{winSize.vh}} <br>
  viewtype: {{viewtype}} <br>
  modal: {{modal}} <br>
  justLoaded: {{loading.justLoaded}} <br>
  loading: {{LOADING_PROGRESS * 100}}% <br>
  BBC:<br>{{BBC}}<br>
  
  <br>
  mover: {{mover}} <br>
  msg00: {{msg00}} <br>
  msg01: {{msg01}} <br>
  msg02: {{msg02}} <br>
  msg03: {{msg03}} <br>
  msg04: {{msg04}} <br>
  <button @click="setBBC({comp:-1, hue:-1})">test A</button><br>
  <button @click="setBBC({comp:1, hue:3})">test B</button><br>
  <button @click="progressDone()">test C</button><br>
  <button>test D</button><br>
  <button>test E</button><br>
</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: "test",
  components: { },
  props: [

  ],
  data() { return {
    mover:false,
    coord: { x:0, y:0 },
    start: { x:0, y:0 },
    delta: { x:0, y:0 },
    msg00: null,
    msg01: null,
    msg02: null,
    msg03: null,
    msg04: null,
  }},
  computed: {
    ...mapState(['viewtype', 'modal', 'winSize', 'loading', 'writer']),
    ...mapGetters(['BBC', 'byType', 'LOADING_PROGRESS']),
    X: function(){
      return this.coord.x + 'px'
    },
    Y: function(){
      return this.coord.y + 'px'
    }
  },
  methods: {
    ...mapMutations(['setBBC']),
    progressDone(){
      this.$store.state.loading.filesLoaded += 1;
    },
    moveTrigger(event){
      this.mover = true;
      this.start.x = event.pageX;
      this.start.y = event.pageY;
    },
    move(event){
      if(this.mover){
        this.coord.x = event.pageX - this.start.x;
        this.coord.y = event.pageY - this.start.y;
      }
    }
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
  #test {
    position: fixed; top: 0px; left: 0px;
    width: 100px; height: fit-content;
    padding: 3px;
    border: solid 1px white;
    font-family: sans-serif;
    font-size: 13px;
    background-color: rgba(0, 0, 0, 0.753);
    opacity: 0.7;
  }#test:hover{
    cursor: pointer;
  }

</style>