<template>
  <div>
    <a-drawer
      title="编辑角色"
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
                { rules: [{ required: true, message: '请输入角色' }],initialValue: options.name}
              ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="排序值" >
              <a-input-number placeholder="请输入"
                              v-decorator="[
                          'sequence',
                          { rules: [{ required: true, message: '请输入' }], initialValue: options.sequence}
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
                         {initialValue: options.memo}
                       ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="btn-wrap">
          <a-button :style="{marginRight: '8px'}" @click="onClose" > 取消 </a-button>
          <a-button type="primary" html-type="submit"> 确认 </a-button>
        </div>
      </a-form>
      <m-role-menus @change="onRoleMenusChange" :submit-times="submitTimes" :default-value="options.menus"></m-role-menus>
    </a-drawer>
  </div>
</template>
<script>
  import {Button, Form, Drawer, Row, Col, Input, InputNumber,
    Select, Radio, Cascader, Tooltip, Icon, Notification} from 'ant-design-vue'
  import MRoleMenus from '@/components/m-role-menus/m-role-menus'
  export default {
    name: "sys-role-edit",
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
      visible: Boolean,
      options: Object // 这里的options是父组件传进来的editItem
    },
    watch: {
      options (newVal, oldVal) {
        //因为在创建组件的时候无法获取到options.menu到this.menus上，所以在watch中赋值
        this.menus = newVal.menus ? newVal.menus : [];
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
        console.log('父组件接受到变化', menu)
        // 去掉数组为空的数据, 将正确的数据转化到表单中去
        this.menus = [];
        for(let key in menu){
          // ----放弃---//在这里过滤掉acitons和resources长度都为0的数据
          // if(menu[key].actions.length > 0 && menu[key].resources.length > 0) {
            this.menus.push(menu[key])
          // }
        }
        console.log('role-edit转化完成', this.menus)
      },
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if(error) return;
          // console.log('Received values of form: ', values);
          let params = {
            "record_id": this.options.record_id,
            "name": values.name,
            "memo": values.memo,
            "sequence": values.sequence,
            "menus": this.menus,
            "updated_at": new Date(),
            "created_at": new Date(),
            "creator": this.$getLocalStorage('username')
          }
          console.log(params)
          this.$axios.put('/roles/'+this.options.record_id, params).then(res => {
            console.log(res)
            if(res.data){
              Notification['success']({
                message: '更新成功'
              })
              //告诉父组件，创建完了，你可以关闭了, 传值created告诉父组件去刷新列表信息
              this.$emit('close', 'updated');
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
      createObjWithoutKey (arr, keyStr) {
        let newArr = []
        for(let i=0; i<arr.length; i++) {
          let item = arr[i]
          let newItem = {}
          for(let key in item) {
            if(key != keyStr) {
              newItem[key] = item[key]
            }
          }
          newArr.push(newItem)
        }
        return newArr
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
