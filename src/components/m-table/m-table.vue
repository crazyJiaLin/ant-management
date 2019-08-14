<template>
  <div :style="options.attribute.wrapperStyle">
    <div style="width: 100%; margin: 15px 0; text-align: right;">
      <a-button v-if="options.operation && options.operation.create && options.operation.create.showBtn"
                :disabled="!isInActions('create')"
                type="primary" icon="plus"
                @click="onCreate">新增</a-button>
    </div>
    <m-create :visible="showCreateDrawer" :options="options.operation ? options.operation.create : {}"
              @close="handleCreateDrawClose"></m-create>
    <m-edit :visible="showEditDrawer" :options="options.operation ? options.operation.edit : {}"
            :record="editRecord" @close="handleEditDrawClose"></m-edit>
    <a-table :columns="columns" :rowKey="rowKey" :style="options.attribute.tableStyle"
             :dataSource="dataList" :pagination="pagination"
             :size="options.attribute.size" :bordered="options.attribute.bordered"
             :scroll="options.attribute.scroll"
             :showHeader="options.attribute.showHeader === undefined ? true : options.attribute.showHeader"
             :loading="loading" @change="handleTableChange"
    >
      <template slot="status" slot-scope="text, record">
        <div class="status_circle1" v-if="text===1"></div>
        <div class="status_circle2" v-if="text===2"></div>
        <span v-if="text===1">启用</span>
        <span v-if="text===2">停用</span>
      </template>
      <template slot="operation" slot-scope="text, record">
        <!--        <a-button size="small">查看</a-button>-->
        <a-button v-if="record.status === 2 && options.operation && options.operation.enable && options.operation.enable.showBtn"
                  :disabled="!isInActions('enable')" :loading="enableBtnLoading[record.record_id]"
                  @click="onEnable(record.record_id)"
                  size="small" type="primary">启用</a-button>
        <a-button v-if="record.status === 1 && options.operation && options.operation.disable && options.operation.disable.showBtn"
                  :disabled="!isInActions('edit')" :loading="disableBtnLoading[record.record_id]"
                  @click="onDisable(record.record_id)"
                  size="small" type="danger">停用</a-button>
        <a-button v-if="options.operation && options.operation.edit && options.operation.edit.showBtn"
                  :disabled="!isInActions('edit')"
                  size="small" @click="onEdit(record)">编辑</a-button>
        <a-popconfirm v-if="options.operation && options.operation.delete && options.operation.delete.showBtn"
                      :disabled="!isInActions('delete')"
                      title="确认删除此条数据?" okText="确定" cancelText="取消"
                      @confirm="() => onDelete(record.record_id)">
          <a-button :loading="deleteBtnLoading[record.record_id]" type="danger" ghost size="small">删除</a-button>
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
      rowKey () {
        return $eval(this.options.rowKeys, 'rowKeyRender')
      },
      dataList() {
        return this.options.isRemote ? this.data : this.options.data;
      },
      columns() {
        let res = [];
        for(let i = 0; i < this.options.columns.length; i++){
          let oldItem = this.options.columns[i];
          let newItem  = oldItem;
          if(oldItem.customRender) {
            newItem.customRender = $eval(oldItem.customRender, 'customRender');
          }
          res.push(newItem)
        }
        return res;
      },
      actions(){
        return this.$store.state.curMenu.actions;
      },
      resources(){
        return this.$store.state.curMenu.resources;
      }
    },
    watch: {
      'options.params' (newVal) {
        // console.log('table 得到通知', newVal);
        this.fetch(newVal);
      }
    },
    data() {
      return {
        // 如果采用远程请求数据模式，这里的data在远程获取数据后进行修改
        data: [],
        pagination: this.options.pagination,
        loading: false,
        enableBtnLoading: {},
        disableBtnLoading: {},
        deleteBtnLoading: {},
        showCreateDrawer: false,
        showEditDrawer: false,
        editRecord: {}
      }
    },
    mounted() {
      // 参数params为query组件传进来的搜索条件或者配置文件里边给出的
      this.options.isRemote && this.fetch(this.options.params);
      console.log('actions', this.actions)
      console.log('resources', this.resources)
    },
    methods: {
      onEnable (record_id) {
        if(this.options.operation.enable && this.options.operation.enable.form) {
          let beforeEnable = $eval(this.options.operation.enable.form.beforeSubmit, 'beforeEnable');
          beforeEnable(record_id);
        }
        let resource = this.findResourceByCode('enable');
        if (!resource) return message.warn('您还没有配置enable资源');
        // 替换id
        let url = resource.path.replace(/:id/g, record_id)
        let method = resource.method.toLowerCase()
        console.log('开始发请求enable', method, url)
        this.enableBtnLoading[record_id] = true
        this.$axios[method](url).then(res => {
          console.log(res)
          if(res.data) {
            this.fetch(this.options.params);
            notification.success({
              message: '启用成功'
            })
          }
        }).catch(err => {
          console.log(err)
        }).finally((() => {
          this.enableBtnLoading[record_id] = false;
        }))
      },
      onDisable (record_id) {
        if(this.options.operation.disable && this.options.operation.disable.form){
          let beforeDisable = $eval(this.options.operation.disable.form.beforeSubmit, 'beforeDisable');
          beforeDisable(record_id);
        }
        let resource = this.findResourceByCode('disable');
        if (!resource) return message.warn('您还没有配置disable资源');
        // 替换id
        let url = resource.path.replace(/:id/g, record_id)
        let method = resource.method.toLowerCase()
        console.log('开始发请求disable', method, url)
        this.disableBtnLoading[record_id] = true;
        this.$axios[method](url).then(res => {
          console.log(res)
          if(res.data) {
            this.fetch(this.options.params);
            notification.success({
              message: '停用成功'
            })
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.disableBtnLoading[record_id] = false;
        })
      },
      onCreate () {
        this.showCreateDrawer = true;
      },
      onEdit (record) {
        // console.log(record)
        this.showEditDrawer = true;
        this.editRecord = record;
      },
      onDelete (record_id) {
        if(this.options.operation.delete && this.options.operation.delete.form) {
          let beforeDelete = $eval(this.options.operation.delete.form.beforeSubmit, 'beforeDelete');
          beforeDelete(record_id);
        }
        let resource = this.findResourceByCode('delete');
        if (!resource) return message.warn('您还没有配置delete资源');
        // console.log('找到delete匹配项', resource)
        // 替换id
        let url = resource.path.replace(/:id/g, record_id)
        let method = resource.method.toLowerCase()
        // console.log('开始发请求', method, url)
        this.deleteBtnLoading[record_id] = true;
        this.$axios[method](url).then(res => {
          console.log(res)
          if(res.data) {
            this.fetch(this.options.params);
            notification.success({
              message: '删除成功'
            })
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.deleteBtnLoading[record_id] = false;
        })
      },
      handleCreateDrawClose (action) {
        this.showCreateDrawer = false;
        if(action && action == 'created') {
          //如果是创建完成，刷新列表
          this.fetch(this.options.params);
        }
      },
      handleEditDrawClose (action) {
        this.showEditDrawer = false;
        if(action && action == 'updated') {
          this.fetch(this.options.params);
        }
      },
      fetch (params = {}) {
        // console.log('params:', params);
        let resource = this.findResourceByCode('query');
        if (!resource) return message.warn('您还没有配置query资源');
        // console.log('找到delete匹配项', resource)
        // 替换id
        let url = resource.path
        let method = resource.method.toLowerCase()
        this.loading = true
        console.log('开始请求table数据', method, url)
        this.$axios[method](url,{
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
      // 根据code查找resources
      findResourceByCode (code) {
        if(!code || !this.resources) return null;
        for(let i=0; i<this.resources.length; i++) {
          let item = this.resources[i];
          if(item.code === code) {
            return item;
          }
        }
        return null;
      },
      // 判断参数action是否是本菜单actions的code中一项
      isInActions (action) {
        if(!this.actions) return false;
        for(let i=0; i<this.actions.length; i++) {
          if(action === this.actions[i].code) {
            return true;
          }
        }
        return false;
      },
      eval(code) {
        return window.$eval(code)
      },
      handleTableChange (pagination, filters, sorter) {
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
<style lang="less" scoped>
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
