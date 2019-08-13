<template>
  <div class="menu-template-wrap">
    <div class="menu-template-title">
      菜单动作管理
    </div>
    <div class="menu-template-table">
      <a-table bordered :dataSource="dataSource" :loading="loading" :columns="columns" :pagination="false" size="middle"
               :rowKey="(record) => {return record.record_id}" :rowSelection="rowSelection">
        <!--        动作权限-->
        <template slot="actions" slot-scope="text, record">
          <a-checkbox-group v-if="!record.children"
                            :value="checkboxSelectedKeys[record.record_id] ? checkboxSelectedKeys[record.record_id].actions : []"
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
                            :value="checkboxSelectedKeys[record.record_id] ? checkboxSelectedKeys[record.record_id].resources : []"
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
    props: {
      submitTimes: Number,
      defaultValue: Array
    },
    watch: {
      submitTimes(newVal, oldVal) {
        // console.log(newVal, oldVal);
        // 创建成功，需要将本组件重置
        this.selectedRowKeys = [];
        this.checkboxSelectedKeys = {};
      },
      defaultValue(newVal, oldVal) {
        // console.log('role-menu接受到默认数据defaultValue1', newVal);
        if (!newVal || newVal.length <= 0) return;
        // 将父组件传来的值更改数据格式后赋值给当前table的选择数组和checkbox选中状态
        this.selectedRowKeys = [];
        this.checkboxSelectedKeys = {};
        for (let i = 0; i < newVal.length; i++) {
          let item = newVal[i];
          // ---放弃---（因为一些菜单没有actions和resources也需要展示） // 如果这条数据里actions和resources都没有的话，直接进入下一次循环
          // if (!item.actions && !item.resources) continue;
          // 设置table选中状态
          this.selectedRowKeys.push(item.menu_id);
          // 设置checkbox选中状态
          this.checkboxSelectedKeys[item.menu_id] = {
            menu_id: item.menu_id,
            actions: [],
            resources: []
          };
          item.actions && (this.checkboxSelectedKeys[item.menu_id].actions = item.actions);
          item.resources && (this.checkboxSelectedKeys[item.menu_id].resources = item.resources);
        }
      }
    },
    data() {
      return {
        dataSource: [],
        selectedRowKeys: [],
        checkboxSelectedKeys: {},
        columns: [
          {
            title: '菜单名称',
            dataIndex: 'name',
            align: 'left',
          },
          {
            title: '动作权限',
            dataIndex: 'actions',
            scopedSlots: {customRender: 'actions'}
          },
          {
            title: '资源权限',
            dataIndex: 'resources',
            scopedSlots: {customRender: 'resources'}
          }
        ],
        loading: false
      }
    },
    computed: {
      rowSelection() {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onTableChange,
          getCheckboxProps: record => {
            // console.log(record)  //这里的record虽然是本行的数据，但是table会自动吧children去掉，让单条数据只显示本条的基本数据，children直接干到下一层
            return {
              props: {
                // 这样首页没有配置acitons而不可选，所以不采用disabled
                // disabled: !record.actions && !record.resources, // Column configuration not to be checked
              }
            }
          }
        }
      }
    },
    mounted() {
      this.getMenus();
    },
    methods: {
      onTableChange(selectedRowKeys, selectedRows) {
        // console.log('选择的数据', selectedRowKeys, selectedRows);
        // console.log('组件原始data', this.selectedRowKeys, this.checkboxSelectedKeys)
        /**
         * 点击选择后，只有最后一层是当前新增的，不要修改其他层的； 点击取消后，只有最后一层的数据去掉，其他的不需要动
         * 1 当选择的数据比原始数据长度大的时，说明是新增，
         * 2 当选择的数据比原始数据长度小，说明是取消全选操作
         */
        if (selectedRowKeys.length >= this.selectedRowKeys.length) {
          // 新增最后一条数据

          //先置空checkbox选项-- 让checkbox-group的value值能够监听到数据变化
          // let temp = this.checkboxSelectedKeys;
          // this.checkboxSelectedKeys = {};
          // this.checkboxSelectedKeys = temp;
          this.selectedRowKeys = selectedRowKeys;
           // item 有问题，selectedRows不是最后一个, 但是selectRowKeys新增的是最后一个，所以用keys最后一个座位key值去rows里边找到对应项
          let item = this.findItemById(selectedRowKeys[selectedRowKeys.length - 1], selectedRows);
          // console.log('新增的选项', selectedRowKeys[selectedRowKeys.length-1], item)
          this.checkboxSelectedKeys[item.record_id] = {
            menu_id: item.record_id,
            actions: item.actions ? this.getCodeArr(item.actions) : [],
            resources: item.resources ? this.getCodeArr(item.resources) : []
          };
        } else {
          // 删除数据
          // 根据selectedRowKeys 和 this.selectedRowKeys进行比对，看看少了哪一项，吧少了的清空
          let cancelId = this.findMissedItem(selectedRowKeys, this.selectedRowKeys);
          // console.log('取消的选项', cancelId)
          if(cancelId) {
            this.selectedRowKeys = selectedRowKeys;
            // 删除checkbox中的选项
            delete  this.checkboxSelectedKeys[cancelId];
            // this.checkboxSelectedKeys[cancelId] = {
            //   menu_id: cancelId,
            //   actions: [],
            //   resources: []
            // }
          }
        }
        //先置空checkbox选项-- 让checkbox-group的value值能够监听到数据变化
        // let temp = this.checkboxSelectedKeys;
        // this.checkboxSelectedKeys = {};
        // this.checkboxSelectedKeys = temp;
        // // 选中当前行的时候，将actions和resources设置为选中状态
        // for(let i=0; i<selectedRows.length; i++){
        //   let item = selectedRows[i]
        //   this.checkboxSelectedKeys[item.record_id] = {
        //     menu_id: item.record_id,
        //     actions: item.actions ? this.getCodeArr(item.actions) : [],
        //     resources: item.resources ? this.getCodeArr(item.resources) : []
        //   };
        //   // console.log(this.checkboxSelectedKeys)
        //   // 原始方法，如果onSelect参数中没有选中行全部数据的时候，需要我们通过id去查询，这样就用到了下边的递归方法
        //   // this.checkboxSelectedKeys[id].actions = this.findSthWithId(id, 'actions', this.dataSource);
        //   // this.checkboxSelectedKeys[id].resources = this.findSthWithId(id, 'resources', this.dataSource);
        // }
        //向父组件提交最新数据
        this.$emit('change', this.checkboxSelectedKeys)
      },
      findItemById (id, arr) {
        for(let i=0; i<arr.length; i++){
          if(arr[i].record_id == id) {
            return arr[i]
          }
        }
        return null;
      },
      //查找点击取消的id
      findMissedItem(arr1, arr2) {
        //循环长度大的，进行比对
        let temp = arr1.concat(arr2);
        let rel = {};
        for(let i = 0;i < temp.length; i ++){
          temp[i] in rel ? rel[temp[i]] ++ : rel[temp[i]] = 1;
        }
        for(let x in rel){
          if(rel[x] == 1){
            return x;
          }
        }
        return null;
      },
      getCodeArr(list) {
        let res = [];
        for (let i = 0; i < list.length; i++) {
          res.push(list[i].code);
        }
        return res;
      },
      // findSthWithId (id, action, list) {
      //   let result = []
      //   if(!list) return;
      //   for (let i=0; i<list.length; i++) {
      //     if(list[i].record_id == id) {
      //       // console.log('匹配到', list[i])
      //       result = [];
      //       //如果本节点有actions或者resources，并且没有子节点（即为叶子节点）
      //       if(list[i][action] && !list[i].children) {
      //         for(let j=0; j<list[i][action].length; j++) {
      //           result.push(list[i][action][j].code);
      //         }
      //       }
      //       // console.log(list[i][action], result);
      //       return result;
      //     }
      //     if(list[i].children) {
      //       result = this.findSthWithId(id,action, list[i].children)
      //     }
      //   }
      //   return result;
      // },
      onCheckboxChange(record, action, checkedValues) {
        // console.log(record, action, checkedValues)
        //  想办法让value能够深度监听 --- 自己封装组件？
        //  --- no: 直接让temp保存一下checkboxSelectedKeys,然后重置一下，这样checkbox-group的value就能监听到他的变化了
        let temp = this.checkboxSelectedKeys;
        this.checkboxSelectedKeys = {};
        this.checkboxSelectedKeys = temp;
        if (!this.checkboxSelectedKeys[record.record_id]) {
          this.checkboxSelectedKeys[record.record_id] = {
            menu_id: record.record_id,
            actions: [],
            resources: []
          };
        }
        this.checkboxSelectedKeys[record.record_id][action] = checkedValues;
        //向父组件提交最新数据
        this.$emit('change', this.checkboxSelectedKeys)
      },
      getMenus() {
        this.loading = true;
        this.$axios.get('/menus?q=tree', {
          params: {
            include_actions: 1,
            include_resources: 1,
          }
        }).then(res => {
          // console.log('get menus',res.data.list)
          if (res.data) {
            this.dataSource = res.data.list;
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading = false
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
