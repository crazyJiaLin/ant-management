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
        // 如果是reset按钮的话，让html-type来解决重置情况会出现bug,
        // 所以这里判断是否是重置按钮，如果是重置按钮的话提交给父组件去操作
        if(this.options.attribute.htmlType === 'reset') {
          this.$emit('reset', this.options)
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
