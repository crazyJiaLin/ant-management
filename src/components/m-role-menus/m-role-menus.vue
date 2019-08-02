<template>
  <div class="menu-template-wrap">
    <div class="menu-template-title">
      菜单动作管理
    </div>
    <div class="menu-template-table">
      <a-table bordered :dataSource="dataSource" :loading="loading" :columns="columns" :pagination="false" size="middle"
               :rowKey="(record) => {return record.record_id}">
        <template slot="actions" slot-scope="text, record">
          <a-checkbox-group  @change="onCheckboxChange(text, record)">
            <span slot="label" slot-scope="{value}">{{text.code}}</span>
          </a-checkbox-group>
        </template>
        <template slot="resources" slot-scope="text, record">
          {{1}}
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import {Table, Checkbox} from 'ant-design-vue'
  export default {
    name: "m-role-menus",
    components: {
      ATable: Table,
      ACheckboxGroup: Checkbox.Group
    },
    data () {
      return {
        dataSource: [],
        actionsOptions: [
          {
            label: 'name',
            value: 'code',
          }
        ],
        columns: [
          {
            title: '菜单名称',
            dataIndex: 'name',
            align: 'left',
          },
          {
            title: '动作权限',
            dataIndex: 'actions',
            scopedSlots: { customRender: 'actions' }
          },
          {
            title: '资源权限',
            dataIndex: 'resources',
            scopedSlots: { customRender: 'resources' }
          }
        ],
        loading: false
      }
    },
    mounted () {
      this.getMenus();
    },
    methods: {
      onCheckboxChange (text, record, checkedValues) {
        console.log(text, record, checkedValues)
      },
      getMenus () {
        this.loading = true;
        this.$axios.get('/menus?q=tree',{
          params: {
            include_actions: 1,
            include_resources: 1,
          }
        }).then(res => {
          console.log('get menus',res.data)
          if(res.data) {
            this.dataSource = res.data.list;
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading= false
        })
      }
    }
  }
</script>

<style scoped>
  .menu-template-title {
    height: 50px;
    box-sizing: border-box;
    padding: 0 15px;
    line-height: 50px;
    font-size: 16px;
    color: #555;
    border-bottom: 1px solid #e8e8e8;
  }
  .menu-template-table {
    box-sizing: border-box;
    padding: 20px 15px 0;
  }
</style>
