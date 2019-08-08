<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-input-number v-if="!options.attribute.Tooltip" :placeholder="options.attribute.placeholder"
                    :size="options.attribute.size" :disabled="options.attribute.disabled"
                    :max="options.attribute.max" :min="options.attribute.min"
                    :formatter="value => `${options.attribute.formatter} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]"/>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-input-number :placeholder="options.attribute.placeholder"
                      :size="options.attribute.size" :disabled="options.attribute.disabled"
                      :max="options.attribute.max" :min="options.attribute.min"
                      :formatter="value => `${options.attribute.formatter} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]"/>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, InputNumber, Tooltip} from 'ant-design-vue'
  export default {
    name: "m-input-number",
    components: {
      AFormItem: Form.Item,
      AInputNumber: InputNumber,
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

<style scoped lang="less">
.ant-input-number{
  width: 100%
}
</style>
