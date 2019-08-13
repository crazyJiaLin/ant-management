<template>
  <div class="query-wrap">
    <a-form :form="form" @submit="handleSearch">
      <m-form-content :formList="options.children" @submitEvent="handleSubmitEvent"></m-form-content>
      <a-row>
        <a-col :span="searchBtn.span" :offset="searchBtn.offset" class="query-btns">
          <a-button v-if="searchBtn.showSearch" type="primary" @click="handleSearch">{{searchBtn.searchText}}</a-button>
          <a-button v-if="searchBtn.showReset" @click="handleReset">{{searchBtn.resetText}}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import {Form, Button, Row, Col, Input, Icon} from 'ant-design-vue'
  import MFormContent from '@/components/m-form/m-form-content'
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
      MFormContent
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
          span: 24,         // 操作按钮宽度
          offset: 0,        // 操作按钮偏移量
          resetText: '重置', // 重置按钮文本
          searchText: '搜索' // 搜索按钮文本
        }
        if(!this.options.attribute.searchBtn) {
          return defaultConf;
        }
        let res = Object.assign(defaultConf, this.options.attribute.searchBtn);
        // console.log('操作按钮最终配置', res)
        return res;
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
          // console.log('error', error);
          // console.log('Received values of form: ', values);
          if(error) return;
          //执行搜索前的钩子函数
          let beforeSearch = this.options.beforeSearch ? eval(this.options.beforeSearch) : ()=>{};
          // console.log(beforeSearch)
          beforeSearch(values);
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
    },
    mounted() {
      // console.log(this.options)
    }
  }
</script>

<style scoped lang="less">
  @import "m-query";
</style>
