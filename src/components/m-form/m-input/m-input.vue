<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-input v-if="!options.attribute.Tooltip" :placeholder="options.attribute.placeholder"
             :size="options.attribute.size" :disabled="options.attribute.disabled"
             :allowClear="options.attribute.allowClear" :addonBefore="options.attribute.addonBefore"
             :addonAfter="options.attribute.addonAfter" v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]"/>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-input :placeholder="options.attribute.placeholder" :size="options.attribute.size"
               :disabled="options.attribute.disabled"
               :allowClear="options.attribute.allowClear" :addonBefore="options.attribute.addonBefore"
               :addonAfter="options.attribute.addonAfter" v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]"/>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Input, Tooltip} from 'ant-design-vue'
  export default {
    name: "m-input",
    components: {
      AFormItem: Form.Item,
      AInput: Input,
      ATooltip: Tooltip
    },
    props: {
      options: Object
    },
    mounted() {
      console.log(this.options)
    }
  }
</script>

<style scoped>

</style>
