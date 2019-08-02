<template>
  <div>
    <a-table :columns="columns" :rowKey="record => record.record_id"
             :dataSource="data" :pagination="false" :loading="loading"
             :scroll="{ y: 450 }">
      <template slot="icon" slot-scope="icon">
        <a-icon :type="icon"></a-icon> - {{icon}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button size="small">查看</a-button>
        <a-button size="small" @click="onEdit(record)">编辑</a-button>
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
      searchParams: Object,
      createMenuTimes: Number
    },
    watch: {
      // 监听创建表单动作，如果创建完成，进行数据更新
      createMenuTimes (newVal, oldVal) {
        this.fetch()  // 如果table的查询是分页查询，需要查询条件的时候，这里还是需要将查询条件作为参数穿进去的
      },
      // 监听查询条件变化，用于表单组件和table组件通信
      searchParams: {
        handler (newVal, oldVal) {
          // console.log(newVal, oldVal)
          this.fetch(newVal);
        },
        deep: true
      },
      //监听vuex中menuList变化，有变化及时更新
      '$store.state.menuList'(newVal, oldVal){
        // console.log(newVal, oldVal)
        //监听vuex中menuList变化，从而对导航栏进行重置
        this.data = newVal;
      }
    },
    data() {
      return {
        data: [],
        selectedRowKeys: [],
        loading: false,
        tableHeight: 0,
        columns: [
          {
            title: '菜单名称',
            dataIndex: 'name',
            align: 'left',
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
            align: 'left',
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
      // let routerWrapDOM = document.querySelector('.index-content-wrap.ant-layout-content');
      // let wrapHeight = routerWrapDOM.clientHeight;
      // console.log(routerWrapDOM, wrapHeight)
      // this.tableHeight = wrapHeight - 115;
    },
    methods: {
      onEdit(item){
        console.log(item)
      },
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
            this.$store.commit('setMenuList',res.data.list);
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
