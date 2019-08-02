<template>
  <div>
    <a-table :columns="columns" :rowKey="record => record.record_id" :pagination="pagination"
             :dataSource="data" :loading="loading"  @change="handleTableChange"
             :scroll="{ y: 350 }">
      <template slot="operation" slot-scope="text, record">
        <a-button size="small">查看</a-button>
        <a-button size="small" @click="onEdit(record)">编辑</a-button>
        <a-popconfirm v-if="data.length" title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button type="danger" ghost size="small">删除</a-button>
        </a-popconfirm>
      </template>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{123}}</p>
    </a-table>
<!--    想要直接在列表上显示角色对每个菜单的操作权限，因为这里接口中返回的menus为空，所以先不展示-->
<!--    <sys-role-edit :visible="showEditDrawer" :options="editItem" @close="handleEditDrawClose"></sys-role-edit>-->
  </div>
</template>
<script>
  import {Table, Icon, Button, Popconfirm} from 'ant-design-vue'
  import SysRoleEdit from '../sys-role-edit/sys-role-edit'
  export default {
    name: 'sys-role-table',
    components: {
      ATable: Table,
      AIcon: Icon,
      APopconfirm: Popconfirm,
      AButton: Button,
      SysRoleEdit
    },
    props: {
      searchParams: Object,
      createTimes: Number
    },
    watch: {
      // 监听创建表单动作，如果创建完成，进行数据更新
      createTimes (newVal, oldVal) {
        this.fetch()  // 如果table的查询是分页查询，需要查询条件的时候，这里还是需要将查询条件作为参数穿进去的
      },
      // 监听查询条件变化，用于表单组件和table组件通信
      searchParams: {
        handler (newVal, oldVal) {
          // console.log(newVal, oldVal)
          this.fetch(newVal);
        },
        deep: true
      }
    },
    data() {
      return {
        showEditDrawer: false,
        editItem: {},
        data: [],
        pagination: {},
        loading: false,
        tableHeight: 0,
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name',
            align: 'center',
            width: '200px'

          }, {
            title: '排序值',
            dataIndex: 'sequence',
            align: 'center',
            width: '200px',
          }, {
            title: '角色描述',
            dataIndex: 'memo',
            align: 'center',
            width: '200px'
          },
          {
            title: '创建人',
            dataIndex: 'creator',
            align: 'center'
          },
          {
            title: '操作',
            dataIndex: 'record_id',
            // fixed: 'right',
            align: 'center',
            width: '300px',
            scopedSlots: { customRender: 'operation' },
          }],
      }
    },
    mounted() {
      this.fetch(this.pagination);
      // TODO: 这几行代码是想设置table高度的，但是failed
      // let routerWrapDOM = document.querySelector('.index-content-wrap.ant-layout-content');
      // let wrapHeight = routerWrapDOM.clientHeight;
      // console.log(routerWrapDOM, wrapHeight)
      // this.tableHeight = wrapHeight - 115;
    },
    methods: {
      onEdit(item){
        console.log(item)
        this.showEditDrawer = true;
        this.editItem = item;
      },
      handleEditDrawClose (action) {
        this.showEditDrawer = false;
        if(action && action == 'update') {
          this.fetch()
        }
      },
      onDelete (record_id) {  //点击删除
        console.log(record_id)
        this.$axios.delete('roles/' + record_id).then(res => {
          console.log(res)
          if(res.data){
            //删除成功，同步表格信息
            this.fetch(this.searchParams)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      fetch (params = {}) {
        this.loading = true;
        this.$axios.get('/roles?q=page',{
          params: {
            ...params
          }
        }).then(res => {
          console.log('get roles page',res.data)
          if(res.data) {
            this.data = res.data.list;
            this.pagination = res.data.pagination;
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading= false
        })
      },
      handleTableChange (pagination, filters, sorter) {
        console.log(pagination, filters, sorter);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
    },
  }
</script>
