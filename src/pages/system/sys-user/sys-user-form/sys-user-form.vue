<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="form"
            @submit="handleSearch">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="用户名" colon :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="[
                `user_name`,
                { rules: [{ required: false, message: '' }]}
              ]"
              placeholder="请输入用户名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="真实姓名" colon :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="[
                `real_name`,
                { rules: [{ required: false, message: '' }]}
              ]"
              placeholder="请输入真实姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="所属角色" colon :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="[
                `role_ids`,
                { rules: [{ required: false, message: '' }]}
              ]"
              placeholder="请输入所属角色"
            />
          </a-form-item>
        </a-col>
        <a-row>
          <a-col :span="8">
            <a-form-item label="用户状态" colon :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group name="status"
                             v-decorator="[
                            `status`,
                            { rules: [{ required: false, message: '' }],
                              initialValue: `-1`
                              }
                          ]"
              >
                <a-radio value="-1">全部</a-radio>
                <a-radio value="1">正常</a-radio>
                <a-radio value="2">停用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="3" :offset="13">
            <a-button type="primary" html-type="submit"> 查询</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset"> 重置</a-button>
          </a-col>
        </a-row>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import {Row, Col, Form, Input, Cascader, Button, Select, Radio} from 'ant-design-vue'

  export default {
    name: "sys-user-form",
    components: {
      ARow: Row,
      ACol: Col,
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      ACascader: Cascader,
      AButton: Button,
      ASelect: Select,
      ASelectOption: Select.Option,
      ARadio: Radio,
      ARadioGroup: Radio.Group
    },
    data() {
      return {
        form: this.$form.createForm(this),
        labelCol: {span: 5},
        wrapperCol: {span: 15, offset: 2},
      }
    },
    methods: {
      handleSearch(e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if (error) return;
          // console.log('Received values of form: ', values);
          let params = {};
          values.user_name && (params.user_name = values.user_name);
          values.real_name && (params.real_name = values.real_name);
          values.role_ids && (params.role_ids = values.role_ids);
          values.status && (params.status = values.status);
          this.$emit('search', params);
        });
      },
      handleReset() {
        this.form.resetFields();
      }
    }
  }
</script>

<style lang="less">
  @import "sys-user-form.less";
</style>
