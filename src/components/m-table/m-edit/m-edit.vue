<template>
  <div>
    <a-drawer
      :title="options.title"
      :width="options.width ? options.width : 720"
      @close="onClose"
      :visible="visible"
      destroyOnClose
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
      // 通过editItem对decorator设置initVal
      editForm(){
        // 在这里将record中的值合并到form中去
        let res = [];
        for(let i=0; i<this.options.form.children.length; i++) {
          let item = this.options.form.children[i]; // 从options的列表中获取当前操作的item
          let value = this.record[item.id];         // 从record中获取当前item id的值
          // console.log('找到',item.id, '值为',value)
          // 这里不应当有非空判断，因为在value值为空的时候也不应该是上一次的值
          // if(value) {
            let tempDecorator = item.attribute.decorator;
            if(item.attribute.initialValueRender){
              // 如果存在初始化render，则按照render中的进行
              let initialValueRender = $eval(item.attribute.initialValueRender, 'initialValueRender');
              tempDecorator.initialValue = initialValueRender(value);
            }else{
              tempDecorator.initialValue = value;
            }
            item.attribute.decorator = tempDecorator;
          // }
          res.push(item)
        }
        // console.log('通过editItem对decorator设置initVal', res)
        return res;
      },
      resources(){
        return this.$store.state.curMenu.resources;
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
          // console.log('校验成功开始提交')
          // 执行请求前的钩子函数
          if(this.options.form) {
            let beforeSubmit = $eval(this.options.form.beforeSubmit, 'beforeEdit');
            beforeSubmit(values, this.record);
          }
          // 在resources中查找edit的资源
          let resource = this.findResourceByCode('edit');
          if (!resource) return message.warn('您还没有配置edit资源');
          // 替换id
          let url = resource.path.replace(/:id/g, this.record.record_id)
          let method = resource.method.toLowerCase()
          // console.log('开始发请求', method, url)
          this.btnLoading = true;
          this.$axios[method](url, values).then(res => {
            console.log(res)
            if(res.data) {
              Notification['success']({
                message: '更新成功'
              })
              // 置空表单，向父组件提交动作，更新表格
              // this.form.resetFields();
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
        // this.form.resetFields();
        // console.log('on edit close')
        this.$emit('close');
      },
      handleSubmitEvent (value) {
        this.$emit('submitEvent', value)
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
    },
    mounted() {
    }
  }
</script>
<style lang="less">
  @import "../drawer";
</style>
