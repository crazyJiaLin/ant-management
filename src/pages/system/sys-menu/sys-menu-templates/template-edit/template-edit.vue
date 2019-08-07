<template>
  <a-modal
    title="编辑模板" cancelText="取消" okText="确定"
    :visible="visible"
    :width="600"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <div class="template-input">
      <div class="tool-btn">
        <div class="switch-btn">
          <a-switch checkedChildren="启用" unCheckedChildren="停用" disabled defaultChecked v-model="status"/>
        </div>
        <div class="format-btn">
          <a-button type="primary" @click="formatJSON"> 格式化 </a-button>
        </div>
      </div>
      <a-textarea :autosize="{ minRows: 15, maxRows: 18}" v-model="template" placeholder="请输入json格式模板数据"></a-textarea>
    </div>
  </a-modal>
</template>

<script>
  import {Button, Modal, Input, Icon, Switch, Message, Notification} from 'ant-design-vue'
  export default {
    name: "template-edit",
    components : {
      AButton: Button,
      AModal: Modal,
      ATextarea: Input.TextArea,
      AIcon: Icon,
      ASwitch: Switch
    },
    props: {
      visible: Boolean,
      options: Object
    },
    watch: {
      options (newVal, oldVal) {
        console.log(newVal)
        this.status = newVal.status == 1 ? true : false
        this.formatJSON(newVal.template)
      }
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
            record_id: this.options.record_id,
            "created_at": new Date(),
            "creator": this.$getLocalStorage('username'),
            "menu_id": this.options.menu_id,
            "status": this.status ? 1 : 2,
            "template": tempStr,
            "updated_at": new Date()
          }
          this.confirmLoading = true;
          this.edit(params);
        }catch (e) {
          let err = e.toString().split(':')
          console.log('转化错误',err[err.length-1])
          Message.error('请填写正确的json格式数据')
        }
      },
      edit (params) {
        this.$axios.put(`templates/${this.options.record_id}`,params).then(res => {
          console.log(res)
          if(res.data) {
            Notification['success']({
              message: '更新成功'
            })
            this.$emit('close', 'updated')
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
      formatJSON (jsonStr) {
        try{
          // 这里的jsonStr如果是从标签上@click调用的话，jsonStr为点击事件event，是Object，所以判断的时候不能只判断是否存在，而应该是判断是否是字符串
          let json = typeof(jsonStr) === 'string' ? JSON.parse(jsonStr) : JSON.parse(this.template);
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
