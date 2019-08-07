<template>
  <a-menu theme="dark" mode="inline" :selectedKeys="defaultSelectedKeys"
          :openKeys="defaultOpenKeys" @select="handleMenuChange" @openChange="handleTitleClick"
          forceSubMenuRender>
    <template v-for="(item, index) in menuList" v-if="item.hidden == 0">
      <a-menu-item v-if="!item.children" :key="item.record_id">
        <router-link :to="item.router">
          <a-icon :type="item.icon" />
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
      <m-sub-menu v-else :menu-info="item"/>
    </template>
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
        curRouter: {},
        defaultSelectedKeys: [],
        defaultOpenKeys: []
      }
    },
    watch: {
      '$store.state.menuList'(newVal, oldVal){
        // console.log(newVal, oldVal)

        //根据当前路由在menuList中查找指定项
        // this.setCurRouter();
        //监听vuex中menuList变化，从而对导航栏进行重置
        this.menuList = newVal;
      },
      '$route' (newVal, oldVal) {
        // console.log('m-nav监听变化', newVal)
        this.setCurRouter()
      }
    },
    methods: {
      getUserMenuTree () {
        this.$axios.get('/current/menutree').then(res => {
          // console.log(res)
          if(res.data){
            this.menuList = res.data.list;
            //设置默认展开项和默认选中项
            this.setCurRouter()
            //将菜单数据同步到vuex中，这里不需要在对this.data设置了，因为我们监听了vuex中的数据，state变化后会自动渲染
            this.$store.commit('setMenuList',res.data.list);
            // this.$store.commit('setMenuToLocalStorage',res.data.list);
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleMenuChange (value) {
        //菜单选择回调函数
        this.defaultSelectedKeys = [value.key]
        this.recursionList(this.menuList, 'record_id', value.key);
        this.$store.commit('setCurMenu', this.curRouter)
        // console.log(this.curRouter)
      },
      handleTitleClick (openKeys) {
        // console.log(openKeys)
        this.defaultOpenKeys = openKeys
      },
      //根据当前路由在menuList中查找指定项
      setCurRouter () {
        // console.log(this.$route)
        let path = this.$route.path;
        // let menuList = JSON.parse(localStorage.getItem('menuList'));
        this.recursionList(this.menuList, 'router', path);
        // console.log('curRouter', this.curRouter)
        this.defaultSelectedKeys = [this.curRouter.record_id];
        this.defaultOpenKeys = this.curRouter.parent_path.split('/');
        this.$store.commit('setCurMenu', this.curRouter)
        // console.log(this.curRouter)
      },
      //递归查找路由
      recursionList(list,  key, value ) {
        if(list && list.length > 0){
          for(let i=0; i<list.length; i++) {
            // console.log(list[i], path)
            if(list[i][key] == value) {
              // console.log('匹配成功', list[i])
              this.curRouter = list[i];
            }
            if(list[i].children && list[i].children.length > 0){
              this.recursionList(list[i].children, key, value);
            }
          }
        }
        return;
      }
    },
    created () {
      // this.setCurRouter();
      // this.defaultOpenKeys = ['dfbb4bd9-de6d-4e02-ba0f-5a147bed3670']
    },
    mounted() {
      this.getUserMenuTree();

    },
  }
</script>

<style scoped lang="less">
  .ant-menu-submenu-title {
    a {
      color: #fff;
    }
  }
</style>
