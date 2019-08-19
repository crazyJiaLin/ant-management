<template>
  <a :href="options.href" :style="options.style"
     :target="options._blank ? '_blank' : '_self'">
    <a-icon v-if="options.icon" :type="options.icon"></a-icon>
    {{options.text}}
  </a>
</template>

<script>
  import {Icon} from 'ant-design-vue'
  export default {
    name: "m-a",
    components : {
      AIcon : Icon
    },
    props: {
      options: Object
    }
  }
</script>

<style scoped>

</style>
