<template>
<div id="contents">

<Canvas 
  v-if="0"
  ref="childCanvas"
/>

<sqTest
  v-if="1"
/>

<Blot
  v-if="0"
/>

</div>
</template>



<script>
import Canvas from './canvas/Canvas'
import sqTest from './canvas/sqTest'
import Blot from './canvas/Blot'


export default {
  name: "Contents",
  components: { Canvas, sqTest, Blot},
  props: [

  ],
  data() { return {

  }},
  computed: {

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






</style>