// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
/**
 * 目前属性值中碰到函数的，只能吧函数转为字符串，然后存入，关于解析只支持部分，有待完善
 * 所以在需要传函数的时候，一定要传正确可执行的函数，不然有一些必须的值拿不到，组件会报错
 * */
export default [
  {
    id: 'div1',
    type: 'div',
    text: '日常表单',
    style: {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  },
  {
    id: 'form',
    type: 'Form',
    method: 'post',
    url: '/test',
    // 这里的params即表单按照decorator中配置的项解析出来的参数，如果有数据变动，请在beforeSubmit钩子函数中处理
    beforeSubmit: `(params) => {
      notification.info({
        message: 'beforeSubmit',
        description: JSON.stringify(params)
      })
    }`,
    submitted: `(res) => {
       console.log(res);
       notification.success({
        message: '表单提交成功'
       });
    }`,
    failed: `(err) => {
      notification.error({
        message:'表单提交失败',
        description: err.response.data.error.message
      })
    }`,
    "attribute": {
      layout: 'horizontal',
      wrapperStyle:{
        width: '100%',
        height: '100%',
        padding: '15px 0 100px',
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center'
      },
      formStyle: {
        width: '50%',
        // background: '#fff0f0'
      },
      // searchBtn: {
      //   showReset: true,  // 显示重置按钮
      //   showSearch: true, // 显示搜索按钮
      //   span: 24,         // 操作按钮宽度
      //   offset: 0,        // 操作按钮偏移量
      //   resetText: 'clear', // 重置按钮文本
      //   searchText: 'search'  // 搜索按钮文本
      // }
    },
    "children": [
      {
        "id": "input1",
        "type":"InputText",
        "label": 'input',
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "icon":"user",
          "size":"default",
          "allowClear":true,//是否支持清除
          "placeholder":"请输入手机号",
          "decorator":{
            "rules":[
              {"required":true,"message":"请输入手机号"},
              // {"pattern":"/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/",
              //   "message":"请输入正确的手机号"}
            ],
            "validateTrigger":"blur",
            // "initialValue": "15699555750"
          }
        }
      },
      {
        "id": "number1",
        "type":"InputNumber",
        "label": '数字输入框',
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "placeholder":"请输入数字",
          "formatter":"￥",
          "max":10,"min":0,
          size: 'default',
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        "id": "textarea",
        "type":"Textarea",
        "label": 'textarea',
        "width": 24,
        "labelCol": {"span":3},
        "wrapperCol": {"span":19, "offset": 1},
        "attribute":{
          "placeholder":"提示信息textarea",
          "autosize": { minRows: 2, maxRows: 3 },
          "Tooltip":{"title":"请输入多行文本","placement":"bottom"},//提示信息  默认无
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        id: 'role_ids',
        type: "select",
        label: "远程select",
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        isRemote: true,             // 返回数据类型为data.list---Array
        dataUrl: '/roles?q=select',
        params: {},
        // 这里如果规定了fieldsName，则会按照这个映射规则来渲染data中或者远程数据中的数据
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
          "decorator":{
            "rules":[
              {"required":true,"message":"请选择"},
            ],
          }
        }
      },
      {
        id: 'select1',
        type: "select",
        label: "select",
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        isRemote: false,
        dataUrl: '',
        data: [          // 选项数组
          {
            label: 'Apple',
            value: 'Apple',
            // disabled: false
          },
          {
            label: 'Pear',
            value: 'Pear',
            // disabled: true
          },
          {
            label: 'Orange'
            , value: 'Orange',
            disabled: false
          },
          {
            label: 'Banana'
            , value: 'Banana'
            , disabled: false
          },
          {
            label: 'Blueberry',
            value: 'Blueberry',
            disabled: false
          },
          {
            label: 'Cherry',
            value: 'Cherry',
            disabled: false
          },
          {
            label: 'Nuts',
            value: 'Nuts',
            disabled: false
          },
          {
            label: 'Grape',
            value: 'Grape',
            disabled: false
          },
        ],
        attribute: {
          size:'default',
          allowClear: true,
          placeholder: "please select",
          // 参考antd 文档中select-mode属性
          mode:"multiple",
          disabled: false,
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": 'Apple'
          }
        }
      },
      {
        "id": "cascader1",
        "type":"Cascader",
        "label": '级联选择器',
        isRemote: true,
        // 如果isRemote为false，data为必须项，作为级联选择器的options
        data: [  //选项
          {label: 'aaa', value: 'aaa', children: [
              {label: 'aaa-1', value: '1-1'},
              {label: 'aaa-2', value: '1-2'},
            ]},
          {label: 'bbb', value: 'bbb'},
          {label: '123', value: '132'},
        ],
        // 如果isRemote为true，说明需要从远程获取数据，此时的dataUrl为发送get请求的路径
        // （目前考虑到所有获取数据的方法都是get，如果后续有需求，可以将dataUrl设置为对象，让组件知道发送的方法地址和参数）
        dataUrl: '/menus?q=tree',
        //如果options中数据不是规定的数据，请声明filedName作为映射规则
        fieldNames:  {
          label: 'name',
          value: 'record_id',
          children: 'children'
        },
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "suffixIcon":"user",
          "size":"default",
          allowClear : true,
          "Tooltip":{"title":"提示文本","placement":"top"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": []
          }
        }
      },
      {
        "id": "timePicker1",
        "type":"TimePicker",
        "label": '时间选择器',
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "placeholder":"hh:mm:ss",
          format: "hh:mm:ss",
          size: 'default',
          "Tooltip":{"title":"请选择时间","placement":"bottom"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        "id": "datePicker1",
        "type":"DatePicker",
        "label": '日期选择器',
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "placeholder":"YYYY-MM-DD",
          format: "YYYY-MM-DD",
          showTime: true,
          size: 'default',
          "Tooltip":{"title":"请选择日期","placement":"top"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        "id": "monthPicker1",
        "type":"MonthPicker",
        "label": '月选择',
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "placeholder":"YYYY-MM",
          format: "YYYY-MM",
          size: 'default',
          "Tooltip":{"title":"请选择月份","placement":"top"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        "id": "inputGroup",
        "type":"inputGroup",
        "label": 'input-group',
        "width": 24,
        "labelCol": {"span":3},
        "wrapperCol": {"span":19, "offset": 1},
        "attribute":{
          size: "default",
        },
        children: [
          {
            id: 'select-group',
            type: "select",
            label: "select",
            isRemote: false,
            dataUrl: '',
            data: [          // 选项数组
              {
                label: 'Apple',
                value: 'Apple',
                // disabled: false
              },
              {
                label: 'Pear',
                value: 'Pear',
                // disabled: true
              },
              {
                label: 'Orange'
                , value: 'Orange',
                disabled: false
              },
              {
                label: 'Banana'
                , value: 'Banana'
                , disabled: false
              },
              {
                label: 'Blueberry',
                value: 'Blueberry',
                disabled: false
              },
              {
                label: 'Cherry',
                value: 'Cherry',
                disabled: false
              },
              {
                label: 'Nuts',
                value: 'Nuts',
                disabled: false
              },
              {
                label: 'Grape',
                value: 'Grape',
                disabled: false
              },
            ],
            attribute: {
              size:'default',
              allowClear: true,
              placeholder: "please select",
              // 参考antd 文档中select-mode属性
              // mode:"multiple",
              disabled: false,
              style: {
                width: "30%"
              },
              "decorator":{
                "rules":[
                  {"required":false,"message":""},
                ],
                "initialValue": 'Apple'
              }
            }
          },
          {
            "id": "input2",
            "type":"InputText",
            "attribute":{
              style: {
                width: '40%'
              },
              "icon":"user",
              "size":"default",
              "allowClear":true,//是否支持清除
              "placeholder":"请输入手机号",
              "decorator":{
                "rules":[
                  {"required":true,"message":"请输入手机号"},
                ],
                "validateTrigger":"blur",
                // "initialValue": "15699555750"
              }
            },
          },
          {
            "id": "input3",
            "type":"InputText",
            "attribute":{
              style: {
                width: '30%'
              },
              "icon":"user",
              "size":"default",
              "allowClear":true,//是否支持清除
              "placeholder":"请输入手机号",
              "decorator":{
                "rules":[
                  {"required":true,"message":"请输入手机号"},
                ],
                "validateTrigger":"blur",
                // "initialValue": "15699555750"
              }
            },
          },
        ]
      },
      {
        "id": "rangePicker1",
        "type":"RangePicker",
        "label": '日期范围',
        "width": 24,
        "labelCol": {"span":3},
        "wrapperCol": {"span":19, "offset": 1},
        "attribute":{
          // 范围选择的placeholder要为数组，否则会报错
          "placeholder":["YYYY-MM-DD","结束时间"],
          format: "YYYY-MM-DD",
          size: 'default',
          showTime: false,
          "Tooltip":{"title":"请选择日期范围","placement":"top"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        "id": "inputSearch1",
        "type":"inputSearch",
        "label": '搜索输入框',
        // 若果isRemote为true时，说明需要从远程获取数据，
        isRemote: false,
        data: '', //
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "icon":"user",
          "size":"default",
          "enterButton": true,
          "Tooltip":{"title":"提示文本","placement":"top"},
          "inner":"jsonobj.submit('form1')", //change关联
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        id: 'upload1',
        type: 'Upload',
        text: '点击上传',
        action: '/',  // 上传地址
        name: '123',     // 发到后台的文件参数名
        headers: {
          authorization: 'authorization-text',
        },
        withCredentials: false, // 上传请求时是否携带 cookie
        label: '上传',
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        attribute: {
          directory: false, // 支持上传文件夹
          accept: '',       // 接受上传的文件类型
          multiple: false,  // 是否支持多选文件
          icon: 'windows'
        }
      },
      {
        "id": "status",
        "type":"Radio",
        "label": '用户状态',
        // 若果isRemote为true时，说明需要从远程获取数据，返回数据类型为data.list---Array
        isRemote: false,
        // 也可以规定filesName来对label和value进行映射
        fieldsName: {
          label: 'label',
          value: 'value'
        },
        data: [
          {label:"全部", value: -1},
          {label:"正常", value: 1},
          {label:"停用", value: 2},
          {label:"3", value: 3}
        ],
        dataUrl : '',
        "width": 12,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 2},
        "attribute":{
          "Tooltip":{"title":"提示文本","placement":"top"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": -1
          }
        }
      },
      {
        "id": "switch1",
        "type":"Switch",
        label: '开关',
        width: 12,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 14, offset: 2},// 输入框长度
        "attribute":{
          "checkedChildren":'开',
          unCheckedChildren: '关',
          "size":"default",
          disabled: false,
          // 打开开关时执行的事件
          "checkEvent":"jsonobj.set('submit','attribute.type','danger')",
          // 关闭开关执行的事件
          "unCheckEvent":"jsonobj.set('submit','attribute.type','primary')",
        }
      },
      {
        "id": "checkbox1",
        "type":"Checkbox",
        "label": '多选',
        // 若果isRemote为true时，说明需要从远程获取数据，返回数据类型为data.list---Array
        isRemote: false,
        // 也可以规定filesName来对label和value进行映射
        fieldsName: {
          label: 'label',
          value: 'value'
        },
        data: [
          {label:"多选1", value: "value1","inner":"jsonobj.set('mobile','attribute.disabled',true)"},   //控制 state1 显示/隐藏
          {label:"多选2", value: "value2","inner":"jsonobj.set('mobile','attribute.disabled',false)"},  //选中关联
          {label:"多选3", value: "value3","inner":"jsonobj.set('mobile','attribute.disabled',false)"},  //选中关联
          {label:"多选4", value: "value4","inner":"jsonobj.set('mobile','attribute.disabled',false)"},  //选中关联
          {label:"多选5", value: "value5","inner":"jsonobj.set('mobile','attribute.disabled',false)"},  //选中关联
        ],
        dataUrl : '',
        "width": 24,
        "labelCol": {"span":3},
        "wrapperCol": {"span":19, "offset": 1},
        "attribute":{
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": []
          }
        }
      },
      {
        "id": "submit",
        "type":"Button",
        text: 'submit',
        "width": 6,
        offset: 3,
        "attribute":{
          "size":"default",
          htmlType: 'submit',
          disabled: false,
          loading: false,
          type: 'primary',
          icon: 'dingding',
          "inner":"jsonobj.set('reset','attribute.type','danger')",
        }
      },
      {
        "id": "reset",
        "type":"Button",
        text: 'reset',
        "width": 6,
        offset: 3,
        "attribute":{
          "size":"default",
          htmlType: 'reset',
          disabled: false,
          loading: false,
          type: 'default',
          icon: 'aliwangwang',
          "inner":"jsonobj.set('mobile','attribute.disabled',true)",
        }
      },
    ]
  }
]
