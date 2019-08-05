<template>
  <div>
    <a-drawer
      title="新建角色"
      :width="720"
      @close="onClose"
      :visible="visible"
      wrapClassName="sys-menu-create-wrap">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="角色名称" >
              <a-input placeholder="请输入"
                v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入角色' }]}
              ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="排序值" >
              <a-input-number placeholder="请输入"
                              v-decorator="[
                          'sequence',
                          { rules: [{ required: true, message: '请输入' }]}
                        ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}"
                         label="备注" >
              <a-textarea placeholder="请输入"
                       v-decorator="[
                         'memo',
                       ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="btn-wrap">
          <a-button :style="{marginRight: '8px'}" @click="onClose" > 取消 </a-button>
          <a-button type="primary" html-type="submit"> 确认 </a-button>
        </div>
      </a-form>
      <m-role-menus @change="onRoleMenusChange" :submit-times="submitTimes"></m-role-menus>
    </a-drawer>
  </div>
</template>
<script>
  import {Button, Form, Drawer, Row, Col, Input, InputNumber,
          Select, Radio, Cascader, Tooltip, Icon, Notification} from 'ant-design-vue'
  import MRoleMenus from '@/components/m-role-menus/m-role-menus'
  export default {
    name: "sys-role-create",
    components: {
      AButton: Button,
      AForm: Form,
      AFormItem: Form.Item,
      ADrawer: Drawer,
      ARow: Row,
      ACol: Col,
      AInput: Input,
      ATextarea: Input.TextArea,
      AInputNumber: InputNumber,
      ASelect: Select,
      ARadio: Radio,
      ARadioGroup: Radio.Group,
      ASelectOption: Select.Option,
      ACascader: Cascader,
      ATooltip: Tooltip,
      AIcon: Icon,
      MRoleMenus
    },
    props: {
      visible: Boolean
    },
    computed : {
      hello () {
        return 1
      }
    },
    data() {
      return {
        menuTree: [],
        submitTimes: 0,
        form: this.$form.createForm(this),
        labelCol: {span:6},
        wrapperCol: {span:16},
        //子组件m-role-menus数据
        menus: []
      }
    },
    methods: {
      onRoleMenusChange (menu) {
        // console.log('父组件接受到变化', menu)
        // 去掉数组为空的数据, 将正确的数据转化到表单中去
        this.menus = [];
        for(let key in menu){
          //在这里过滤掉acitons和resources长度都为0的数据
          if(menu[key].actions.length > 0 && menu[key].resources.length > 0) {
            this.menus.push(menu[key])
          }
        }
        // console.log('转化完成', this.menus)
      },
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if(error) return;
          // console.log('Received values of form: ', values);
          let params = {
            "name": values.name,
            "memo": values.memo,
            "sequence": values.sequence,
            "menus": this.menus,
            "updated_at": new Date(),
            "created_at": new Date(),
            "creator": this.$getLocalStorage('username')
          }
          // console.log(params)
          this.$axios.post('/roles',params).then(res => {
            console.log(res.data)
            if(res.data){
              Notification['success']({
                message: '创建成功'
              })
              //告诉父组件，创建完了，你可以关闭了, 传值created告诉父组件去刷新列表信息
              this.$emit('close', 'created');
              //清空本组件内部的表单内容
              this.form.resetFields(['name', 'sequence', 'memo'])
              //告诉子组件，自己去清空自己的内容
              this.submitTimes++;
            }
          }).catch(err => {
            console.log(err)
          })
        });
      },
      onClose() {
        this.$emit('close');
      },
    },
    mounted() {
    }
  }
</script>
<style lang="less">
  @import "../../sys-drawer";
</style>
