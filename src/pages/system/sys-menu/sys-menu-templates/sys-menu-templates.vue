<template>
  <a-drawer
    title="配置菜单模板"
    :width="720"
    @close="onClose"
    :visible="visible"
    wrapClassName="sys-menu-create-wrap">
    <div class="template-tool-btn">
      <a-button icon="plus" size="small" type="primary" @click="onCreate">新增</a-button>
    </div>
    <a-table :columns="columns" :rowKey="record => record.record_id" :pagination="pagination" size="small" bordered
             :dataSource="data" :loading="loading"  @change="handleTableChange">
      <template slot="template" slot-scope="text, record">
        <p class="template-text" :title="text">{{text}}</p>
      </template>
      <template slot="status" slot-scope="text, record">
        <div class="status_circle1" v-if="text===1"></div>
        <div class="status_circle2" v-if="text===2"></div>
        <span v-if="text===1">启用</span>
        <span v-if="text===2">停用</span>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button size="small" :type="record.status === 1 ? 'danger' : 'primary'" @click="updateStatus(record, record.status === 1 ? 2 : 1)">
          {{record.status === 1 ? '停用' : '启用'}}
        </a-button>
        <a-button size="small" @click="onEdit(record)">编辑</a-button>
        <a-popconfirm v-if="data.length" title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <template-create :visible="showCreate" :menu-id="menuId" @close="handleCreateClose"></template-create>
    <template-edit :visible="showEdit" :options="editItem" @close="handleEditClose"></template-edit>
  </a-drawer>
</template>

<script>
  import TemplateCreate from './template-create/template-create'
  import TemplateEdit from './template-edit/template-edit'
  import {Button, Drawer, Icon, Table, Popconfirm} from 'ant-design-vue'
  export default {
    name: "sys-menu-templates",
    components: {
      AButton: Button,
      ADrawer: Drawer,
      ATable: Table,
      AIcon: Icon,
      APopconfirm: Popconfirm,
      TemplateCreate,
      TemplateEdit
    },
    props: {
      visible: Boolean,
      menuId: String
    },
    watch : {
      menuId(newVal, oldVal){
        // 监听到数据变化后，通过menuId查询template
        console.log(newVal)
        this.fetch();
      }
    },
    data () {
      return {
        data: [],
        pagination: {
          size: 'small'
        },
        showEdit: false,
        editItem: {},
        showCreate: false,
        loading: false,
        columns: [
          {
            title: '模板',
            dataIndex: 'template',
            align: 'center',
            width: '300px',
            // 数据单行显示，超出省略号
            scopedSlots: {customRender: 'template'}
          }, {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            width: '100px',
            scopedSlots: { customRender: 'status' },
          },
          {
            title: '操作',
            dataIndex: 'record_id',
            // fixed: 'right',
            align: 'center',

            scopedSlots: { customRender: 'operation' },
          }
        ],
      }
    },
    methods : {
      updateStatus (record, status) {
        // console.log(record, status)
        if(status == 2) {
          //停用
          this.$axios.put('/templates/'+record.record_id, {
            status : status
          }).then(res => {
            console.log(res)
            if(res.data) {
              this.fetch()
            }
          }).catch(err => {
            console.log(err)
          })
        }else if(status == 1) {
          //启用
          this.$axios.patch(`/templates/${record.record_id}/enable`).then(res => {
            console.log(res)
            if(res.data) {
              this.fetch()
            }
          }).catch(err => {
            console.log(err)
          })
        }

      },
      onDelete (record_id) {  //点击删除
        // console.log(record_id)
        this.$axios.delete('templates/' + record_id).then(res => {
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
        this.$axios.get('/templates?q=page',{
          params: {
            menu_id: this.menuId,
            ...params
          }
        }).then(res => {
          console.log('get templates page',res.data)
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
        // console.log(pagination, filters, sorter);
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
      onClose() {
        this.$emit('close');
      },
      // 子组件操作
      handleCreateClose (action) {
        this.showCreate = false;
        if(action && action == 'created'){
          this.fetch()
        }
      },
      handleEditClose (action) {
        this.showEdit = false;
        if(action && action == 'updated') {
          this.fetch()
        }
      },
      onEdit(item){
        // console.log('编辑',item)
        this.editItem = item;
        this.showEdit = true;
      },
      onCreate(){
        // console.log('新增')
        this.showCreate = true;
      },
    }
  }
</script>

<style scoped lang="less">
  .template-tool-btn {
    padding-bottom: 15px;
    text-align: right;
  }
  .template-text {
    width: 320px;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
  .status_circle1{
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #52c41a;
    display: inline-block;
  }
  .status_circle2{
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f5222d;
    display: inline-block;
  }

</style>
