<template>
<div id="test">


  <h1>TEST</h1>

  vw: {{winSize.vw}} <br>
  vh: {{winSize.vh}} <br>
  viewtype: {{viewtype}} <br>
  modal: {{modal}} <br>
  justLoaded: {{loading.justLoaded}} <br>
  loading: {{LOADING_PROGRESS * 100}}% <br>
  BBC:<br>{{BBC}}<br>
  writer.scopeSize:{{writer.scopeSize}}
  writer.pixelRatio:{{writer.pixelRatio}}
  




  <br>
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
    msg00: null,
    msg01: null,
    msg02: null,
    msg03: null,
    msg04: null,
  }},
  computed: {
    ...mapState(['viewtype', 'modal', 'winSize', 'loading', 'writer']),
    ...mapGetters(['BBC', 'byType', 'LOADING_PROGRESS']),
  },
  methods: {
    ...mapMutations(['setBBC']),
    progressDone(){
      this.$store.state.loading.filesLoaded += 1;
    },
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
    position: fixed; top: 10px; left: 3px;
    width: 100px; height: fit-content;
    padding: 3px;
    border: solid 1px white;
    font-family: sans-serif;
    font-size: 13px;
    background-color: rgba(0, 0, 0, 0.753);
    opacity: 0.8;
  }
</style>