<template>
<div id="path-view">

{{pathData}}

</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';


export default {
  name: "PathView",
  components: { },
  props: [
    'pathData'
  ],
  data() { return {
    signsCount: 0,

  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),


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






</style>