<template>
  <div>
    <div style="margin: 15px 0; text-align: right;">
      <a-button v-if="options.operation.create.showBtn" type="primary" icon="plus"
                @click="onCreate">新增</a-button>
    </div>
    <m-create :visible="showCreateDrawer" :options="options.operation.create" @close="handleCreateDrawClose"></m-create>
    <a-table :columns="columns" :rowKey="eval(options.rowKeys)"
             :dataSource="dataList" :pagination="pagination"
             :size="options.attribute.size" :bordered="options.attribute.bordered" :scroll="options.attribute.scroll"
             :showHeader="options.attribute.showHeader === undefined ? true : options.attribute.showHeader"
             :loading="loading" @change="handleTableChange"
    >
      <template slot="operation" slot-scope="text, record">
        <!--        <a-button size="small">查看</a-button>-->
        <a-button v-if="options.operation.edit.showBtn" size="small" @click="onEdit(record)">编辑</a-button>
        <a-popconfirm v-if="options.operation.delete.showBtn" title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button type="danger" ghost size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
  import {Table, Button, Popconfirm, Icon, Notification} from 'ant-design-vue'
  import MCreate from './m-create/m-create'
  import MEdit from './m-edit/m-edit'
  export default {
    name: 'm-table',
    components: {
      ATable: Table,
      AButton: Button,
      APopconfirm: Popconfirm,
      AIcon: Icon,
      MCreate,
      MEdit
    },
    props: {
      options: Object
    },
    computed: {
      dataList() {
        return this.options.isRemote ? this.data : this.options.data;
      },
      columns() {
        let res = [];
        for(let i = 0; i < this.options.columns.length; i++){
          let oldItem = this.options.columns[i];
          let newItem  = oldItem;
          if(oldItem.customRender) {
            newItem.customRender = eval(oldItem.customRender);
          }
          res.push(newItem)
        }
        return res;
      }
    },
    watch: {
      'options.params' (newVal) {
        console.log('table 得到通知', newVal);
        this.fetch(newVal);
      }
    },
    data() {
      return {
        // 如果采用远程请求数据模式，这里的data在远程获取数据后进行修改
        data: [],
        pagination: this.options.pagination,
        loading: false,
        showCreateDrawer: false,
        showEditDrawer: false,
      }
    },
    mounted() {
      // 参数params为query组件传进来的搜索条件或者配置文件里边给出的
      this.options.isRemote && this.fetch(this.options.params);
    },
    methods: {
      onCreate () {
        this.showCreateDrawer = true;
      },
      onEdit (record) {
        console.log(record)
      },
      onDelete (record_id) {},
      handleCreateDrawClose (action) {
        console.log('action', action)
        this.showCreateDrawer = false;
        if(action && action == 'created') {
          //如果是创建完成，刷新列表
          this.fetch(this.options.params);
        }
      },
      handleTableChange (pagination, filters, sorter) {
        console.log(pagination);
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
      fetch (params = {}) {
        console.log('params:', params);
        this.loading = true
        this.$axios.get(this.options.dataUrl,{
          params: {
            results: 10,
            ...params,
          }
        }).then((res) => {
          let data = res.data;
          console.log('get table list', data)
          // const pagination = { ...this.pagination };
          this.loading = false;
          this.data = data.list;
          this.pagination = data.pagination;
        });
      },
      eval(code) {
        let res = null
        try{
          res = eval(code);
        }catch (e) {
          Notification.error({
            message: 'rowKeys函数配置错误'
          })
        }
        return res;
      }
    },
  }
</script>
