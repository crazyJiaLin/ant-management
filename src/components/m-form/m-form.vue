<template>
  <a-form :form="form" @submit="handleSubmit">
    <m-form-content :options="options" @submitEvent="handleSubmitEvent"></m-form-content>
  </a-form>
</template>

<script>
  import {Form, Button, Row, Col, Input, Icon} from 'ant-design-vue'
  import MFormContent from './m-form-content'
  export default {
    name: "m-form",
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
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          console.log('error', error);
          console.log('Received values of form: ', values);
          if(error) return;
          //执行搜索前的钩子函数
          let beforeSearch = this.options.beforeSearch ? eval(this.options.beforeSearch) : ()=>{};
          // console.log(beforeSearch)
          beforeSearch(values);
          // 提交表单到父组件执行
          this.$emit('submit', values);
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

<style scoped>

</style>
