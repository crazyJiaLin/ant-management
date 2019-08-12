<template>
  <div>
    <a-drawer
      :title="options.title"
      :width="options.width ? options.width : 720"
      @close="onClose"
      :visible="visible"
      wrapClassName="sys-menu-create-wrap">
<!--      <m-form :options="options.form" @submit="handleSubmit"></m-form>-->
      <a-form :form="form" @submit="handleSubmit">
        <m-form-content :formList="options.form.children" @submitEvent="handleSubmitEvent"></m-form-content>
        <div class="btn-wrap">
          <a-button :style="{marginRight: '8px'}" @click="onClose"> 取消</a-button>
          <a-button type="primary" html-type="submit" :loading="btnLoading"> 确认</a-button>
        </div>
      </a-form>

    </a-drawer>
  </div>
</template>
<script>
  import md5 from 'md5'
  import { Button, Form, Drawer, Icon, Notification, Message } from 'ant-design-vue'
  import MFormContent from '@/components/m-form/m-form-content'

  export default {
    name: "view-template-create",
    components: {
      AButton: Button,
      AForm: Form,
      AFormItem: Form.Item,
      ADrawer: Drawer,
      AIcon: Icon,
      MFormContent
    },
    props: {
      visible: Boolean,
      options: Object
    },
    data() {
      return {
        form: this.$form.createForm(this),
        btnLoading: false
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          console.log(error, values)
          if (error) return;
          console.log('校验成功开始提交')
          // 执行请求前的钩子函数
          try {
            let beforeSubmit = this.options.form.beforeSubmit ? eval(this.options.form.beforeSubmit) : ()=>{};
            beforeSubmit(values);
          }catch (e) {
            Notification.error({
              message: 'beforeSubmit函数执行出错'
            });
          }
          let method = this.options.form.method ? this.options.form.method.toLowerCase() : 'post';
          console.log('开始发请求', method)
          this.btnLoading = true;
          this.$axios[method](this.options.form.url, values).then(res => {
            console.log(res)
            if(res.data) {
              Notification['success']({
                message: '创建成功'
              })
              // 置空表单，向父组件提交动作，更新表格
              this.form.resetFields();
              this.$emit('close', 'created');
            }
          }).catch(err => {
            console.log(err)
          }).finally(() => {
            this.btnLoading = false;
          })
        });
      },
      onClose() {
        this.$emit('close');
      },
      handleSubmitEvent (value) {
        this.$emit('submitEvent', value)
      }
    },
    mounted() {
    }
  }
</script>
<style lang="less">
  @import "../drawer";
</style>
