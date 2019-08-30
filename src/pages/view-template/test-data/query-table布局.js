// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
/**
 * 目前属性值中碰到函数的，只能吧函数转为字符串，然后存入，关于解析只支持部分，有待完善
 * 所以在需要传函数的时候，一定要传正确可执行的函数，不然有一些必须的值拿不到，组件会报错
 * */
export default [
  {
    "id":"query1",
    "type":"query",
    "tableId": "table1",//搜索数据显示表格id
    // 搜索前的钩子函数，请用字符串保存，values为搜索条件的集合，字段名称以children中每个组件的id为准
    "beforeSearch" : `(values) => {
      values.role_ids = values.role_ids ? values.role_ids.join(',') : '';
    }`,
    "attribute": {
      "an":true, // 是否展开
      searchBtn: {
        showReset: true,  // 显示重置按钮
        showSearch: true, // 显示搜索按钮
        // 如果设置了showCollapse 折叠按钮，请不要再设置span和offset，组件会自动修改这两个值
        showCollapse: true, // 展开折叠功能---默认为true
        resetText: '清空', // 重置按钮文本
        searchText: '搜索'  // 搜索按钮文本
      }
    },
    "children": [
      {
        "id": "user_name",
        "type":"InputText",
        "label": '用户名',
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "width": 6,
        "attribute":{
          "icon":"user",
          "size":"default",
          "allowClear":true,//是否支持清除
          "placeholder":"请输入用户名",
        }
      },
      {
        "id": "real_name",
        "type":"InputText",
        "label": '真实姓名',
        "width": 6,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
          "placeholder":"请输入真实姓名",
        }
      },
      {
        id: 'role_ids',
        type: "select",
        label: "所属角色",
        width: 6,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 16, offset: 1},// 输入框长度
        isRemote: true,
        dataUrl: '/roles?q=select',
        params: {},
        fieldsName: {
          label: 'name',
          value: 'record_id'
        },
        data: [],
        attribute: {
          size:'default',
          allowClear: true,
          placeholder: "请选择",
          // 参考antd 文档中select-mode属性
          mode:"multiple",
          disabled: false,
        }
      },
      {
        "id": "status",
        "type":"Radio",
        "label": '用户状态',
        // 若果isRemote为true时，说明需要从远程获取数据，
        isRemote: false,
        data: [
          {label:"全部", value: -1},
          {label:"正常", value: 1},
          {label:"停用", value: 2},
        ],
        dataUrl : '',
        "width": 6,
        "labelCol": {"span":6},
        "wrapperCol": {"span":17, "offset": 1},
        "attribute":{
          "Tooltip":{"title":"提示文本","placement":"top"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": -1
          }
        }
      }
    ]
  },
  {
    id: 'table1',
    type: 'Table',
    // 每行数据的key值，由函数渲染，组件内部会执行eval，所以请书写正确可执行的函数
    rowKeys: 'record => record.record_id',
    // pagination: {}, //可以不用传或者false
    attribute: {
      bordered: false,
      size : 'default',
      showHeader: true,
      // 不传自响应
      // scroll:{           // table scroll
      //   x: 300,
      //   y: 100
      // },
      // wrapperStyle: {    // 最外层容器的样式，包括新增按钮
      //   width: '800px',
      //   height: '300px',
      //   overflow: 'auto'
      // },
      // tableStyle: {      // table的样式
      //   width: '100%',
      //   overflow: 'hidden'
      // }
    },
    // 这里isRemote为true的话，会直接从当前菜单的resources中找到code为query的url进行请求
    isRemote: true,
    data: [],
    params: {},
    // 对于render中解决不了的function问题，可以吧function当做字符串存储，然后在组件中获取的时候eval（）
    // TODO 问题所在，这里如果使用eval执行函数的话，会不支持jsx语法，所以只能在函数中返回字符串，不能返回jsx语法标签
    columns : [
      {
        title: '用户名',
        dataIndex: 'user_name',
        align: 'center',
        width: '200px',
        // customRender: `(text, record, index)=>{
        //   return text
        // }`,
        scopedSlots: {
          customRender: 'template',
          render: `(text, record, index) => {
            // 注意这里return的一定是一个数组，哪怕只需要渲染一个元素
            return [
              {
                type: 'Button',
                text: text,
                attribute: {
                  wrapperStyle: {
                    display: 'inline-block'
                  },
                  type: 'default',
                  size: 'small'
                },
                onClick : \`(that) => {
                  message.info('点击了\${text}按钮')
                  that.$emit('submitEvent', 'jsonobj.set("divModal","attribute.visible", !jsonobj.get("divModal","attribute.visible"))')
                }\`
              }
            ]
          }`
        },
      },
      {
        title: '真实姓名',
        dataIndex: 'real_name',
        align: 'center',
        width: '200px',

      },
      {
        title: '角色名称',
        dataIndex: 'roles',
        align: 'roles',
        width: '200px',
        // customRender: `(text, record, index)=>{
        //   let res = '';
        //   for(let i=0; i<text.length; i++){
        //     res += text[i].name+ ' '
        //   }
        //   return res;
        // }`,
        scopedSlots: {
          customRender: 'template',
          render: `(text, record, index) => {
            // console.log('配置文件中的render方法', text, record)
            let res = [];
            for(let i=0; i<text.length; i++) {
              res.push({
                id: 'tag' + i,
                type: 'tag',
                text: text[i].name,
                attribute: {
                  color: 'green'
                }
              })
            }
            return res;
          }`
        },
        // scopedSlots: {customRender: 'roles'}
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        align: 'center',
        width: '200px',
        // customRender: `(text, record, index)=>{
        //   if(text === 1){
        //     return '启用'
        //   }else {
        //     return '停用'
        //   }
        // }`,
        // status状态为直接渲染status
        // scopedSlots: { customRender: 'status'},
        scopedSlots: {
          customRender: 'template',
          render: `(text, record, index) => {
            return [
              {
                id: 'switch',
                type: 'switch',
                attribute: {
                  checkedChildren: '启用',
                  unCheckedChildren: '停用',
                  checked: text === 1 ? true : false
                },
                onChange: \`(checked, that) => {
                  // 这里的check参数是change过后switch的选中状态， that指的是当前switch组件的this，可以通过that对当前switch进行loading和发送请求等 
                  console.log(checked)
                  that.loading = true;
                  // 在这里可以进行请求或者其他操作，如果想要使用inner方法，请使用 that.$emit('submitEvent', 'jsonobj.set(...)')
                  setTimeout(()=>{
                    that.loading = false;
                    message.success('修改成功');
                  },1000)
                }\`
              }
            ]
          }`
        }
      },
      // {
      //   title: '邮箱',
      //   dataIndex: 'email',
      //   align: 'center',
      //   width: '200px',
      // },
      // {
      //   title: '手机号',
      //   dataIndex: 'phone',
      //   align: 'center',
      //   width: '200px',
      // },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        align: 'center',
        width: '220px',
        customRender: `(text, record, index)=>{
          return text.split('T')[0]+ ' ' + text.split('T')[1].split('+')[0];
        }`
        // scopedSlots: {customRender: 'created'},
      },
      {
        title: '操作',
        dataIndex: 'record_id',
        align: 'center',
        width: '300px',
        scopedSlots: {customRender: 'operation'},
      }], // 列表字段--渲染方式
    toolsBar: { //表格上方工具栏
      // 右侧
      right: {
        wrapperStyle: {
          textAlign: 'right'
        },
        children: [
          {
            id: 'createBtn',
            action: 'create', // 这里只有action指定为create才会根据当前用户权限action来判断是否disabled
            type: 'Button',
            text: '新建',
            attribute: {
              wrapperStyle: {
                display: 'inline-block'
              },
              type: 'primary',
              icon: 'plus',
              // 在点击按钮执行的内部方法
              inner: 'jsonobj.set("table1", "operation.create.visible", true)'
            },
            onClick : `(that) => {
              console.log('点击create按钮',that)
            }`
          }
        ]
      },
      // 左侧
      left: {
        children: [
          {
            id: 'exportBtn',
            type: 'Button',
            text: '导出',
            attribute: {
              wrapperStyle: {
                display: 'inline-block'
              },
              type: 'primary',
              icon: 'export',
            },
            onClick : `(that) => {
              message.info('点击了export按钮')
            }`
          }
        ]
      },
    },
    operation: {
      create: {
        visible: false,
        showBtn: true,
        title: '新建用户',
        width: 550,
        form: {
          // 这里吧role_ids进行转化，并添加其想要修改的内容---
          beforeSubmit : `(values) => {
            if(!values.role_ids) return;
            let roles = [];
            for(let i=0; i<values.role_ids.length; i++) {
              roles.push({
                role_id: values.role_ids[i]
              })
            }
            values.roles = roles;
            console.log('创建请求钩子函数执行后的参数', values);
          }`,
          // 创建时表单内容
          children : [
            {
              "id": "user_name",
              "type":"InputText",
              "label": '用户名',
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "width": 24,
              "attribute":{
                "allowClear":true, //是否支持清除
                "placeholder":"请输入用户名",
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请输入用户名"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "password",
              "type":"InputText",
              "label": '密码',
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "width": 24,
              "attribute":{
                type: 'password', // 这里的type指的是input的type
                "allowClear":true,//是否支持清除
                "placeholder":"请输入密码",
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请输入密码"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "real_name",
              "type":"InputText",
              "label": '真实姓名',
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "placeholder":"请输入真实姓名",
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请输入真实姓名"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "email",
              "type":"InputText",
              "label": '邮箱',
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "placeholder":"请输入邮箱",
                "decorator":{
                  "rules":[
                    { required: false, message: '' },
                    {pattern:/^(\w+\.?)*\w+@(?:\w+\.)\w+$/,message:'请输入正确的邮箱格式'}
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "phone",
              "type":"InputText",
              "label": '手机号',
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "placeholder":"请输入手机号",
                "decorator":{
                  "rules":[
                    { required: false, message: '' },
                    { max:11, message:'手机号码超长'},
                    { min:11, message:'手机号码位数不足'}
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              id: 'role_ids',
              type: "select",
              label: "所属角色",
              width: 24,    // 4-24
              labelCol: {span: 6},   // 文案长度
              wrapperCol: {span: 16, offset: 1},// 输入框长度
              isRemote: true,
              dataUrl: '/roles?q=select',
              params: {},
              fieldsName: {
                label: 'name',
                value: 'record_id'
              },
              attribute: {
                size:'default',
                allowClear: true,
                placeholder: "请选择",
                // 参考antd 文档中select-mode属性
                mode:"multiple",
                disabled: false,
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请选择角色"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "status",
              "type":"Radio",
              "label": '用户状态',
              // 若果isRemote为true时，说明需要从远程获取数据，
              isRemote: false,
              data: [
                {label:"正常", value: 1},
                {label:"停用", value: 2},
              ],
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请选择用户状态"},
                  ],
                  "initialValue": 1
                }
              }
            }
          ]
        }
      },
      edit: {
        showBtn: true,
        title: '编辑用户',
        width: 550,
        form: {
          beforeSubmit : `(values, record) => {
            if(!values.roles) return;
            let roles = [];
            for(let i=0; i<values.roles.length; i++) {
              roles.push({
                role_id: values.roles[i]
              })
            }
            values.roles = roles;
            values.record_id = record.record_id;
            console.log('编辑请求钩子函数执行后的参数', values);
          }`,
          // 编辑表单需要展示的字段配置 --- 通过配置好id跟点击行对应的record的key值一致来做初始值
          children: [
            {
              "id": "user_name",
              "type":"InputText",
              "label": '用户名',
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "width": 24,
              "attribute":{
                "allowClear":true, //是否支持清除
                "placeholder":"请输入用户名",
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请输入用户名"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "password",
              "type":"InputText",
              "label": '密码',
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "width": 24,
              "attribute":{
                type: 'password', // 这里的type指的是input的type
                "allowClear":true,//是否支持清除
                "placeholder":"如果不输入密码代表不修改",
                "decorator":{
                  "rules":[
                    {"required":false,"message":"请输入密码"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "real_name",
              "type":"InputText",
              "label": '真实姓名',
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "placeholder":"请输入真实姓名",
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请输入真实姓名"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "email",
              "type":"InputText",
              "label": '邮箱',
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "placeholder":"请输入邮箱",
                "decorator":{
                  "rules":[
                    { required: false, message: '' },
                    {pattern:/^(\w+\.?)*\w+@(?:\w+\.)\w+$/,message:'请输入正确的邮箱格式'}
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "phone",
              "type":"InputText",
              "label": '手机号',
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "placeholder":"请输入手机号",
                "decorator":{
                  "rules":[
                    { required: false, message: '' },
                    { max:11, message:'手机号码超长'},
                    { min:11, message:'手机号码位数不足'}
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              id: 'roles',
              type: "select",
              label: "所属角色",
              width: 24,    // 4-24
              labelCol: {span: 6},   // 文案长度
              wrapperCol: {span: 16, offset: 1},// 输入框长度
              isRemote: true,
              dataUrl: '/roles?q=select',
              params: {},
              fieldsName: {
                label: 'name',
                value: 'record_id'
              },
              attribute: {
                size:'default',
                allowClear: true,
                placeholder: "请选择",
                // 参考antd 文档中select-mode属性
                mode:"multiple",
                disabled: false,
                // 如果存在初始值render方法的时候，会按照函数的方式执行，而不是直接命名 --- 参数为table每列中的对应值
                initialValueRender : `(value) => {
                  if(!value || value.length <=0) return;
                  let res = [];
                  for(let i=0; i<value.length; i++){
                    res.push(value[i].record_id)
                  }
                  return res;
                }`,
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请选择角色"},
                  ],
                  "validateTrigger":"blur",
                }
              }
            },
            {
              "id": "status",
              "type":"Radio",
              "label": '用户状态',
              // 若果isRemote为true时，说明需要从远程获取数据，
              isRemote: false,
              data: [
                {label:"正常", value: 1},
                {label:"停用", value: 2},
              ],
              "width": 24,
              "labelCol": {"span":6},
              "wrapperCol": {"span":16, "offset": 1},
              "attribute":{
                "decorator":{
                  "rules":[
                    {"required":true,"message":"请选择用户状态"},
                  ],
                  "initialValue": 1
                }
              }
            }
          ]
        }
      },
      delete: {
        showBtn: true,
        form: {
          beforeSubmit : `delId => {
           console.log('删除前的钩子函数', delId);
          }`,
        }
      },
      enable: {
        showBtn: true,
        form: {
          beforeSubmit : ``
        }
      },
      disable: {
        showBtn: true,
      }
    }
  },
  {
    id: 'divModal',
    type: 'Modal',
    isRemote: false,  //是否获取远程数据，如果是的话，内容json由data求处理的结果作为数据解析, 否则内容由content为准
    attribute: {
      visible: false,
      title: '带表单的Modal',
      width: 600,
      zIndex: 999,
      autoFocusButton: 'ok',  // null|string: ok cancel --- 指定自动获得焦点的按钮
      cancelText : '取消',
      okText: '确认',
      okType: 'primary',
      confirmLoading: false,
      closable: true,
    },
    methods: {
      cancel: `(e, that) => {
        console.log(e, that);
        that.$emit('submitEvent', "jsonobj.set('divModal','attribute.visible',false)")
      }`,
      ok: `(e, that) => {
        // e和that分别为事件e和当前组件的this
        console.log(e, that)
        that.$emit('submitEvent', "jsonobj.set('divModal','attribute.confirmLoading',true); jsonobj.set('modalDiv','html','2s后自动关闭');")
        setTimeout(() => {
          that.$emit('submitEvent', "jsonobj.set('divModal','attribute.visible',false);")
          that.$emit('submitEvent', "jsonobj.set('modalDiv','html','这是一个div形式的的Modal');")
          that.$emit('submitEvent', "jsonobj.set('divModal','attribute.confirmLoading',false);")
        }, 2000)
        
      }`
    },
    children: [
      {
        id: 'modalDiv',
        type: 'div',
        html: '这是一个div形式的的Modal',
        style: {}
      }
    ]
  }
]

