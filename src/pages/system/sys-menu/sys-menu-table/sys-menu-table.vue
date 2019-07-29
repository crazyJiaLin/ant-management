<template>
  <a-table :columns="columns"
           :rowKey="record => record.record_id"
           :dataSource="data"
           :pagination="pagination"
           :loading="loading"
           @change="handleTableChange"
  >
    <template slot="icon" slot-scope="icon">
      <a-icon :type="icon"></a-icon>
    </template>
    <template slot="operation" slot-scope="text, record">
      <a-popconfirm
        v-if="data.length"
        title="Sure to delete?"
        @confirm="() => onDelete(record.record_id)">
        <a href="javascript:;">删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
  import {Table, Icon, Popconfirm} from 'ant-design-vue'

  export default {
    name: 'sys-menu-table',
    mounted() {
      // this.fetch();
      this.fetch2();
    },
    data() {
      return {
        data: [],
        pagination: {
          current: 1,
          pageSize: 3
        },
        loading: false,
        columns: [{
          title: '菜单名称',
          dataIndex: 'name',
          // sorter: (a,b) => {
          //   return -1;
          // },
          // sortOrder: 'descend',
          width: '20%',
          fixed: 'left',
          // scopedSlots: { customRender: 'name' },
        }, {
          title: '排序值',
          dataIndex: 'sequence',
          // filters: [
          //   { text: 'Male2', value: 'male' },
          //   { text: 'Female2', value: 'female' },
          // ],
          width: '20%',
        }, {
          title: '隐藏状态',
          dataIndex: 'hidden',
        }, {
          title: '图标',
          dataIndex: 'icon',
          scopedSlots: { customRender: 'icon' },
        }, {
          title: '操作',
          dataIndex: 'record_id',
          scopedSlots: { customRender: 'operation' },
        }],
      }
    },
    components: {
      ATable: Table,
      AIcon: Icon,
      APopconfirm: Popconfirm
    },
    methods: {
      onDelete (record_id) {
        console.log(record_id)
      },
      handleTableChange (pagination, filters, sorter) {
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch2({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch2 (params = {}) {
        this.loading = true;
        this.$axios.get('/menus?q=page',{
          params: {
            current : this.pagination.current,
            pageSize : this.pagination.pageSize
          }
        }).then(res => {
          console.log('get menu page',res.data)
          if(res.data) {
            this.data = res.data.list;
            this.pagination = res.data.pagination;
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading= false
        })
      }
    },
  }
</script>
