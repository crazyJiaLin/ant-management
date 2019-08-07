<template>
  <div class="view-template-wrap">
    <div class="loading-wrap" v-if="loading">
      <a-icon type="loading" />
    </div>
    <div class="err-wrap" v-if="!loading && !template">
      该菜单未创建模板，赶快到 <router-link to="system/menu">菜单管理</router-link> 中创建吧！
    </div>
    <div class="template-input" v-if="!loading && template">
      <div v-for="(item, index) in this.template" :key="item.id">
        <m-query v-if="item.type === 'query'"
                 :options="item" />
      </div>
    </div>
  </div>
</template>

<script>
  const Base64 = require('js-base64').Base64
  import {Icon, Notification, Message} from 'ant-design-vue'
  import MQuery from '@/components/m-form/m-query/m-query'
  // import MTest from '@/components/m-test/m-test'
  export default {
    name: "view-template",
    components: {
      AIcon: Icon,
      MQuery
    },
    watch : {
      '$store.state.curMenu' (newVal, oldVal) {
        console.log('当前menuid', newVal)
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
      // 根据菜单id查询模板数据
      getTemplates () {
        let menuId = this.$store.state.curMenu.record_id;
        if(!menuId) return;
        this.loading = true;
        this.$axios.get('/gettemplates/'+menuId).then(res => {
          console.log(res)
          if(res.data){
            //数据库中有对应于本菜单的template数据
            let jsonStr = Base64.decode(res.data.data)
            this.parseJSON(jsonStr)
          }
        }).catch(err => {
          console.log(err.response)
          if(err.response.status == 404) {
            //如果返回状态为404，说明资源不存在
            // err.response.data.error.message
            Message.info('该菜单未创建模板')
            this.template = ''
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      parseJSON (jsonStr) {
        try{
          this.template = JSON.parse(jsonStr);
          console.log(this.template)
        }catch (e) {
          console.log('转化错误',e.toString())
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
