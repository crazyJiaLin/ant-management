<template>
  <div :style="options.style" v-html="options.html">
    {{options.text}}
  </div>
</template>

<script>
  export default {
    name: "m-div",
    props: {
      options: Object
    }
  }
</script>

<style scoped>

</style>
