<template>
  <div>
    <a-table :columns="columns" :rowKey="record => record.record_id"
             :pagination="pagination" size="middle"
             :dataSource="data" :loading="loading" @change="handleTableChange"
             :scroll="{ y: 230 }">
      <template slot="roles" slot-scope="text, record">
        <span v-for="(item, index) in text" :key="index"> {{item.name}}</span>
      </template>
      <template slot="status" slot-scope="text, record">
        <a-badge status="success"  v-if="text===1"/>
        <a-badge status="default"  v-if="text===2"/>
        <span v-if="text===1">启用</span>
        <span v-if="text===2">停用</span>
      </template>
      <template slot="created" slot-scope="text, record">
        <span>{{text.split('T')[0]}} {{text.split('T')[1].split('+')[0]}}</span>
      </template>
      <template slot="operation" slot-scope="text, record">
        <!--        <a-button size="small">查看</a-button>-->
        <a-button v-if="record.status === 2" :loading="enableBtnLoading[record.record_id]"
                  @click="onEnable(record.record_id)"
                  size="small" type="primary">启用</a-button>
        <a-button v-if="record.status === 1" :loading="disableBtnLoading[record.record_id]"
                  @click="onDisable(record.record_id)"
                  size="small" type="danger">停用</a-button>
        <a-button size="small" @click="onEdit(record)">编辑</a-button>
        <a-popconfirm v-if="data.length" title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button :loading="deleteBtnLoading[record.record_id]" type="danger" ghost size="small">删除</a-button>
        </a-popconfirm>
      </template>
      <!--      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.record_id}}</p>-->
    </a-table>
    <!--    想要直接在列表上显示角色对每个菜单的操作权限，因为这里接口中返回的menus为空，所以先不展示-->
    <sys-user-edit :visible="showEditDrawer" :options="editItem" @close="handleEditDrawClose"></sys-user-edit>
  </div>
</template>
<script>
  import {Table, Icon, Button, Badge, Popconfirm} from 'ant-design-vue'
  import SysUserEdit from '../sys-user-edit/sys-user-edit'

  export default {
    name: 'sys-user-table',
    components: {
      ATable: Table,
      AIcon: Icon,
      ABadge: Badge,
      APopconfirm: Popconfirm,
      AButton: Button,
      SysUserEdit
    },
    props: {
      searchParams: Object,
      createTimes: Number
    },
    watch: {
      // 监听创建表单动作，如果创建完成，进行数据更新
      createTimes(newVal, oldVal) {
        this.fetch(this.searchParams)  // 如果table的查询是分页查询，需要查询条件的时候，这里还是需要将查询条件作为参数穿进去的
      },
      // 监听查询条件变化，用于表单组件和table组件通信
      searchParams: {
        handler(newVal, oldVal) {
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
        enableBtnLoading: {},
        disableBtnLoading: {},
        deleteBtnLoading: {},
        tableHeight: 0,
        columns: [
          {
            title: '用户名',
            dataIndex: 'user_name',
            align: 'center',
            width: '200px'
          },
          {
            title: '真实姓名',
            dataIndex: 'real_name',
            align: 'center',
            width: '200px',
          },
          {
            title: '角色名称',
            dataIndex: 'roles',
            align: 'roles',
            width: '200px',
            scopedSlots: {customRender: 'roles'}
          },
          {
            title: '用户状态',
            dataIndex: 'status',
            align: 'center',
            width: '200px',
            scopedSlots: {customRender: 'status'}
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            align: 'center',
            width: '200px',
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            align: 'center',
            width: '200px',
          },
          {
            title: '创建时间',
            dataIndex: 'created_at',
            align: 'center',
            width: '220px',
            scopedSlots: {customRender: 'created'},
          },
          {
            title: '操作',
            dataIndex: 'record_id',
            align: 'center',
            width: '300px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
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
      onEnable (record_id) {
        this.enableBtnLoading[record_id] = true;
        this.$axios.patch(`users/${record_id}/enable`).then(res => {
          console.log(res)
          if(res.data) {
            this.fetch(this.searchParams);
            notification.success({
              message: '启用成功'
            })
          }
        }).catch(err => {
          console.log(err)
        }).finally((() => {
          console.log('启用请求结束')
          this.enableBtnLoading[record_id] = false;
        }))
      },
      onDisable (record_id) {
        this.disableBtnLoading[record_id] = true;
        this.$axios.patch(`users/${record_id}/disable`).then(res => {
          console.log(res)
          if(res.data) {
            this.fetch(this.searchParams);
            notification.success({
              message: '停用成功'
            })
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          console.log('停用请求结束')
          this.disableBtnLoading[record_id] = false;
        })
      },
      onEdit(item) {
        console.log(item)
        this.showEditDrawer = true;
        this.editItem = item;
        //查询指定roles数据，test
        this.$axios.get('/users/' + item.record_id).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      handleEditDrawClose(action) {
        this.showEditDrawer = false;
        if (action && action === 'updated') {
          this.fetch()
        }
      },
      onDelete(record_id) {  //点击删除
        // console.log(record_id)
        this.deleteBtnLoading[record_id] = true;
        this.$axios.delete('users/' + record_id).then(res => {
          console.log(res)
          if (res.data) {
            //删除成功，同步表格信息
            this.fetch(this.searchParams)
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.deleteBtnLoading[record_id] = false;
        })
      },
      fetch(params = {}) {
        this.loading = true;
        this.$axios.get('/users?q=page', {
          params: {
            ...params
          }
        }).then(res => {
          console.log('get users page', res.data)
          if (res.data) {
            this.data = res.data.list;
            this.pagination = res.data.pagination;
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading = false
        })
      },
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination, filters, sorter);
        const pager = {...this.pagination};
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
