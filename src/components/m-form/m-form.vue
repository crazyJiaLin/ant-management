<template>
  <div :style="options.attribute.wrapperStyle">
    <a-form :form="form" @submit="handleSubmit"
            :layout="options.attribute.layout" :style="options.attribute.formStyle">
          <m-form-content :formList="options.children"
                          @submitEvent="handleSubmitEvent"
                          @inputGroupChange="oninputGroupChange"
          ></m-form-content>
    </a-form>
  </div>
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
    data () {
      return {
        form: this.$form.createForm(this),
        inputGroup: {}
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
          let beforeSubmit = $eval(this.options.beforeSubmit, 'beforeSubmit');
          // console.log(beforeSubmit)
          beforeSubmit(values);
          // 提交表单到父组件执行
          this.$emit('submit', values);
        });
      },
      // input-group 组件内部发生变化，将字段添加到form中
      oninputGroupChange (name, value) {
        // let fieldValue = this.form.getFieldsValue([name]);
        // console.log('before', this.form.getFieldsValue([name]))
        if(!this.form.getFieldsValue([name])[name]) {
          this.form.getFieldDecorator([name])
        }
        this.inputGroup[name] = value;
        // console.log(this.inputGroup)
        this.form.setFieldsValue(this.inputGroup)
        // console.log('after', this.form.getFieldsValue([name]))
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
