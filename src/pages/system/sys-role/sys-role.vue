<template>
  <div class="router-wrap">
    <m-breadcrumb></m-breadcrumb>
        <div class="form-wrap">
          <sys-role-form @search="onSearch"></sys-role-form>
        </div>
    <sys-role-create :visible="showCreateDraw" @close="handleCreateDrawClose"></sys-role-create>
    <div style="margin-bottom: 16px" :style="{ textAlign: 'right' }">
      <a-button type="primary" icon="plus" @click="onClickCreateBtn">新增</a-button>
      <!--      <a-button icon="edit" v-show="hasSelected">编辑</a-button>-->
      <!--      <a-button type="danger" icon="delete" v-show="hasSelected">删除</a-button>-->
    </div>
    <div class="table-wrap">
      <sys-role-table :search-params="searchParams" :create-times="createTimes"></sys-role-table>
    </div>
  </div>
</template>

<script>
  import {Button} from 'ant-design-vue'
  import SysRoleTable from './sys-role-table/sys-role-table'
  import SysRoleForm from './sys-role-form/sys-role-form'
  import SysRoleCreate from './sys-role-create/sys-role-create'
  import MBreadcrumb from '@/components/m-breadcrumb/m-breadcrumb'
  export default {
    name: "sys-role",
    components: {
      AButton: Button,
      SysRoleTable,
      SysRoleForm,
      SysRoleCreate,
      MBreadcrumb,
    },
    data () {
      return {
        showCreateDraw: false,
        roleTree: [],
        createTimes: 0,
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
          this.createTimes ++ ;
        }
      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="less">
  .router-wrap {
    padding: 10px 20px 20px;
    height: 100%;
  }
  .form-wrap {
    margin-bottom: 20px;
  }

</style>
