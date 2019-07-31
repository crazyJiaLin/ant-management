<template>
  <div>
    <a-table :columns="columns" :rowKey="record => record.record_id"
             :dataSource="data" :pagination="false" :loading="loading">
      <template slot="icon" slot-scope="icon">
        <a-icon :type="icon"></a-icon> - {{icon}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button size="small">查看</a-button>
        <a-button size="small">编辑</a-button>
        <a-popconfirm v-if="data.length" title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button type="danger" ghost size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
  import {Table, Icon, Button, Popconfirm} from 'ant-design-vue'

  export default {
    name: 'sys-menu-table',
    components: {
      ATable: Table,
      AIcon: Icon,
      APopconfirm: Popconfirm,
      AButton: Button
    },
    props: {
      searchParams: Object
    },
    watch: {
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
        data: [],
        selectedRowKeys: [],
        loading: false,
        columns: [
          {
            title: '菜单名称',
            dataIndex: 'name',
            align: 'center',
          }, {
            title: '排序值',
            dataIndex: 'sequence',
            align: 'center',
            width: '20%',
          }, {
            title: '隐藏状态',
            dataIndex: 'hidden',
            align: 'center',
            customRender (text) {
              return text == 0 ? '显示' : '隐藏';
            }
          }, {
            title: '图标',
            dataIndex: 'icon',
            align: 'center',
            scopedSlots: { customRender: 'icon' },
          }, {
            title: '操作者',
            dataIndex: 'creator',
            align: 'center'
          }, {
            title: '操作',
            dataIndex: 'record_id',
            // fixed: 'right',
            width: '250px',
            align: 'center',
            scopedSlots: { customRender: 'operation' },
          }],
      }
    },
    mounted() {
      this.fetch();
    },
    methods: {
      onDelete (record_id) {  //点击删除
        console.log(record_id)
        this.$axios.delete('menus/' + record_id).then(res => {
          console.log(res)
          if(res.data){
            //删除成功，同步表格信息
            this.fetch()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      fetch (params = {}) {
        this.loading = true;
        this.$axios.get('/menus?q=tree',{
          params: {
            ...params
          }
        }).then(res => {
          console.log('get menu page',res.data)
          if(res.data) {
            this.data = res.data.list;
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
