<template>
  <a-button :disabled="options.attribute.disabled" :loading="options.attribute.loading"
            :size="options.attribute.size" :type="options.attribute.type"
            :icon="options.attribute.icon" @click="onClick">
    {{options.text}}
  </a-button>
</template>

<script>
  import {Button} from 'ant-design-vue'
  export default {
    name: "m-button",
    components : {
      AButton: Button
    },
    props: {
      options: Object
    },
    methods : {
      onClick () {
        // console.log(this.options.attribute.inner)
        this.$emit('submitEvent', this.options.attribute.inner)
      }
    }
  }
</script>

<style scoped>

</style>
