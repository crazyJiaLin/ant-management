<template>
  <pre :style="options.style">
    {{options.text}}
  </pre>
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
