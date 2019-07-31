<template>
  <a-menu theme="dark" mode="inline" :defaultSelectedKeys="curRouter"
          :defaultOpenKeys="defaultOpenArr" @select="handleMenuChange">
    <template v-for="(item, index) in menuList">
      <a-menu-item v-if="!item.children" :key="item.router">
        <router-link :to="item.router">
          <a-icon :type="item.icon" />
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
      <m-sub-menu v-else :menu-info="item"/>
    </template>
<!--    <a-menu-item v-for="(item, index) in menuList" :key="item.router"-->
<!--                 v-if="!item.hidden && (!item.children || item.children.length == 0)">-->
<!--      <router-link :to="item.router">-->
<!--        <a-icon :type="item.icon"/>-->
<!--        <span>{{item.name}}</span>-->
<!--      </router-link>-->
<!--    </a-menu-item>-->
<!--    <a-sub-menu v-for="(item, index) in menuList" :key="item.router"-->
<!--                v-if="!item.hidden && (item.children && item.children.length > 0)">-->
<!--      <span slot="title">-->
<!--        <a-icon :type="item.icon"/>-->
<!--        <span>{{item.name}}</span>-->
<!--      </span>-->
<!--      <a-menu-item v-for="(item2, index2) in item.children" :key="item2.router">-->
<!--        <router-link :to="item2.router">-->
<!--          <a-icon :type="item2.icon"/>-->
<!--          <span>{{item2.name}}</span>-->
<!--        </router-link>-->
<!--      </a-menu-item>-->
<!--    </a-sub-menu>-->
  </a-menu>
</template>

<script>
  import {Menu, Icon} from 'ant-design-vue'
  import MSubMenu from './m-sub-menu/m-sub-menu'
  export default {
    name: "m-nav",
    components: {
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ASubMenu: Menu.SubMenu,
      AIcon: Icon,
      MSubMenu
    },
    data () {
      return {
        menuList : [],
        curRouter: [this.$route.path],
        defaultOpenArr: ['']
      }
    },
    methods: {
      getUserMenuTree () {
        this.$axios.get('/current/menutree').then(res => {
          // console.log(res)
          if(res.data){
            this.menuList = res.data.list;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleMenuChange (value) {
        //菜单选择回调函数
        // console.log(value)
      }
    },
    mounted() {
      this.getUserMenuTree();
    }
  }
</script>

<style scoped lang="less">
  .ant-menu-submenu-title {
    a {
      color: #fff;
    }
  }
</style>
