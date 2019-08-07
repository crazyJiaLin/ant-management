<template>
  <a-modal
    title="新增模板" cancelText="取消" okText="确定"
    :visible="visible"
    :width="600"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <div class="template-input">
      <div class="tool-btn">
        <div class="switch-btn">
          <a-switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked v-model="status" disabled/>
        </div>
        <div class="format-btn">
          <a-button type="primary" @click="formatJSON"> 格式化 </a-button>
        </div>
      </div>
      <a-textarea :autosize="{ minRows: 15, maxRows: 20}" v-model="template" placeholder="请输入json格式模板数据"></a-textarea>
    </div>
  </a-modal>
</template>

<script>
  import {Button, Modal, Input, Icon, Switch, Message, Notification} from 'ant-design-vue'
  export default {
    name: "template-create",
    components : {
      AButton: Button,
      AModal: Modal,
      ATextarea: Input.TextArea,
      AIcon: Icon,
      ASwitch: Switch
    },
    props: {
      visible: Boolean,
      menuId: String
    },
    data () {
      return {
        confirmLoading: false,
        status: false,
        template: ''
      }
    },
    methods: {
      handleOk(e) {
        try{
          // console.log(this.template)
          let json = JSON.parse(this.template);
          let tempStr = JSON.stringify(json)
          // console.log('序列化',tempStr)
          let params = {
            "created_at": new Date(),
            "creator": this.$getLocalStorage('username'),
            "menu_id": this.menuId,
            "status": this.status ? 1 : 2,
            "template": tempStr,
            "updated_at": new Date()
          }
          this.confirmLoading = true;
          this.create(params);
        }catch (e) {
          let err = e.toString().split(':')
          console.log('转化错误',err[err.length-1])
          Message.error('请填写正确的json格式数据')
        }
      },
      create (params) {
        console.log('新建')
        this.$axios.post('templates',params).then(res => {
          console.log(res)
          if(res.data) {
            Notification['success']({
              message: '创建成功'
            })
            // 创建成功后将本组件内容置空
            this.template = '';
            this.status = false;
            this.$emit('close', 'created')
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.confirmLoading = false;
        })
      },
      handleCancel(e) {
        this.$emit('close')
      },
      //格式化template为json格式字符串并显示到view中，如果传参，按照参数来格式化，如果不传参，按照文本框中的数据格式化
      formatJSON () {
        try{
          let json = JSON.parse(this.template);
          // console.log(json)
          this.template = JSON.stringify(json, null, 4)
        }catch (e) {
          let err = e.toString().split(':')
          console.log('转化错误',err[err.length-1])
          Message.error('数据不能转化为json格式')
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .tool-btn {
    display: flex;
    margin-bottom: 15px;
    .switch-btn {
      flex: 1;
      padding-top: 8px;
    }
    .format-btn {
      flex: 1;
      text-align: right;
    }
  }
</style>
