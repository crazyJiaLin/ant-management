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
      searchBtn: { // TODO 操作按钮配置
        showReset: true,  // 显示重置按钮
        showSearch: true, // 显示搜索按钮
        span: 24,         // 操作按钮宽度
        offset: 0,        // 操作按钮偏移量
        resetText: 'reset', // 重置按钮文本
        searchText: 'search'  // 搜索按钮文本
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
    },
    isRemote: true,
    data: [],
    dataUrl: 'users?q=page',
    params: {},
    // 对于render中解决不了的function问题，可以吧function当做字符串存储，然后在组件中获取的时候eval（）
    // TODO 问题所在，这里如果使用eval执行函数的话，会不支持jsx语法，所以只能在函数中返回字符串，不能返回jsx语法标签
    columns : [
      {
        title: '用户名',
        dataIndex: 'user_name',
        align: 'center',
        width: '200px',
        customRender: `(text, record, index)=>{
        return text
      }`
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
        customRender: `(text, record, index)=>{
          let res = '';
          for(let i=0; i<text.length; i++){
            res += text[i].name+ ' '
          }
          return res;
        }`
        // scopedSlots: {customRender: 'roles'}
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        align: 'center',
        width: '200px',
        customRender: `(text, record, index)=>{
          if(text === 1){
            return '启用'
          }else {
            return '停用'
          }
        }`
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        align: 'center',
        width: '200px',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        align: 'center',
        width: '200px',
      },
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
    operation: {
      create: {
        showBtn: true,
        title: '新建用户',
        width: 550,
        form: {
          method: 'post',
          url: '/users',
          // 这里吧role_ids进行转化，并添加其想要修改的内容---
          // 注意这里不能使用不能使用this指向vue或者使用import的东西（如md5)---- TODO 密码提交怎么办？
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
          method: 'put',
          // 在用这块的时候记得用正则替换掉占位符{id}
          url: '/users/{id}',
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
        showBtn: true
      }
    }
  }
]

