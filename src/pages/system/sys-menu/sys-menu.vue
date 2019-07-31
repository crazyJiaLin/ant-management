<template>
  <div class="router-wrap">
    <m-breadcrumb></m-breadcrumb>
<!--    <div class="form-wrap">-->
<!--      <sys-menu-form @search="onSearch"></sys-menu-form>-->
<!--    </div>-->
    <sys-menu-create :visible="showCreateDraw" @close="handleCreateDrawClose"></sys-menu-create>
    <div style="margin-bottom: 16px" :style="{ textAlign: 'right' }">
      <a-button type="primary" icon="plus" @click="onClickCreateBtn">新增</a-button>
      <!--      <a-button icon="edit" v-show="hasSelected">编辑</a-button>-->
      <!--      <a-button type="danger" icon="delete" v-show="hasSelected">删除</a-button>-->
    </div>
    <div class="table-wrap">
      <sys-menu-table :search-params="searchParams"></sys-menu-table>
    </div>
  </div>
</template>

<script>
  // import MTable from '@/components/m-table/m-table'
  import {Button} from 'ant-design-vue'
  import SysMenuTable from './sys-menu-table/sys-menu-table'
  import SysMenuForm from './sys-menu-form/sys-menu-form'
  import SysMenuCreate from './sys-menu-create/sys-menu-create'
  import MBreadcrumb from '@/components/m-breadcrumb/m-breadcrumb'
  export default {
    name: "sys-menu",
    components: {
      AButton: Button,
      SysMenuTable,
      SysMenuForm,
      SysMenuCreate,
      MBreadcrumb,
    },
    data () {
      return {
        showCreateDraw: false,
        menuTree: [],
        searchParams: {}
      }
    },
    methods : {
      onSearch (params) {
        console.log(params)
        this.searchParams = params;
      },
      onClickCreateBtn () {
        this.showCreateDraw = true;
      },
      handleCreateDrawClose () {
        console.log('close')
        this.showCreateDraw = false;
      }
    },
    mounted() {
      // this.getMenuTree();
    }
  }
</script>

<style scoped lang="less">
 @import "sys-menu";
</style>
