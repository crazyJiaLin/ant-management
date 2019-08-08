<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-date-picker v-if="!options.attribute.Tooltip" :size="options.attribute.size"
                   :disabled="options.attribute.disabled" :showTime="options.attribute.showTime"
                   :format="options.attribute.format" @change="options.methods ? options.methods.onChange : null"
                   :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id
                 ]"></a-date-picker>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-date-picker :size="options.attribute.size" :disabled="options.attribute.disabled"
                     :showTime="options.attribute.showTime"
                     :format="options.attribute.format" @change="options.methods ? options.methods.onChange : null"
                     :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id
                 ]"></a-date-picker>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, DatePicker, Tooltip} from 'ant-design-vue'
  export default {
    name: "m-date-picker",
    components: {
      AFormItem: Form.Item,
      ADatePicker: DatePicker,
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
  .ant-calendar-picker {
    width: 100% !important;
  }
</style>
