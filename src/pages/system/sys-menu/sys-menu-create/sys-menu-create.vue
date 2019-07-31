<template>
  <div>
    <a-drawer
      title="新建菜单"
      :width="720"
      @close="onClose"
      :visible="visible"
      wrapClassName="sys-menu-create-wrap">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="菜单名称" >
              <a-input placeholder="请输入"
                v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入菜单名称' }]}
              ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="上级菜单" >
              <a-cascader :options="menuTree" :fieldNames="treeTemplate" changeOnSelect
                          allowClear placeholder="请选择"
                          v-decorator="[
                          'parent_id',
                          { rules: [{ required: false, message: '' }]}
                        ]"/>
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
                            { rules: [{ required: true, message: '请输入菜单图标' }]}
                           ]"/>
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
                            { rules: [{ required: false, message: '' }]}
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
                          { rules: [{ required: true, message: '请输入' }]}
                        ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         label="隐藏状态" >
                <a-radio-group
                               v-decorator="[
                                'hidden',
                                { rules: [{ required: true, message: '请输入' }],initialValue:0}
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
      <m-menu-action @change="onMenuActionChange"></m-menu-action>
    </a-drawer>
  </div>
</template>
<script>
  import {Button, Form, Drawer, Row, Col, Input, InputNumber, Select, Radio, Cascader, Tooltip, Icon} from 'ant-design-vue'
  import MMenuAction from '@/components/m-menu-action/m-menu-action'
  export default {
    name: "sys-menu-create",
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
      MMenuAction
    },
    props: {
      visible: Boolean
    },
    data() {
      return {
        menuTree: [],
        treeTemplate : {
          label: 'name',
          value: 'record_id',
          children: 'children'
        },
        action: [],
        form: this.$form.createForm(this),
        labelCol: {span:6},
        wrapperCol: {span:16}
      }
    },
    methods: {
      onMenuActionChange (value) {
        console.log(value)  //当前value是带key值的，记得在提交之前把key值去掉
        this.action = value;
      },
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if(error) return;
          if(values.parent_id) {
            values.parent_id = values.parent_id[values.parent_id.length-1]
          }
          console.log('Received values of form: ', values);
          // let params = {};
          // values.name && (params.name = values.name);
          // values.hidden && (params.hidden = values.hidden);
          // values.parent_id && (params.parent_id = values.parent_id[values.parent_id.length-1]);
          // this.$emit('search',params);
        });
      },
      onClose() {
        this.$emit('close');
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
  @import "sys-menu-create";
</style>
