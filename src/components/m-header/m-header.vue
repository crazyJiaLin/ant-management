<template>
  <a-layout-header class="header-wrap">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => this.$emit('clickCollBtn')"/>
    <div class="user-wrap">
      <a-dropdown>
        <a href="#">
          <a-avatar icon="user"/>
<!--          <a-icon type="user"></a-icon>-->
          &nbsp;{{realName}}
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">修改密码</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="logout">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="notice-wrap">
      <m-notice></m-notice>
    </div>
  </a-layout-header>
</template>

<script>
  import {Layout, Icon, Dropdown, Menu, Avatar} from 'ant-design-vue'
  import MNotice from '@/components/m-notice/m-notice'
  export default {
    name: "m-header",
    components: {
      ALayoutHeader: Layout.Header,
      AIcon: Icon,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      AAvatar: Avatar,
      MNotice
    },
    props: {
      collapsed: Boolean
    },
    computed: {
      realName(){
        return this.$store.state.userInfo.real_name ? this.$store.state.userInfo.real_name : '未登录';
      }
    },
    methods: {
      getUserInfo () {
        this.$axios.get('/current/user').then(res => {
          // console.log(res)
          let data = res.data;
          if(data){
            this.$store.commit('setUserInfo', res.data)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      logout () {

        this.$axios.post('/login/exit').then(res => {
          // console.log(res.response)

          this.$router.push({
            path: '/login',
            query: {redirect: location.hash.slice(1,location.hash.length)}
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getUserInfo();
    }
  }
</script>

<style scoped lang="less">
  @import "m-header";
</style>
