<template>
<div class="loader">
<h1>{{VIEWTYPE}}</h1>



</div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  name: "Loader",
  components: { },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapGetters(['VIEWTYPE'])
  },
  methods: {
    
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
.loader{
  position: absolute; top: 0; left: 4%;
  width: 92%;
  height: 200px;
  background-color: fuchsia;
}





</style>