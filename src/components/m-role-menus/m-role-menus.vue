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
        console.log('选择的数据', selectedRowKeys, selectedRows);
        console.log('组件原始data', this.selectedRowKeys, this.checkboxSelectedKeys)
        /**
         * 点击选择后，只有最后一层是当前新增的，不要修改其他层的； 点击取消后，只有最后一层的数据去掉，其他的不需要动
         * 1 当选择的数据比原始数据长度大的时，说明是新增，
         * 2 当选择的数据比原始数据长度小，说明是取消全选操作
         */
        if (selectedRowKeys.length >= this.selectedRowKeys.length) {
          // console.log('添加数据')
          // 找到新添加的项
          let items = this.diffItems(selectedRowKeys, this.selectedRowKeys);
          // 新增
          for(let i=0; i<items.length; i++) {
            // items中的每一项为id，用这个id去selectRows中去找，然后让actions和resources的checkbox变化
            let item = this.findItemById(items[i], selectedRows);
            // console.log('新增的选项', selectedRowKeys[selectedRowKeys.length-1], item)
            this.checkboxSelectedKeys[item.record_id] = {
              menu_id: item.record_id,
              actions: item.actions ? this.getCodeArr(item.actions) : [],
              resources: item.resources ? this.getCodeArr(item.resources) : []
            };
          }

        } else {
          // console.log('删除数据')
          // 找到删除的数据
          let items = this.diffItems(this.selectedRowKeys, selectedRowKeys);
          // console.log('删除diff', items)
          // 删除数据
          for (let i=0; i<items.length; i++) {
            // 删除checkbox中的选项
            delete  this.checkboxSelectedKeys[items[i]];
          }
        }
        // 同步table选项
        this.selectedRowKeys = selectedRowKeys;
        //向父组件提交最新数据
        this.$emit('change', this.checkboxSelectedKeys)
      },
      diffItems (more, less) {
        if(more.length < less.length){return []}
        let res = [];
        // console.log('开始diff', more, less)
        for(let i=0; i<more.length; i++) {
          let isInLess = false;
          for(let j=0; i<less.length; j++) {
            if(less[j] === more[i]) {
              //说明存在了，不用保存
              isInLess = true;
              // console.log('匹配到less在more中', i, more[i])
              break;
            }
          }
          if(!isInLess) {
            // 如果more[i] 不在less中，则在res中添加本项
            // console.log('没有匹配到的项', i, more[i])
            res.push(more[i]);
          }
        }
        // console.log('diff', res)
        return res;
      },
      findItemById (id, arr) {
        for(let i=0; i<arr.length; i++){
          if(arr[i].record_id == id) {
            return arr[i]
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
