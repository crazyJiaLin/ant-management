<template>
  <div :style="options.attribute.wrapperStyle">
      <a-button :disabled="options.attribute.disabled" :loading="options.attribute.loading"
                :size="options.attribute.size" :type="options.attribute.type"
                :html-type="options.attribute.htmlType"
                :icon="options.attribute.icon" @click="onClick">
        {{options.text}}
      </a-button>
  </div>
</template>

<script>
  import {Button} from 'ant-design-vue'
  export default {
    name: "m-button",
    components : {
      AButton: Button,
    },
    props: {
      options: Object,
    },
    methods : {
      onClick () {
        if(this.options.onClick) {
          let onClick = $eval(this.options.onClick);
          onClick(this);  //吧this传出去
        }
        // console.log(this.options.attribute.inner)
        (this.options.attribute && this.options.attribute.inner) &&
        this.$emit('submitEvent', this.options.attribute.inner)
      }
    }
  }
</script>

<style scoped>

</style>
