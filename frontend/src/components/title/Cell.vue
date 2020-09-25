<template>
<div id="cell-wrapper">
{{block}}
{{index}}



</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';

const name ="";
export default {
  name,
  components: { },
  props: [
    'block', 'index'
  ],
  data() { return {
    coord: []
  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),


  },
  methods: {
    ...mapMutations([]),

    
  },
  created() {
    this.coord = [this.block[1],this.block[2]]
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
#cell-wrapper{
  position: relative;
  top: 10%; left: 10%;
  width: 80%; height: 80%;
  color: dimgray;
  background-color: skyblue;
}





</style>