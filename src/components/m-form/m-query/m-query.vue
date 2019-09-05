<template>
  <div class="query-wrap">
    <a-form :form="form" @submit="handleSearch">
      <a-row>
        <a-col v-for="(item,index) in options.children" v-if="searchBtn.showCollapse ? (expand ? true : (index < 2)) : true"
               :span="item.width" :offset="item.offset" :key="item.id">
          <m-input v-if="item.type && (item.type.toLowerCase() === 'inputtext')" :options="item"></m-input>
          <m-textarea v-if="showComponent(item, 'textarea')" :options="item"></m-textarea>
          <m-time-picker v-if="showComponent(item, 'timepicker')" :options="item"></m-time-picker>
          <m-date-picker v-if="showComponent(item, 'datepicker')" :options="item"></m-date-picker>
          <m-range-picker v-if="showComponent(item, 'rangepicker')" :options="item"></m-range-picker>
          <m-month-picker v-if="showComponent(item, 'monthpicker')" :options="item"></m-month-picker>
          <m-input-number v-if="showComponent(item, 'inputnumber')" :options="item"></m-input-number>
          <m-input-search v-if="showComponent(item, 'inputsearch')" :options="item"></m-input-search>
          <m-input-group v-if="showComponent(item, 'inputgroup')" :options="item" @change="onInputGroupChange"></m-input-group>
          <m-cascader v-if="showComponent(item, 'cascader')" :options="item"></m-cascader>
          <m-radio v-if="showComponent(item, 'radio')" :options="item" @submitEvent="handleSubmitEvent"></m-radio>
          <m-checkbox v-if="showComponent(item, 'checkbox')" :options="item" @submitEvent="handleSubmitEvent"></m-checkbox>
          <m-button v-if="showComponent(item, 'button')" :options="item" @submitEvent="handleSubmitEvent"></m-button>
          <m-switch v-if="showComponent(item, 'switch')" :options="item" @submitEvent="handleSubmitEvent"></m-switch>
          <m-select v-if="showComponent(item, 'select')" :options="item"></m-select>
          <m-a v-if="showComponent(item, 'a')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-upload v-if="showComponent(item, 'upload')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-upload-img v-if="showComponent(item, 'uploadimg')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-badge v-if="showComponent(item, 'badge')" :options="item" @submitEvent="handleSubmitEvent"/>
        </a-col>
        <a-col :span="searchBtn.span" :offset="searchBtn.offset" class="query-btns">
          <a-button v-if="searchBtn.showSearch" type="primary" @click="handleSearch">{{searchBtn.searchText}}</a-button>
          <a-button v-if="searchBtn.showReset" @click="handleReset">{{searchBtn.resetText}}</a-button>
          <a-button v-if="searchBtn.showCollapse" type="link" @click="handleCollapse">
            <template v-if="!expand">
              展开 <a-icon type="caret-down"></a-icon>
            </template>
            <template v-if="expand">
              折叠 <a-icon type="caret-up"></a-icon>
            </template>
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import {Form, Button, Row, Col, Input, Icon} from 'ant-design-vue'
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
  import MUploadImg from '@/components/m-form/m-upload/m-upload-img'
  import MA from '@/components/m-native/m-a'
  import MBadge from '@/components/m-badge/m-badge'
  export default {
    name: "m-query",
    components: {
      AForm: Form, AFormItem: Form.Item, AInput: Input,
      ARow: Row, ACol: Col, AButton: Button, AIcon: Icon,
      MInput, MTextarea, MInputGroup, MTimePicker, MDatePicker, MRangePicker, MMonthPicker,
      MInputNumber, MInputSearch, MCascader, MRadio, MCheckbox, MButton,
      MSwitch, MSelect, MUpload, MUploadImg, MBadge, 'm-a': MA
    },
    props: {
      options: Object
    },
    computed : {
      searchBtn () {
        // 配置按钮默认配置项
        let defaultConf = {
          showReset: true,  // 显示重置按钮
          showSearch: true, // 显示搜索按钮
          showCollapse: true, // 显示展开按钮
          offset: 0,        // 操作按钮偏移量
          resetText: '重置', // 重置按钮文本
          searchText: '搜索' // 搜索按钮文本
        }
        if(!this.options.attribute.searchBtn) {
          return defaultConf;
        }
        let res = Object.assign(defaultConf, this.options.attribute.searchBtn);

        // 如果用户没有设置展开按钮的话，直接显示到第二行，如果设置了的话，就根据data中的expand来判断
        let span = 0;
        if(res.showCollapse){
          if(this.expand) {
            span = 24
          }else {
            span = 5
          }
        }else {
          span=24
        }
        res.span = span;
        // console.log('操作按钮最终配置', res)
        return res;
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        expand: false,
      }
    },
    methods: {
      showComponent (item, typeName) {
        return item.type && (item.type.toLowerCase() === typeName)
      },
      // 点击搜索
      handleSearch (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          // console.log('error', error);
          // console.log('Received values of form: ', values);
          if(error) return;
          //执行搜索前的钩子函数
          let beforeSearch = $eval(this.options.beforeSearch, 'beforeSearch');
          // console.log(beforeSearch)
          beforeSearch(values);
          // 通知父组件，让父组件去修改table中的请求参数params值
          this.$emit('search', values);
        });
      },
      handleCollapse () {
        this.expand = !this.expand;
        this.$emit('collapse', this.expand ? 'unfold' : 'fold' )
      },
      handleReset (e) {
        // this.form.resetFields();
        this.form.resetFields();
      },
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

<style scoped lang="less">
  @import "m-query";
</style>
