<template>
  <a-layout class="index-wrap">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo-wrap">
        <div class="logo-img">
          <img src="/static/img/logo.svg" alt="logo">
        </div>
        <div class="logo-title" v-if="!collapsed">权限管理脚手架</div>
      </div>
      <m-nav></m-nav>
    </a-layout-sider>
    <a-layout>
      <m-header :collapsed="collapsed" @clickCollBtn="()=> collapsed = !collapsed"></m-header>

      <div class="index-content-wrap">
        <router-view></router-view>
      </div>
    </a-layout>
  </a-layout>
</template>
<script>
  import {Layout, Menu, Icon} from 'ant-design-vue'
  import MHeader from '@/components/m-header/m-header'
  import MNav from '@/components/m-nav/m-nav'

  export default {
    components : {
      ALayout: Layout,
      ALayoutHeader: Layout.Header,
      ALayoutContent: Layout.Content,
      ALayoutSider: Layout.Sider,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      AIcon: Icon,
      MHeader,
      MNav,
    },
    data(){
      return {
        collapsed: false,
        accessToken: this.$getLocalStorage('access_token'),
        tokenType: this.$getLocalStorage('token_type'),
        username: this.$getLocalStorage('username')
      }
    },
    mounted () {
      // let accessToken = this.$getLocalStorage('access_token');
      // let username = this.$getLocalStorage('username');
      // console.log('get from localStstorage ', this.accessToken, this.username)
    }
  }
</script>
<style lang="less" scoped>
  @import "index";
</style>
