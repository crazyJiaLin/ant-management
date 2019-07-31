<template functional>
  <a-sub-menu
    :key="props.menuInfo.record_id"
  >
    <span slot="title">
<!--      <router-link :to="props.menuInfo.router">-->
        <a-icon :type="props.menuInfo.icon" /><span>{{ props.menuInfo.name }}</span>
<!--      </router-link>-->
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.record_id"
      >
        <router-link :to="item.router">
          <a-icon :type="item.icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </a-menu-item>
      <m-sub-menu
        v-else
        :key="item.record_id"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
  import {Menu, Icon} from 'ant-design-vue'
  // import MSubMenu from './m-sub-menu'
  export default {
    name: 'm-sub-menu',
    components: {
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ASubMenu: Menu.SubMenu,
      AIcon: Icon,
      // MSubMenu
    },
    props: {
      menuInfo: Object
    },
    mounted() {
      // console.log('111',this.menuInfo)
    }
  };
</script>
