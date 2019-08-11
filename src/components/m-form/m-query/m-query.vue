<template>
  <div class="query-wrap">
    <a-form :form="form" @submit="handleSearch">
      <a-row>
        <a-col v-for="(item,index) in children" :span="item.width" :offset="item.offset" :key="item.id">
          <m-input  v-if="item.type && (item.type.toLowerCase() === 'inputtext')" :options="item"></m-input>
          <m-textarea v-if="item.type && (item.type.toLowerCase() === 'textarea')" :options="item"></m-textarea>
          <m-time-picker v-if="item.type && (item.type.toLowerCase() === 'timepicker')" :options="item"></m-time-picker>
          <m-date-picker v-if="item.type && (item.type.toLowerCase() === 'datepicker')" :options="item"></m-date-picker>
          <m-range-picker v-if="item.type && (item.type.toLowerCase() === 'rangepicker')" :options="item"></m-range-picker>
          <m-month-picker v-if="item.type && (item.type.toLowerCase() === 'monthpicker')" :options="item"></m-month-picker>
          <m-input-number v-if="item.type && (item.type.toLowerCase() === 'inputnumber')" :options="item"></m-input-number>
          <m-input-search v-if="item.type && (item.type.toLowerCase() === 'inputsearch')" :options="item"></m-input-search>
          <m-cascader v-if="item.type && (item.type.toLowerCase() === 'cascader')" :options="item"></m-cascader>
          <m-radio v-if="item.type && (item.type.toLowerCase() === 'radio')" :options="item" @submitEvent="handleSubmitEvent"></m-radio>
          <m-checkbox v-if="item.type && (item.type.toLowerCase() === 'checkbox')" :options="item" @submitEvent="handleSubmitEvent"></m-checkbox>
          <m-button v-if="item.type && (item.type.toLowerCase() === 'button')" :options="item" @submitEvent="handleSubmitEvent"></m-button>
          <m-switch v-if="item.type && (item.type.toLowerCase() === 'switch')" :options="item" @submitEvent="handleSubmitEvent"></m-switch>
          <m-select v-if="item.type && (item.type.toLowerCase() === 'select')" :options="item"></m-select>
          <m-a v-if="item.type && (item.type.toLowerCase() === 'a')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-upload v-if="item.type && (item.type.toLowerCase() === 'upload')" :options="item" @submitEvent="handleSubmitEvent"/>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" class="query-btns">
          <a-button type="primary" @click="handleSearch">搜索</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import {Form, Button, Row, Col, Input, Icon} from 'ant-design-vue'
  import MInput from '@/components/m-form/m-input/m-input'
  import MTextarea from '@/components/m-form/m-textarea/m-textarea'
  import MTimePicker from '../m-time-picker/m-time-picker'
  import MDatePicker from '../m-date-picker/m-date-picker'
  import MRangePicker from '../m-range-picker/m-range-picker'
  import MMonthPicker from '../m-month-picker/m-month-picker'
  import MInputNumber from '../m-input-number/m-input-number'
  import MInputSearch from '../m-input-search/m-input-search'
  import MCascader from '../m-cascader/m-cascader'
  import MRadio from '../m-radio/m-radio'
  import MCheckbox from '../m-checkbox/m-checkbox'
  import MButton from '../m-button/m-button'
  import MSwitch from '../m-switch/m-switch'
  import MSelect from '../m-select/m-select'
  import MUpload from '../m-upload/m-upload'
  import MA from '@/components/m-a/m-a'
  export default {
    name: "m-query",
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      ARow: Row,
      ACol: Col,
      AButton: Button,
      AIcon: Icon,
      MInput,
      MTextarea,
      MTimePicker,
      MDatePicker,
      MRangePicker,
      MMonthPicker,
      MInputNumber,
      MInputSearch,
      MCascader,
      MRadio,
      MCheckbox,
      MButton,
      MSwitch,
      MSelect,
      MUpload,
      'm-a': MA
    },
    props: {
      options: Object
    },
    computed : {
      children() {
        return this.options.children
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
      }
    },
    methods: {
      // 点击搜索
      handleSearch (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          console.log('error', error);
          console.log('Received values of form: ', values);
          if(error) return;
          // 通知父组件，让父组件去修改table中的请求参数params值
          this.$emit('search', values);
        });
      },
      handleReset (e) {
        // this.form.resetFields();
        this.form.resetFields();
      },
      // 子组件中带动作的，需要template对配置json数据进行操作
      handleSubmitEvent (value) {
        this.$emit('submitEvent', value)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "m-query";
</style>
