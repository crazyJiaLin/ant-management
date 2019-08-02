<template>
  <div class="menu-template-wrap">
    <div class="menu-template-title">
      菜单资源管理
    </div>
    <div class="menu-template-tool">
      <a-button type="primary" size="small" @click="handleAdd">新增</a-button>
      <a-button type="primary" size="small" @click="useTemplate">使用模板</a-button>
      <a-modal title="资源模板" :visible="resourceModalVisible" @ok="confirmResource"
               @cancel="handleCancel" cancelText="取消" okText="确认" :width="350">
        <a-form :form="resourceForm" @submit="confirmResource">
          <a-form-item label="资源名" :labelCol="{span: 6}" :wrapperCol="{span: 16, offset:1}">
              <a-input placeholder="请输入资源名" v-decorator="[
              'resourceName',
              { rules: [{ required: true, message: '请输入资源名' }]}
            ]">
            </a-input>
          </a-form-item>
          <a-form-item label="资源路由" :labelCol="{span: 6}" :wrapperCol="{span: 16, offset:1}">
            <a-input placeholder="请输入资源路由" v-decorator="[
              'resourceRouter',
              { rules: [{ required: true, message: '请输入资源路由' }]}
            ]">
            </a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <div class="menu-template-table">
      <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false">
        <template slot="name" slot-scope="text, record">
          <a-input :defaultValue="text" @change="onInputChange(record.key, 'name', $event)"></a-input>
        </template>
        <template slot="code" slot-scope="text, record">
          <a-input :defaultValue="text" @change="onInputChange(record.key, 'code', $event)"></a-input>
        </template>
        <template slot="method" slot-scope="text, record">
<!--          <a-input :defaultValue="text" @change="onInputChange(record.key, 'method', $event)"></a-input>-->
          <a-select :defaultValue="text" @change="onInputChange(record.key, 'method', $event)">
            <a-select-option value="GET">GET</a-select-option>
            <a-select-option value="POST">POST</a-select-option>
            <a-select-option value="PUT">PUT</a-select-option>
            <a-select-option value="DELETE">DELETE</a-select-option>
            <a-select-option value="PATCH">PATCH</a-select-option>
            <a-select-option value="HEAD">HEAD</a-select-option>
            <a-select-option value="OPTIONS">OPTIONS</a-select-option>
          </a-select>
        </template>
        <template slot="path" slot-scope="text, record">
          <a-input :defaultValue="text" @change="onInputChange(record.key, 'path', $event)"></a-input>
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
  import {Table, Input, Select, Button, Popconfirm, Modal, Form} from 'ant-design-vue'
  export default {
    name: "m-menu-resource",
    components: {
      ATable: Table,
      AInput: Input,
      AButton: Button,
      APopconfirm: Popconfirm,
      ASelect: Select,
      ASelectOption: Select.Option,
      AModal: Modal,
      AForm: Form,
      AFormItem: Form.Item
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
        resourceModalVisible: false,
        dataSource: [],
        count: 0,
        hasUseTemplate: false,
        resourceForm: this.$form.createForm(this),
        columns: [
          {
          title: '资源编号',
          dataIndex: 'code',
          width:'120px',
          scopedSlots: { customRender: 'code' },
        }, {
          title: '资源名称',
          dataIndex: 'name',
          width:'150px',
          scopedSlots: { customRender: 'name' },
        }, {
          title: '请求方式',
          dataIndex: 'method',
          scopedSlots: { customRender: 'method' },
        }, {
          title: '请求路径',
          dataIndex: 'path',
          scopedSlots: { customRender: 'path' },
        }, {
          title: '操作',
          dataIndex: 'key',
          width: '70px',
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
      confirmResource(){
        // e.preventDefault();
        this.resourceForm.validateFields((error, values) => {
          if(error) return;
          // console.log('Received values of form: ', values);
          //根据表单值创建模板, 并添加到table中
          this.createTemplate(values);
          //关闭对话框，并对对话框中的表单进行重置
          this.resourceModalVisible = false;
          this.resourceForm.resetFields(['resourceName', 'resourceRouter']);
        });
      },
      handleCancel(e) {
        this.resourceModalVisible = false
      },
      onInputChange (key, dataIndex, ev) {
        let value = dataIndex == 'method' ? ev : ev.target && ev.target.value;
        console.log(key, dataIndex, value)
        const dataSource = [...this.dataSource]
        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource = dataSource
        }
        console.log('after change', this.dataSource)
        this.$emit('change', this.dataSource);
      },
      onDelete (key) {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
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
        !this.hasUseTemplate && (this.resourceModalVisible = true);
      },
      createTemplate (value) {
        //使用模板
        let { count, dataSource, hasUseTemplate } = this
        if(hasUseTemplate) return
        const newData = [{
          key: ++count,
          code: 'query',
          name: '查询' + value.resourceName,
          method: 'GET',
          path: value.resourceRouter
        },{
          key: ++count,
          code: 'get',
          name: '精确查询' + value.resourceName,
          method: 'GET',
          path: value.resourceRouter + '/:id'
        },{
          key: ++count,
          code: 'create',
          name: '创建' + value.resourceName,
          method: 'POST',
          path: value.resourceRouter
        },{
          key: ++count,
          code: 'update',
          name: '更新' + value.resourceName,
          method: 'PUT',
          path: value.resourceRouter + '/:id'
        },{
          key: ++count,
          code: 'delete',
          name: '删除' + value.resourceName,
          method: 'DELETE',
          path: value.resourceRouter + '/:id'
        }]
        this.dataSource = [...dataSource, ...newData]
        this.count = count
        this.hasUseTemplate = true
        this.$emit('change', this.dataSource);
      }
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
  .menu-template-table {
    .ant-select {
      width: 100%;
      min-width: 90px;
    }
  }
</style>
