<template>
  <div>
    <a-table :columns="columns" :rowKey="record => record.record_id" size="middle"
             :dataSource="data" :pagination="false" :loading="loading"
             :scroll="scroll" ref="table">
      <template slot="icon" slot-scope="icon">
        <a-icon :type="icon"></a-icon> - {{icon}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button size="small" @click="onEdit(record)">编辑</a-button>
        <a-button size="small" @click="configMenu(record)" v-if="!isInBaseMenus(record)">配置菜单</a-button>
        <a-popconfirm v-if="data.length" title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button type="danger" ghost size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <sys-menu-edit :visible="showEditDrawer" :options="editItem" @close="handleEditDrawClose"></sys-menu-edit>
    <sys-menu-templates :visible="showTemplatesDrawer" :menu-id="templatesMenuId" @close="handleTemplatesClose"></sys-menu-templates>
  </div>
</template>
<script>
  import {Table, Icon, Button, Popconfirm} from 'ant-design-vue'
  import SysMenuEdit from '../sys-menu-edit/sys-menu-edit'
  import SysMenuTemplates from '../sys-menu-templates/sys-menu-templates'
  export default {
    name: 'sys-menu-table',
    components: {
      ATable: Table,
      AIcon: Icon,
      APopconfirm: Popconfirm,
      AButton: Button,
      SysMenuEdit,
      SysMenuTemplates
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
        showEditDrawer: false,
        showTemplatesDrawer: false,
        editItem: {},
        templatesMenuId: '',
        data: [],
        baseMenus: ['首页','系统管理', '菜单管理', '角色管理', '用户管理'],
        loading: false,
        tableHeight: 0,
        scroll: {},
        columns: [
          {
            title: '菜单名称',
            dataIndex: 'name',
            align: 'left',
            width: '230px',
          }, {
            title: '排序值',
            dataIndex: 'sequence',
            align: 'center',
            width: '100px',
          }, {
            title: '隐藏状态',
            dataIndex: 'hidden',
            align: 'center',
            width: '200px',
            customRender (text) {
              return text == 0 ? '显示' : '隐藏';
            }
          }, {
            title: '图标',
            dataIndex: 'icon',
            align: 'left',
            scopedSlots: { customRender: 'icon' },
          },
          // {
          //   title: '操作者',
          //   dataIndex: 'creator',
          //   align: 'center'
          // },
          {
            title: '操作',
            dataIndex: 'record_id',
            // fixed: 'right',
            width: '300px',
            align: 'center',
            scopedSlots: { customRender: 'operation' },
          }],
      }
    },
    mounted() {
      this.fetch()
      this.setTableScroll()
      // 监听window的resize方法，并加入防抖函数
      window.addEventListener('resize', window.$debounce(() => {
          this.setTableScroll();
          console.log(this)
        }, 200)
        , false)
    },
    methods: {
      // 设置table的默认Scroll
      setTableScroll() {
        setTimeout(() => {
          let tableTop = this.$refs.table.$el.offsetTop  // table距离文档顶端距离
          let viewTop = document.querySelector('.router-wrap').offsetTop   // router-view距离文档顶端距离
          let viewHeight = document.querySelector('.router-wrap').clientHeight // router-view高度
          console.log(this.$refs.table.$el, tableTop)
          console.log(document.querySelector('.router-wrap'), viewTop, viewHeight)
          this.scroll = {
            y :  viewHeight - (tableTop - viewTop) - 70 // 减去的54为table的header高度
          }
        }, 10)

      },
      // 配置菜单
      configMenu (item) {
        // console.log('配置菜单', item)
        this.showTemplatesDrawer = true;
        this.templatesMenuId = item.record_id;
      },
      isInBaseMenus(record){
        // console.log(record.name, record.children)
        if(record.children) return true;
        let menuName = record.name;
        for(let i=0; i<this.baseMenus.length; i++) {
          if(menuName == this.baseMenus[i]) {
            return true;
          }
        }
        return false;


      },
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
      handleTemplatesClose (action) {
        this.showTemplatesDrawer = false;
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
        this.$axios.get('menus?q=tree',{
          params: {
            include_actions: 1,
            include_resources: 1,
            ...params
          }
        }).then(res => {
          console.log('get menu page',res.data)
          if(res.data) {
            this.data = res.data.list;
            // 不更新了，因为在n-nav中我们的菜单是通过current/menutree请求拿到的针对当前用户的菜单树，而不是所有菜单树
            // this.$store.commit('setMenuList',res.data.list);
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
