<template>
  <div>
    <a-drawer title="编辑菜单" :width="720" @close="onClose"
      :visible="visible" wrapClassName="sys-menu-create-wrap">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="菜单名称" >
              <a-input placeholder="请输入" v-decorator="[ 'name',
                {
                  rules: [{ required: true, message: '请输入菜单名称' }],
                  initialValue: options.name
                }]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="上级菜单" >
              <a-cascader :options="menuTree" :fieldNames="treeTemplate" changeOnSelect
                          allowClear placeholder="请选择"
                          v-decorator="[ 'parent_id',
                            {
                              initialValue: options.parent_path ? options.parent_path.split('/') : []
                            }]"
                          />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-row>
              <a-col :span="20">
                <a-form-item :labelCol="{span:7}" :wrapperCol="{span:17}"
                             label="菜单图标" >
                  <a-input placeholder="请输入"
                           v-decorator="[
                             'icon',
                            {
                              rules: [{ required: true, message: '请输入菜单图标' }],
                              initialValue: options.icon
                            }]"/>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <div class="tooltip-wrap">
                  <div>
                    <a-tooltip title="图标紧支持Antd官方ICON">
                      <a-icon type="question-circle"></a-icon>
                    </a-tooltip>
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="访问路由" >
              <a-input placeholder="请输入"
                       v-decorator="[
                             'router',
                            { rules: [{ required: false, message: '' }],initialValue: options.router}
                           ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="排序值" >
              <a-input-number placeholder="请输入"
                              v-decorator="[
                          'sequence',
                          { rules: [{ required: true, message: '请输入' }],initialValue: options.sequence}
                        ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="隐藏状态" >
              <a-radio-group
                v-decorator="[
                                'hidden',
                                { rules: [{ required: true, message: '请输入' }],initialValue: options.hidden}
                              ]">
                <a-radio :value="0">显示</a-radio>
                <a-radio :value="1">隐藏</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="btn-wrap">
          <a-button :style="{marginRight: '8px'}" @click="onClose" > 取消 </a-button>
          <a-button type="primary" html-type="submit"> 确认 </a-button>
        </div>
      </a-form>
      <m-menu-action :submit-times="submitTimes" @change="onMenuActionChange" :default-value="options.actions"></m-menu-action>
      <m-menu-resource :submit-times="submitTimes" @change="onMenuResourceChange" :default-value="options.resources"></m-menu-resource>
    </a-drawer>
  </div>
</template>
<script>
  import {Button, Form, Drawer, Row, Col, Input, InputNumber,
    Select, Radio, Cascader, Tooltip, Icon, Notification} from 'ant-design-vue'
  import MMenuAction from '@/components/m-menu-action/m-menu-action'
  import MMenuResource from '@/components/m-menu-resource/m-menu-resource'
  export default {
    name: "sys-menu-edit",
    components: {
      AButton: Button,
      AForm: Form,
      AFormItem: Form.Item,
      ADrawer: Drawer,
      ARow: Row,
      ACol: Col,
      AInput: Input,
      AInputNumber: InputNumber,
      ASelect: Select,
      ARadio: Radio,
      ARadioGroup: Radio.Group,
      ASelectOption: Select.Option,
      ACascader: Cascader,
      ATooltip: Tooltip,
      AIcon: Icon,
      MMenuAction,
      MMenuResource
    },
    props: {
      visible: Boolean,
      options: Object
    },
    data() {
      return {
        menuTree: [],
        treeTemplate : {
          label: 'name',
          value: 'record_id',
          children: 'children'
        },
        parentCascader: [],
        submitTimes: 0,
        action: [],
        resource: [],
        form: this.$form.createForm(this),
        labelCol: {span:6},
        wrapperCol: {span:16}
      }
    },
    methods: {
      onMenuActionChange (value) {
        // console.log('onMenuActionChange', value)
        /**
         * 当前value是带key值的，记得在提交之前把key值去掉
         * */
        this.action = value;
        // console.log(this.createObjWithoutKey(this.action, 'key'))
      },
      onMenuResourceChange (value) {
        // console.log('onMenuResourceChange', value)
        /**
         * 当前value是带key值的，记得在提交之前把key值去掉
         * */
        this.resource = value
        // console.log(this.createObjWithoutKey(this.resource, 'key'))
      },
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if(error) return;
          if(values.parent_id) {
            values.parent_id = values.parent_id[values.parent_id.length-1]
          }
          // console.log('Received values of form: ', values);
          let arr = values.parent_id ? values.parent_id.split(',') : null;
          let parent_id = arr ? arr[arr.length-1] : '';
          let params = {
            "actions": this.createObjWithoutKey(this.action, 'key'),
            "created_at": new Date(),
            "creator": this.$getLocalStorage('username'),
            "hidden": values.hidden,
            "icon": values.icon,
            "name": values.name,
            "parent_id": parent_id,
            // "parent_path": values.parent_id.split(',')[1],
            "record_id": this.options.record_id,
            "resources": this.createObjWithoutKey(this.resource, 'key'),
            "router": values.router,
            "sequence": values.sequence,
            "updated_at": new Date()
          }
          console.log(params)
          this.$axios.put('/menus/'+this.options.record_id,params).then(res => {
            console.log(res)
            if(res.data){
              Notification['success']({
                message: '修改成功'
              })
              //告诉父组件，创建完了，你可以关闭了, 传值created告诉父组件去刷新列表信息
              this.$emit('close', 'update');
              //清空本组件内部的表单内容
              this.form.resetFields(['name', 'hidden', 'icon', 'parent_id', 'router', 'sequence'])
              //告诉两个子组件，自己去清空自己的内容
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
      getMenuTree () {
        this.$axios.get('/current/menutree').then(res => {
          if(res.data){
            let list = res.data.list
            //递归将菜单中record_id和record_path合并
            // this.contactIdAndPath(list)
            this.menuTree = list;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //递归将菜单中record_id和record_path合并
      // contactIdAndPath(list){
      //   for(let i=0; i<list.length; i++) {
      //     list[i].record_id = [list[i].record_id, list[i].router].join(',')
      //     if(list[i].children) {
      //       this.contactIdAndPath(list[i].children);
      //     }
      //   }
      // }
    },
    mounted() {
      this.getMenuTree();
    }
  }
</script>
<style lang="less">
  @import "../../sys-drawer";
</style>
