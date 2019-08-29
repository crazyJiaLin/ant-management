<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-month-picker v-if="!options.attribute.Tooltip" :size="options.attribute.size"
                   :disabled="options.attribute.disabled"
                   :format="options.attribute.format" @change="options.methods ? options.methods.onChange : null"
                   :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id
                 ]"></a-month-picker>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-month-picker :size="options.attribute.size" :disabled="options.attribute.disabled"
                     :format="options.attribute.format" @change="options.methods ? options.methods.onChange : null"
                     :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id
                 ]"></a-month-picker>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  moment.locale('zh-cn');
  import {Form, DatePicker, Tooltip} from 'ant-design-vue'
  export default {
    name: "m-date-picker",
    components: {
      AFormItem: Form.Item,
      AMonthPicker: DatePicker.MonthPicker,
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
