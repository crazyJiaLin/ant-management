<template>
  <div>
    <a-drawer
      title="新建用户"
      :width="720"
      @close="onClose"
      :visible="visible"
      wrapClassName="sys-menu-create-wrap">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="用户名">
              <a-input placeholder="请输入用户名"
                       v-decorator="[
                'user_name',
                { rules: [{ required: true, message: '' }]}
              ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="登录密码">
              <a-input placeholder="请输入登录密码"
                       type="password"
                       v-decorator="[
                'password',
                { rules: [{ required: true, message: '' }]}
              ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="真实姓名">
              <a-input placeholder="请输入真实姓名"
                       v-decorator="[
                'real_name',
                { rules: [{ required: true, message: '' }]}
              ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="所属角色">
              <a-select mode="multiple" placeholder="Please select"
                        v-decorator="[
                    'role_id',
                    {rules: [{ required: true, message: '' }]}
                  ]">
                <a-select-option v-for="(item, index) in roleList " :key="index" :value="item.record_id">{{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="手机号">
              <a-input placeholder="请输入手机号"
                       v-decorator="[
                          'phone',
                          { rules: [{ required: false, message: '' },
                                    { max:11, message:'手机号码超长'},
                                    { min:11, message:'手机号码位数不足'},
                                    ],
                          }
                        ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="邮箱">
              <a-input placeholder="请输入邮箱"
                       v-decorator="[
                          'email',
                          { rules: [{ required: false, message: '' },{pattern:/^(\w+\.?)*\w+@(?:\w+\.)\w+$/,message:'请输入正确的邮箱格式'},]}
                        ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="用户状态">
              <a-radio-group
                v-decorator="[
                                'status',
                                { rules: [{ required: true, message: '' }],initialValue:0}
                              ]">
                <a-radio :value="1">正常</a-radio>
                <a-radio :value="2">停用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="btn-wrap">
          <a-button :style="{marginRight: '8px'}" @click="onClose"> 取消</a-button>
          <a-button type="primary" html-type="submit"> 确认</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
  import {
    Button, Form, Drawer, Row, Col, Input,
    Select, Radio, Cascader, Tooltip, Icon, Notification
  } from 'ant-design-vue'
  import md5 from 'md5'

  export default {
    name: "sys-user-create",
    components: {
      AButton: Button,
      AForm: Form,
      AFormItem: Form.Item,
      ADrawer: Drawer,
      ARow: Row,
      ACol: Col,
      AInput: Input,
      ASelect: Select,
      ASelectOption: Select.Option,
      ARadio: Radio,
      ARadioGroup: Radio.Group,
      ACascader: Cascader,
      ATooltip: Tooltip,
      AIcon: Icon,
    },
    props: {
      visible: Boolean
    },
    data() {
      return {
        action: [],
        resource: [],
        form: this.$form.createForm(this),
        labelCol: {span: 6},
        wrapperCol: {span: 16},
        roleList: []
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if (error) return;
          let params = {
            "created_at": new Date(),
            "creator": this.$getLocalStorage('username'),
            "user_name": values.user_name,
            "email": values.email,
            "password": md5(values.password),
            "phone": values.phone,
            "real_name": values.real_name,
            "roles": [{
              "role_id": values.role_id
            }],
            "status": values.status,
            "updated_at": new Date()
          }
          console.log(params)
          this.$axios.post('/users', params).then(res => {
            console.log(res)
            if (res.data) {
              Notification['success']({
                message: '创建成功'
              })
              //告诉父组件，创建完了，你可以关闭了, 传值created告诉父组件去刷新列表信息
              this.$emit('close', 'created');
              //清空本组件内部的表单内容
              this.form.resetFields(['user_name', 'password', 'real_name', 'role_id', 'phone', 'email', 'status'])
            }
          }).catch(err => {
            console.log(err)
          })
        });
      },
      onClose() {
        this.$emit('close');
      },
      getRoleList() {
        this.$axios.get('/roles?q=select').then(res => {
          if (res.data) {
            this.roleList = res.data.list;
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
    mounted() {
      this.getRoleList();
    }
  }
</script>
<style lang="less">
  @import "sys-user-create.less";
</style>
