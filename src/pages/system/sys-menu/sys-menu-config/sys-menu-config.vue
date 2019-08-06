<template>
  <div>
    <a-drawer
      title="配置菜单"
      :width="720"
      @close="onClose"
      :visible="visible"
      wrapClassName="sys-menu-create-wrap">
      <div class="loading-wrap" v-if="loading">
        <a-icon type="loading" />
      </div>
      <div class="template-input" v-if="!loading">
        <div class="tool-btn">
          <div class="switch-btn">
            <a-switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked v-model="status"/>
          </div>
          <div class="format-btn">
            <a-button type="primary" @click="formatJSON"> 格式化 </a-button>
          </div>
        </div>
        <a-textarea :autosize="{ minRows: 20}" v-model="template" placeholder="请输入json格式模板数据"></a-textarea>
      </div>
      <div class="btn-wrap">
        <a-button :style="{marginRight: '8px'}" @click="onClose" > 取消 </a-button>
        <a-button type="primary" @click="submit" :loading="submitBtnLoading"> 确认 </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
  const Base64 = require('js-base64').Base64
  import {Button, Drawer, Icon, Input, Switch, Notification, Message} from 'ant-design-vue'
  export default {
    name: "sys-menu-config",
    components: {
      AButton: Button,
      ADrawer: Drawer,
      ATextarea: Input.TextArea,
      ASwitch: Switch,
      AIcon: Icon
    },
    props: {
      visible: Boolean,
      menuId: String
    },
    data() {
      return {
        template : '',
        status: true,
        loading: false,
        submitBtnLoading: false,
        hasBefore: false
      }
    },
    watch : {
      menuId(newVal, oldVal){
        // 监听到数据变化后，通过menuId查询template
        console.log(newVal)
        this.getTemplates();
      }
    },
    methods: {
      submit () {
        try{
          let json = JSON.parse(this.template);
          let tempStr = JSON.stringify(json)
          console.log('序列化',tempStr)
          let params = {
            "created_at": new Date(),
            "creator": this.$getLocalStorage('username'),
            "menu_id": this.menuId,
            "status": this.status ? 1 : 2,
            "template": tempStr,
            "updated_at": new Date()
          }
          this.submitBtnLoading = true;
          this.hasBefore ? this.update(params) :this.create(params);
        }catch (e) {
          let err = e.toString().split(':')
          console.log('转化错误',err[err.length-1])
          Message.error('请填写正确的json格式数据')
        }
      },
      update (params) {
        console.log('编辑')

      },
      create (params) {
        console.log('新建')
        this.$axios.post('templates',params).then(res => {
          console.log(res)
          if(res.data) {
            Notification['success']({
              message: '创建成功'
            })
            this.$emit('close', 'created')
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.submitBtnLoading = false;
        })
      },
      onClose() {
        this.$emit('close');
      },
      // 根据菜单id查询模板数据
      getTemplates () {
        if(!this.menuId) return;
        this.loading = true;
        this.$axios.get('/gettemplates/'+this.menuId).then(res => {
          console.log(res)
          if(res.data){
            //数据库中有对应于本菜单的template数据
            this.hasBefore = true;
            let jsonStr = Base64.decode(res.data.data)
            this.formatJSON(jsonStr)
          }
        }).catch(err => {
          console.log(err.response)
          if(err.response.status == 404) {
            //如果返回状态为404，说明资源不存在
            // err.response.data.error.message
            Message.info('该菜单未创建模板')
            this.template = ''
            this.hasBefore = false
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      //格式化template为json格式字符串并显示到view中，如果传参，按照参数来格式化，如果不传参，按照文本框中的数据格式化
      formatJSON (jsonStr) {
        try{
          let json = jsonStr ? JSON.parse(jsonStr) : JSON.parse(this.template);
          console.log(json)
          this.template = JSON.stringify(json, null, 4)
        }catch (e) {
          let err = e.toString().split(':')
          console.log('转化错误',err[err.length-1])
          Message.error('数据不能转化为json格式')
        }
      },
    },
    mounted() {
    }
  }
</script>
<style lang="less">
  @import "../../sys-drawer";
  @import "sys-menu-config";
</style>
