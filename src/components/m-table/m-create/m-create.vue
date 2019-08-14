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
  import { Button, Form, Drawer, Icon, Notification, Message } from 'ant-design-vue'
  import MFormContent from '@/components/m-form/m-form-content'

  export default {
    name: "m-create",
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
    computed: {
      resources(){
        return this.$store.state.curMenu.resources;
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
          let beforeSubmit = $eval(this.options.form.beforeSubmit, 'beforeCreate');
          beforeSubmit(values);

          // 在resources中查找create的资源
          let resource = this.findResourceByCode('create');
          if (!resource) return message.warn('您还没有配置create资源');
          // 替换id
          let url = resource.path
          let method = resource.method.toLowerCase()
          // console.log('开始发请求', method, url)
          this.btnLoading = true;
          this.$axios[method](url, values).then(res => {
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
      // 根据code查找resources
      findResourceByCode (code) {
        if(!code || !this.resources) return null;
        for(let i=0; i<this.resources.length; i++) {
          let item = this.resources[i];
          if(item.code === code) {
            return item;
          }
        }
        return null;
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
