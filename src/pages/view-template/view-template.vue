<template>
  <div class="view-template-wrap">
<!--    <m-test></m-test>-->
    <div class="loading-wrap" v-if="loading">
      <a-icon type="loading" />
    </div>
    <div class="err-wrap" v-if="!loading && !template">
      该菜单未创建模板，赶快到 <router-link to="system/menu">菜单管理</router-link> 中创建吧！
    </div>
    <div class="template-input" v-if="!loading && template">
      <template v-for="(item, index) in this.template" >
        <m-query v-if="item.type && (item.type.toLowerCase() === 'query')" :options="item"
                 @submitEvent="handleSubmitEvent" @search="handleSearch(item.tableId, $event)"/>
        <m-form v-if="item.type && (item.type.toLowerCase() === 'form')" :options="item"
                 @submitEvent="handleSubmitEvent"/>
        <m-table v-if="item.type && (item.type.toLowerCase() === 'table')" :options="item" @submitEvent="handleSubmitEvent"/>
        <m-steps v-if="item.type && (item.type.toLowerCase() === 'steps')" :options="item" @submitEvent="handleSubmitEvent"/>
        <m-badge v-if="item.type && (item.type.toLowerCase() === 'badge')" :options="item" @submitEvent="handleSubmitEvent"/>
        <m-transfer v-if="item.type && (item.type.toLowerCase() === 'transfer')" :options="item"/>
        <m-a v-if="item.type && (item.type.toLowerCase() === 'a')" :options="item" @submitEvent="handleSubmitEvent"/>
        <m-div v-if="item.type && (item.type.toLowerCase() === 'div')" :options="item"/>
        <m-pre v-if="item.type && (item.type.toLowerCase() === 'pre')" :options="item"/>
      </template>
    </div>
  </div>
</template>
<script>
  // 假数据
  import TemplateData from './test-data/query-table布局'
  const Base64 = require('js-base64').Base64
  import {Icon, Notification, Message} from 'ant-design-vue'

  import MQuery from '@/components/m-form/m-query/m-query'
  import MForm from '@/components/m-form/m-form'
  import MTable from '@/components/m-table/m-table'
  import MSteps from '@/components/m-steps/m-steps'

  import MA from '@/components/m-native/m-a'
  import MBadge from '@/components/m-badge/m-badge'
  import MTransfer from '@/components/m-transfer/m-transfer'

  import MDiv from '@/components/m-native/m-div'
  import MPre from '@/components/m-native/m-pre'

  import MTest from '@/components/m-test/m-test'

  export default {
    name: "view-template",
    components: {
      AIcon: Icon,
      MQuery, MForm, MTable, MSteps,
      'm-a': MA, MBadge, MTransfer,
      MDiv, MPre,
      MTest
    },
    watch : {
      '$store.state.curMenu' (newVal, oldVal) {
        this.getTemplates()
      }
    },
    data () {
      return {
        loading: true,
        template: null,
      }
    },
    methods: {
      handleSearch(tableId, params) {
        // console.log('start search', tableId, params)
        // 通过自定义方法吧params设置到对应的table中去
        this.template.set(tableId, 'params', params)
      },
      handleSubmitEvent(value) {
        // console.log('template 父组件接收到命令', value)
        //将inner中的jsonObj用当前template代替，这样就能够执行JsonObj的指定方法了 --- 同时支持message.error()等方法
        let code = value.replace(/jsonobj/g, 'this.template')
        try {
          // console.log('执行子组件提交的命令',code)
          eval(code)
        }catch (e) {
          console.log(e)
          Message.error('执行命令出错,请检查配置的公共方法是否正确')
        }
      },
      // 根据菜单id查询模板数据
      getTemplates () {
        let menuId = this.$store.state.curMenu.record_id;
        if(!menuId) return;
        this.loading = true;
        this.$axios.get('/gettemplates/'+menuId).then(res => {
          // console.log('获取到当前菜单的模板数据',res.data)
          if(res.data){
            //数据库中有对应于本菜单的template数据
            // let jsonStr = Base64.decode(res.data.data)
            // this.parseJSON(jsonStr)
            // TODO 这里是个假数据，稍后吧前两行注释打开弄成真数据
            this.template = new JsonObj(TemplateData)
          }
        }).catch(err => {
          console.log(err.response)
          if(err.response.status == 404) {
            //如果返回状态为404，说明资源不存在
            // err.response.data.error.message
            Message.info('该菜单未创建模板')
            this.template = null;
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      parseJSON (jsonStr) {
        try{
          this.template = new JsonObj(JSON.parse(jsonStr));
          console.log(this.template)
        }catch (e) {
          // console.log('转化错误',e.toString())
          Message.error('数据不能转化为json格式')
        }
      },
    },
    mounted() {
      this.getTemplates();
    }
  }
</script>

<style scoped lang="less">
  @import "view-template";
</style>
