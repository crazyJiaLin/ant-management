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
        <m-form-content :formList="editForm" @submitEvent="handleSubmitEvent"></m-form-content>
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
    name: "m-edit",
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
      options: Object,
      record: Object
    },
    computed: {
      editForm(){
        // 在这里将record中的值合并到form中去
        let res = [];
        for(let i=0; i<this.options.form.children.length; i++) {
          let item = this.options.form.children[i];
          let value = this.record[item.id];
          // console.log('找到',item.id, '值为',value)
          if(value) {
            let tempDecorator = item.attribute.decorator;
            if(item.attribute.initialValueRender){
              // 如果存在初始化render，则按照render中的进行
              try{
                let initialValueRender = eval(item.attribute.initialValueRender);
                tempDecorator.initialValue = initialValueRender(value);
              }catch (e) {
                console.error('执行initialValueRender函数出错',e);
              }
            }else{
              tempDecorator.initialValue = value;
            }
            item.attribute.decorator = tempDecorator;
          }
          res.push(item)
        }
        console.log('通过原始配置项与编辑行传值的结合结果', res)
        return res;
      }
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
            beforeSubmit(values, this.record);
          }catch (e) {
            console.log(e)
            Notification.error({
              message: 'beforeSubmit函数执行出错'
            });
          }
          let method = this.options.form.method ? this.options.form.method.toLowerCase() : 'post';
          // 因为这里涉及到一个url的id替换，在配置中我们用{id}作为占位符，这里吧占位符替换为真实id
          let url = (this.options.form.url).replace(/{id}/g, this.record.record_id);
          console.log('开始发请求', method, url)
          this.btnLoading = true;
          this.$axios[method](url, values).then(res => {
            console.log(res)
            if(res.data) {
              Notification['success']({
                message: '更新成功'
              })
              // 置空表单，向父组件提交动作，更新表格
              this.form.resetFields();
              this.$emit('close', 'updated');
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
