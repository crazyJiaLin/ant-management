<template>
  <div>
    template
    <m-test></m-test>
  </div>
</template>

<script>
  import MTest from '@/components/m-test/m-test'
  export default {
    name: "view-template",
    components: {
      MTest
    },
    watch : {
      '$store.state.curMenu' (newVal, oldVal) {
        console.log('当前menuid', newVal)
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
</style>
