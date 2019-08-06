<template>
  <div class="router-wrap">
    <m-breadcrumb></m-breadcrumb>
        <div class="form-wrap">
          <sys-user-form @search="onSearch"></sys-user-form>
        </div>
    <sys-user-create :visible="showCreateDraw" @close="handleCreateDrawClose"></sys-user-create>
    <div style="margin-bottom: 16px" :style="{ textAlign: 'right' }">
      <a-button type="primary" icon="plus" @click="onClickCreateBtn">新增</a-button>
      <!--      <a-button icon="edit" v-show="hasSelected">编辑</a-button>-->
      <!--      <a-button type="danger" icon="delete" v-show="hasSelected">删除</a-button>-->
    </div>
    <div class="table-wrap">
      <sys-user-table :search-params="searchParams" :create-times="createMenuTimes"></sys-user-table>
    </div>
  </div>
</template>

<script>
  import {Button} from 'ant-design-vue'
  import SysUserTable from './sys-user-table/sys-user-table'
  import SysUserForm from './sys-user-form/sys-user-form'
  import SysUserCreate from './sys-user-create/sys-user-create'
  import MBreadcrumb from '@/components/m-breadcrumb/m-breadcrumb'
  export default {
    name: "sys-user",
    components: {
      AButton: Button,
      SysUserTable,
      SysUserForm,
      SysUserCreate,
      MBreadcrumb,
    },
    data () {
      return {
        showCreateDraw: false,
        menuTree: [],
        createMenuTimes: 0,
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
      handleCreateDrawClose (action) {
        console.log('action', action)
        this.showCreateDraw = false;
        if(action && action == 'created') {
          //如果是创建完成，告诉table去更新你的内容
          this.createMenuTimes ++ ;
        }
      }
    },
    mounted() {
      // this.getMenuTree();
    }
  }
</script>

<style scoped lang="less">
  @import "sys-user.less";
</style>
