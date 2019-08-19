<template>
    <a-row>
      <a-col v-for="(item,index) in formList" :span="item.width" :offset="item.offset" :key="item.id">
        <m-input  v-if="item.type && (item.type.toLowerCase() === 'inputtext')" :options="item"></m-input>
        <m-textarea v-if="item.type && (item.type.toLowerCase() === 'textarea')" :options="item"></m-textarea>
        <m-time-picker v-if="item.type && (item.type.toLowerCase() === 'timepicker')" :options="item"></m-time-picker>
        <m-date-picker v-if="item.type && (item.type.toLowerCase() === 'datepicker')" :options="item"></m-date-picker>
        <m-range-picker v-if="item.type && (item.type.toLowerCase() === 'rangepicker')" :options="item"></m-range-picker>
        <m-month-picker v-if="item.type && (item.type.toLowerCase() === 'monthpicker')" :options="item"></m-month-picker>
        <m-input-number v-if="item.type && (item.type.toLowerCase() === 'inputnumber')" :options="item"></m-input-number>
        <m-input-search v-if="item.type && (item.type.toLowerCase() === 'inputsearch')" :options="item"></m-input-search>
        <m-input-group v-if="item.type && (item.type.toLowerCase() === 'inputgroup')" :options="item" @change="onInputGroupChange"></m-input-group>
        <m-cascader v-if="item.type && (item.type.toLowerCase() === 'cascader')" :options="item"></m-cascader>
        <m-radio v-if="item.type && (item.type.toLowerCase() === 'radio')" :options="item" @submitEvent="handleSubmitEvent"></m-radio>
        <m-checkbox v-if="item.type && (item.type.toLowerCase() === 'checkbox')" :options="item" @submitEvent="handleSubmitEvent"></m-checkbox>
        <m-button v-if="item.type && (item.type.toLowerCase() === 'button')" :options="item" @submitEvent="handleSubmitEvent"></m-button>
        <m-switch v-if="item.type && (item.type.toLowerCase() === 'switch')" :options="item" @submitEvent="handleSubmitEvent"></m-switch>
        <m-select v-if="item.type && (item.type.toLowerCase() === 'select')" :options="item"></m-select>
        <m-a v-if="item.type && (item.type.toLowerCase() === 'a')" :options="item" @submitEvent="handleSubmitEvent"/>
        <m-upload v-if="item.type && (item.type.toLowerCase() === 'upload')" :options="item" @submitEvent="handleSubmitEvent"/>
        <m-badge v-if="item.type && (item.type.toLowerCase() === 'badge')" :options="item" @submitEvent="handleSubmitEvent"/>
      </a-col>
    </a-row>
</template>

<script>
  import {Row, Col} from 'ant-design-vue'
  import MInput from '@/components/m-form/m-input/m-input'
  import MInputNumber from '@/components/m-form/m-input/m-input-number'
  import MInputSearch from '@/components/m-form/m-input/m-input-search'
  import MInputGroup from '@/components/m-form/m-input/m-input-group'
  import MTextarea from '@/components/m-form/m-input/m-textarea'

  import MTimePicker from '@/components/m-form/m-date-picker/m-time-picker'
  import MDatePicker from '@/components/m-form/m-date-picker/m-date-picker'
  import MRangePicker from '@/components/m-form/m-date-picker/m-range-picker'
  import MMonthPicker from '@/components/m-form/m-date-picker/m-month-picker'

  import MSelect from '@/components/m-form/m-select/m-select'
  import MCascader from '@/components/m-form/m-select/m-cascader'

  import MRadio from '@/components/m-form/m-radio/m-radio'
  import MCheckbox from '@/components/m-form/m-checkbox/m-checkbox'

  import MButton from '@/components/m-form/m-button/m-button'
  import MSwitch from '@/components/m-form/m-switch/m-switch'

  import MUpload from '@/components/m-form/m-upload/m-upload'
  import MA from '@/components/m-native/m-a'
  import MBadge from '@/components/m-badge/m-badge'
  export default {
    name: "m-form-content",
    components: {
      ARow: Row,
      ACol: Col,
      MInput, MTextarea, MInputGroup, MTimePicker, MDatePicker, MRangePicker, MMonthPicker,
      MInputNumber, MInputSearch, MCascader, MRadio, MCheckbox, MButton,
      MSwitch, MSelect, MUpload, MBadge,
      'm-a': MA
    },
    props: {
      options: Object,
      formList: Array
    },
    computed : {
      // children() {
      //   return this.options.children
      // }
    },
    data () {
      return {
      }
    },
    methods: {
      onInputGroupChange (name, value) {
        // console.log('input-group change', name, value)
        this.$emit('inputGroupChange', name, value);
      },
      // 子组件中带动作的，需要template对配置json数据进行操作
      handleSubmitEvent (value) {
        this.$emit('submitEvent', value)
      }
    },
    mounted() {
      // console.log(this.options)
    }
  }
</script>

<style scoped>

</style>
