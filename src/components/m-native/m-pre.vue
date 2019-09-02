<template>
  <pre :style="options.style" v-html="options.html"></pre>
</template>

<script>
  export default {
    name: "m-pre",
    props: {
      options: Object
    }
  }
</script>

<style scoped>

</style>
