<template>
  <div>
    <a-table :columns="columns" :rowKey="record => record.record_id"
             :pagination="pagination" size="middle"
             :dataSource="data" :loading="loading"  @change="handleTableChange"
             :scroll="scroll" ref="table">
      <template slot="operation" slot-scope="text, record">
<!--        <a-button size="small">查看</a-button>-->
        <a-button size="small" @click="onEdit(record)">编辑</a-button>
        <a-popconfirm v-if="data.length" title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button type="danger" ghost size="small">删除</a-button>
        </a-popconfirm>
      </template>
<!--      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.record_id}}</p>-->
    </a-table>
<!--    想要直接在列表上显示角色对每个菜单的操作权限，因为这里接口中返回的menus为空，所以先不展示-->
    <sys-role-edit :visible="showEditDrawer" :options="editItem" @close="handleEditDrawClose"></sys-role-edit>
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
        scroll: {},
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name',
            align: 'center',
            width: '200px',
            // customRender: (text, row, index) =>{
            //   return <a-button type='primary' size='small'>{text}</a-button>;
            // }
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
      this.setTableScroll()
      // 监听window的resize方法，并加入防抖函数
      window.addEventListener('resize', window.$debounce(() => {
          this.setTableScroll();
        }, 200)
        , false)
    },
    methods: {
      // 设置table的默认Scroll
      setTableScroll() {
        setTimeout(() => {
          if(!this.$refs.table) return;
          let tableTop = this.$refs.table.$el.offsetTop  // table距离文档顶端距离
          let viewTop = document.querySelector('.router-wrap').offsetTop   // router-view距离文档顶端距离
          let viewHeight = document.querySelector('.router-wrap').clientHeight // router-view高度
          // console.log(this.$refs.table.$el, tableTop)
          // console.log(document.querySelector('.router-wrap'), viewTop, viewHeight)
          this.scroll = {
            y :  viewHeight - (tableTop - viewTop) - 45 - 60 // 减去的45为table的header高度, 60为pagination高度
          }
        }, 10)

      },
      onEdit(item){
        console.log(item)
        this.showEditDrawer = true;

        //查询指定roles数据，test
        this.$axios.get('/roles/'+item.record_id).then(res => {
          console.log('edit item :', res.data)
          if(res.data) {
            this.editItem = res.data;
          }

        }).catch(err => {
          console.log(err)
        })
      },
      handleEditDrawClose (action) {
        this.showEditDrawer = false;
        if(action && action == 'updated') {
          this.fetch()
        }
      },
      onDelete (record_id) {  //点击删除
        console.log(record_id)
        this.$axios.delete('roles/' + record_id).then(res => {
          console.log('delete',res.data)
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
