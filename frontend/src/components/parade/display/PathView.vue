<template>
<div id="path-view">

{{data}}


</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';


export default {
  name: "PathView",
  components: { },
  props: [
    'data'
  ],
  data() { return {

  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),


  },
  methods: {
    ...mapMutations([]),

    
  },
  created() {
    console.log(this.data);
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






</style>