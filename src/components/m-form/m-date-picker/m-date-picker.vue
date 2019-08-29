<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-date-picker v-if="!options.attribute.Tooltip" :size="options.attribute.size" :locale="locale"
                   :disabled="options.attribute.disabled" :showTime="options.attribute.showTime"
                   :format="options.attribute.format" @change="options.methods ? options.methods.onChange : null"
                   :placeholder="options.attribute.placeholder" v-decorator="[
                     options.id
                 ]"></a-date-picker>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-date-picker :size="options.attribute.size" :disabled="options.attribute.disabled"
                     :showTime="options.attribute.showTime" :locale="locale"
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
    data() {
      return {
        locale : {
          "lang": {
            "placeholder": "请选择",
            "rangePlaceholder": ["开始日期", "结束日期"],
            "today": "Today",
            "now": "今天",
            "backToToday": "回到今天",
            "ok": "确认",
            "clear": "清空",
            "month": "月",
            "year": "年",
            "timeSelect": "选择时间",
            "dateSelect": "选择日期",
            "monthSelect": "选择月份",
            "yearSelect": "选择年份",
            "decadeSelect": "Choose a decade",
            "yearFormat": "YYYY",
            "dateFormat": "M/D/YYYY",
            "dayFormat": "D",
            "dateTimeFormat": "M/D/YYYY HH:mm:ss",
            "monthFormat": "MMMM",
            "monthBeforeYear": true,
            "previousMonth": "Previous month (PageUp)",
            "nextMonth": "Next month (PageDown)",
            "previousYear": "Last year (Control + left)",
            "nextYear": "Next year (Control + right)",
            "previousDecade": "Last decade",
            "nextDecade": "Next decade",
            "previousCentury": "Last century",
            "nextCentury": "Next century"
          },
          "timePickerLocale": {
            "placeholder": "Select time"
          }
        }
      }
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
