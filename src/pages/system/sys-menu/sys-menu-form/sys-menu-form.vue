<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="form"
      @submit="handleSearch" >
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="菜单名称" colon :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="[
                `name`,
                { rules: [{ required: false, message: '' }]}
              ]"
              placeholder="请输入菜单名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="显示隐藏" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select placeholder="选择菜单显示隐藏"
                      v-decorator="[
                        `hidden`,
                        { rules: [{ required: false, message: '' }]}
                      ]">
              <a-select-option value="-1">不限</a-select-option>
              <a-select-option value="0">显示</a-select-option>
              <a-select-option value="1">隐藏</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="父级菜单" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-cascader :options="menuTree" :fieldNames="treeTemplate" changeOnSelect allowClear
                        v-decorator="[
                          'parent_id',
                          { rules: [{ required: false, message: '' }]}
                        ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="6" >
          <a-button type="primary" html-type="submit"> 搜索 </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset" > 重置 </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import {Row, Col, Form, Input, Cascader, Button, Select} from 'ant-design-vue'
  export default {
    name: "sys-menu-form",
    components: {
      ARow: Row,
      ACol: Col,
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      ACascader: Cascader,
      AButton: Button,
      ASelect: Select,
      ASelectOption: Select.Option
    },
    data () {
      return {
        form: this.$form.createForm(this),
        labelCol: {span:5},
        wrapperCol: {span:15, offset:2},
        menuTree: [],
        treeTemplate : {
          label: 'name',
          value: 'record_id',
          children: 'children'
        }
      }
    },
    methods : {
      handleSearch  (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if(error) return;
          // console.log('Received values of form: ', values);
          let params = {};
          values.name && (params.name = values.name);
          values.hidden && (params.hidden = values.hidden);
          values.parent_id && (params.parent_id = values.parent_id[values.parent_id.length-1]);
          this.$emit('search',params);
        });
      },
      handleReset () {
        this.form.resetFields();
      },
      getMenuTree () {
        this.$axios.get('/current/menutree').then(res => {
          if(res.data){
            this.menuTree = res.data.list;
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getMenuTree();
    }
  }
</script>

<style lang="less">
  @import "sys-menu-form";
</style>
