<template>
  <div class="menu-template-wrap">
    <div class="menu-template-title">
      菜单动作管理
    </div>
    <div class="menu-template-table">
      <a-table bordered :dataSource="dataSource" :loading="loading" :columns="columns" :pagination="false" size="middle"
               :rowKey="(record) => {return record.record_id}" :rowSelection="rowSelection" >
<!--        动作权限-->
        <template slot="actions" slot-scope="text, record">
          <a-checkbox-group v-if="!record.children"
                            :value="checkboxSeletedKeys[record.record_id] ? checkboxSeletedKeys[record.record_id].actions : []"
                            @change="onCheckboxChange(record, 'actions', $event)">
            <a-row v-for="(item, index) in text" :key="index">
              <a-col :span="24">
                <a-checkbox :value="item.code">{{item.name}}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </template>
        <template slot="resources" slot-scope="text, record">
          <a-checkbox-group v-if="!record.children"
                            :value="checkboxSeletedKeys[record.record_id] ? checkboxSeletedKeys[record.record_id].resources : []"
                            @change="onCheckboxChange(record, 'resources', $event)">
            <a-row v-for="(item, index) in text" :key="index">
              <a-col :span="24">
                <a-checkbox :value="item.code">{{item.name}}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import {Table, Checkbox, Row, Col} from 'ant-design-vue'
  export default {
    name: "m-role-menus",
    components: {
      ATable: Table,
      ACheckbox: Checkbox,
      ACheckboxGroup: Checkbox.Group,
      ARow: Row,
      ACol: Col,
    },
    data () {
      return {
        dataSource: [],
        selectedRowKeys : [],
        checkboxSeletedKeys: {},
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
    computed : {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onTableChange,
          getCheckboxProps: record => {
            // console.log(record)  //这里的record虽然是本行的数据，但是table会自动吧children去掉，让单条数据只显示本条的基本数据，children直接干到下一层
            return {
              props: {
                disabled: !record.actions && !record.resources, // Column configuration not to be checked
              }
            }
          }
        }
      }
    },
    mounted () {
      this.getMenus();
    },
    methods: {
      onTableChange (selectedRowKeys) {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
        //先置空checkbox选项
        this.checkboxSeletedKeys = {};
        // 选中当前行的时候，将actions和resources设置为选中状态
        for(let i=0; i<selectedRowKeys.length; i++){
          let id = selectedRowKeys[i]
          this.checkboxSeletedKeys[id] = {menu_id: id};
          this.checkboxSeletedKeys[id].actions = this.findSthWithId(id, 'actions', this.dataSource);
          this.checkboxSeletedKeys[id].resources = this.findSthWithId(id, 'resources', this.dataSource);
        }
        //向父组件提交最新数据
        this.$emit('change', this.checkboxSeletedKeys)
      },
      findSthWithId (id, action, list) {
        let result = []
        if(!list) return;
        for (let i=0; i<list.length; i++) {
          if(list[i].record_id == id) {
            // console.log('匹配到', list[i])
            result = [];
            //如果本节点有actions或者resources，并且没有子节点（即为叶子节点）
            if(list[i][action] && !list[i].children) {
              for(let j=0; j<list[i][action].length; j++) {
                result.push(list[i][action][j].code);
              }
            }
            // console.log(list[i][action], result);
            return result;
          }
          if(list[i].children) {
            result = this.findSthWithId(id,action, list[i].children)
          }
        }
        return result;
      },
      onCheckboxChange (record, action, checkedValues) {
        // console.log(record, action, checkedValues)
        //  想办法让value能够深度监听 --- 自己封装组件？
        //  --- no: 直接让temp保存一下checkboxSeletedKeys,然后重置一下，这样checkbox-group的value就能监听到他的变化了
        let temp = this.checkboxSeletedKeys;
        this.checkboxSeletedKeys = {};
        this.checkboxSeletedKeys = temp;
        if(!this.checkboxSeletedKeys[record.record_id]) {
          this.checkboxSeletedKeys[record.record_id] = {
            menu_id: record.record_id,
            actions: [],
            resources: []
          };
        }
        this.checkboxSeletedKeys[record.record_id][action] = checkedValues;
        //向父组件提交最新数据
        this.$emit('change', this.checkboxSeletedKeys)
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
            console.log(res.data.list)
            this.dataSource = res.data.list;
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading= false
        })
      },
      // 如果是用直接的checkgroup的话，指定的value值和name值的key是固定的，所以需要通过递归给每个对象添加value值，而现在采用直接的v-for生成checkbox列表的方式，所以不需要了
      // formatMenu (list) {
      //   // console.log(list)
      //   // 第一层循环获取到的menu最外层
      //   for(let i=0; i<list.length; i++){
      //     list[i].actions && (list[i].actions = this.addValueInList(list[i].actions));
      //     list[i].resources && (list[i].resources = this.addValueInList(list[i].resources));
      //     if(list[i].children) {
      //       // 如果有子节点，进行递归调用
      //       this.formatMenu(list[i].children);
      //     }
      //   }
      // },
      // // 因涉及到checkbox中的option只能识别key值为value的字段，所以需要将我们的数据封装到value中 （使用递归）
      // addValueInList (arr) {
      //   if(arr) {
      //     for(let i=0; i<arr.length; i++) {
      //       arr[i].value = arr[i].code;
      //     }
      //   }
      //   return arr;
      // }
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
