<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-textarea v-if="!options.attribute.Tooltip" :autosize="options.attribute.autosize"
                :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]">
    </a-textarea>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-textarea :autosize="options.attribute.autosize"
                  :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]"></a-textarea>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Input, Tooltip} from 'ant-design-vue'
  export default {
    name: "m-textarea",
    components: {
      AFormItem: Form.Item,
      ATextarea: Input.TextArea,
      ATooltip: Tooltip
    },
    props: {
      options: Object
    },
    mounted() {
      // console.log(this.options)
    }
  }
</script>

<style scoped>

</style>
