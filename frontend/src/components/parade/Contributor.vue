<template>
<div id="contributor-wrapper">

  <div id="header-wrapper">
    <div class="header" :class="byType">
      <Header/>
    </div>
  </div>




</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';
import Header from './contributor/Header';


export default {
  name:"Contributor",
  components: { Header,  },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapState([]),
    ...mapGetters(['VIETYPE', 'byType']),


  },
  methods: {
    ...mapMutations([]),

    
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
#contributor-wrapper{
  position: relative;
  width: 100%; height: 700px;
  background-color: rgba(0, 191, 255, 0.445);
}
#header-wrapper{
  .header{
    position: relative; top: 0; left: 0;
    width: 100%; 
    background-color: palegreen;
  }._small{
    height: 100px;

  }._narrow{
    height: 20vw;
    
  }._tablet{

  }._wide{

  }


}






</style>