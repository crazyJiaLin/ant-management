// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
/**
 * 目前属性值中碰到函数的，只能吧函数转为字符串，然后存入，关于解析只支持部分，有待完善
 * */
export default [
  {
    "id":"query1",
    "type":"query",
    "method":"POST or GET",
    "data":"post or get 数据地址",
    "tableId": "table1",//搜索数据显示表格id
    // 搜索前的钩子函数，请用字符串保存，values为搜索条件的集合，字段名称以children中每个组件的id为准
    "beforeSearch" : `(values) => {
      values.role_ids = values.role_ids.join(',');
    }`,
    "attribute": {
      "an":true,//是否展开
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
        "wrapperCol": {"span":16, "offset": 1},
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
    isRemote: true,
    data: [],
    dataUrl: 'roles?q=page',
    params: {},
    // TODO 对于render中解决不了的function问题，可以吧function当做字符串存储，然后在组件中获取的时候eval（）
    columns : [], // 列表字段--渲染方式
    rowKeys: 'record => record.record_id',
    pagination: {},
    attribute: {
      width: 500,
      height: 600,
      "isCheckbox":true, //是否显示多选
      bordered: false,
      size : 'default'
    }
  }
]

