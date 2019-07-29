<template>
  <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
    <a-menu-item v-for="(item, index) in menuList" :key="item.record_id"
                 v-if="!item.hidden && (!item.children || item.children.length == 0)">
      <router-link :to="item.router">
        <a-icon :type="item.icon"/>
        <span>{{item.name}}</span>
      </router-link>
    </a-menu-item>
    <a-sub-menu v-for="(item, index) in menuList" :key="item.record_id"
                v-if="!item.hidden && (item.children && item.children.length > 0)">
      <span slot="title">
        <a-icon :type="item.icon"/>
        <span>{{item.name}}</span>
      </span>
      <a-menu-item v-for="(item2, index2) in item.children" :key="item2.record_id">
        <router-link :to="item2.router">
          <a-icon :type="item2.icon"/>
          <span>{{item2.name}}</span>
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
  import {Menu, Icon} from 'ant-design-vue'
  export default {
    name: "m-nav",
    components: {
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ASubMenu: Menu.SubMenu,
      AIcon: Icon
    },
    data () {
      return {
        menuList : []
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
      }
    },
    mounted() {
      this.getUserMenuTree();
    }
  }
</script>

<style scoped>

</style>
