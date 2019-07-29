<template>
  <a-layout-header class="header-wrap">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => this.$emit('clickCollBtn')"/>
    <div class="user-wrap">
      <a-dropdown>
        <a href="#">
          <a-icon type="user"></a-icon>
          {{realName}}
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="logout">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
  import {Layout, Icon, Dropdown, Menu} from 'ant-design-vue'
  export default {
    name: "m-header",
    components: {
      ALayoutHeader: Layout.Header,
      AIcon: Icon,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: Menu.Item
    },
    props: {
      collapsed: Boolean
    },
    data () {
      return {
        realName: '管理员'
      }
    },
    methods: {
      getUserInfo () {
        this.$axios.get('/current/user').then(res => {
          // console.log(res)
          let data = res.data;
          if(data.real_name){
            this.realName = data.real_name;
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
