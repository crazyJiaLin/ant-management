<template>
  <div class="menu-template-wrap">
    <div class="menu-template-title">
      菜单动作管理
    </div>
    <div class="menu-template-tool">
      <a-button type="primary" size="small" @click="handleAdd">新增</a-button>
      <a-button type="primary" size="small" @click="useTemplate">使用模板</a-button>
    </div>
    <div class="menu-template-table">
      <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false" size="middle">
        <template slot="code" slot-scope="text, record">
          <a-input :defaultValue="text" @change="onInputChange(record.key, 'code', $event)"></a-input>
          <!--          <m-editable-cell :text="text" @change="onCellChange(record.key, 'code', $event)"/>-->
        </template>
        <template slot="name" slot-scope="text, record">
          <a-input :defaultValue="text" @change="onInputChange(record.key, 'name', $event)"></a-input>
<!--          <m-editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>-->
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import {Table, Input, Button, Popconfirm} from 'ant-design-vue'
  // import MEditableCell from '@/components/m-editable-cell/m-editable-cell'
  export default {
    name: "m-menu-action",
    components: {
      ATable: Table,
      AInput: Input,
      AButton: Button,
      APopconfirm: Popconfirm,
      // MEditableCell
    },
    props: {
      submitTimes: Number,
      defaultValue: Array
    },
    watch: {
      submitTimes (newVal, oldVal) {
        console.log(newVal);
        /**
         * 监听到变化，说明父组件已经提交完成，需要清空本组件内容
         */
        //清空数据和数量指针
        this.dataSource = [];
        this.count = 0;
        //清空使用模板操作记录
        this.hasUseTemplate = false;
      },
      defaultValue : {
        handler (newVal, oldVal) {
          // console.log(newVal)
          //每次监听到数据变化后，初始化数据
          this.initDataFromDefault(newVal)
        },
        deep : true
      }
    },
    mounted () {
      this.initDataFromDefault(this.defaultValue)
    },
    data () {
      return {
        dataSource: [],
        count: 0 ,
        hasUseTemplate: false,
        columns: [ {
          title: '动作编号',
          width: '45%',
          dataIndex: 'code',
          scopedSlots: { customRender: 'code' },
        }, {
          title: '动作名称',
          dataIndex: 'name',
          width: '45%',
          scopedSlots: { customRender: 'name' },
        }, {
          title: '操作',
          dataIndex: 'key',
          scopedSlots: { customRender: 'operation' },
        }]
      }
    },
    methods : {
      initDataFromDefault (value) {
        let defaultVal = value;
        // 重置当前组件内容,
        this.dataSource = [];
        this.count = 0;
        //如果为新建，则不为其data赋值
        if(!defaultVal) return;
        this.addKeyIntoDefault(defaultVal);
        // console.log(defaultVal)
        this.dataSource = defaultVal;
        //初始化完本组件时，将数据同步到父组件中
        this.$emit('change', this.dataSource);
      },
      // 给数据添加key值
      addKeyIntoDefault(arr){
        // let result = [];
        if(!arr) return;
        for(let i=0; i<arr.length; i++){
          arr[i].key = ++this.count;
        }
      },
      onInputChange (key, dataIndex, ev) {
        let value = ev.target&& ev.target.value;
        // console.log(key, dataIndex, value)
        const dataSource = [...this.dataSource]
        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource = dataSource
        }
        // console.log('after change', this.dataSource)
        this.$emit('change', this.dataSource);
      },
      onDelete (key) {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
        this.$emit('change', this.dataSource);
      },
      handleAdd () {
        //点击添加
        let { count, dataSource } = this
        const newData = {
          key: ++count,
          name: '',
          code: '',
        }
        this.dataSource = [...dataSource, newData]
        this.count = count
      },
      useTemplate () {
        //使用模板
        let { count, dataSource, hasUseTemplate } = this
        if(hasUseTemplate) return
        const newData = [{
          key: ++count,
          name: '查询',
          code: 'query',
        },{
          key: ++count,
          name: '新建',
          code: 'create',
        },{
          key: ++count,
          name: '编辑',
          code: 'edit',
        },{
          key: ++count,
          name: '删除',
          code: 'delete',
        },{
          key: ++count,
          name: '禁用',
          code: 'disable',
        },{
          key: ++count,
          name: '启用',
          code: 'enable',
        }]
        this.dataSource = [...dataSource, ...newData]
        this.count = count
        this.hasUseTemplate = true
        this.$emit('change', this.dataSource)
      },
    }
  }
</script>

<style scoped lang="less">
  .menu-template-title {
    height: 50px;
    box-sizing: border-box;
    padding: 0 15px;
    line-height: 50px;
    font-size: 16px;
    color: #555;
    border-bottom: 1px solid #e8e8e8;
  }
  .menu-template-tool {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 15px;
  }
</style>
