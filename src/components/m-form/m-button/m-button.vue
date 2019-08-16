<template>
  <a-col :span="options.width" :offset="options.offset">
    <a-button :disabled="options.attribute.disabled" :loading="options.attribute.loading"
              :size="options.attribute.size" :type="options.attribute.type"
              :html-type="options.attribute.htmlType"
              :icon="options.attribute.icon" @click="onClick">
      {{options.text}}
    </a-button>
  </a-col>
</template>

<script>
  import {Button, Col} from 'ant-design-vue'
  export default {
    name: "m-button",
    components : {
      AButton: Button,
      ACol: Col
    },
    props: {
      options: Object
    },
    methods : {
      onClick () {
        // console.log(this.options.attribute.inner)
        (this.options.attribute && this.options.attribute.inner) &&
        this.$emit('submitEvent', this.options.attribute.inner)
      }
    }
  }
</script>

<style scoped>

</style>
