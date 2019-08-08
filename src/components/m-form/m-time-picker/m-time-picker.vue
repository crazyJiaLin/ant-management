<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-time-picker v-if="!options.attribute.Tooltip" :size="options.attribute.size" :disabled="options.attribute.disabled"
                   :format="options.attribute.format" @change="options.methods ? options.methods.onChange : null"
                   :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id
                 ]"></a-time-picker>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-time-picker :size="options.attribute.size" :disabled="options.attribute.disabled"
                     :format="options.attribute.format" @change="options.methods ? options.methods.onChange : null"
                     :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id
                 ]"></a-time-picker>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, TimePicker, Tooltip} from 'ant-design-vue'
  export default {
    name: "m-time-picker",
    components: {
      AFormItem: Form.Item,
      ATimePicker: TimePicker,
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

<style scoped lang="less">
.ant-time-picker {
  width: 100%;
}
</style>
