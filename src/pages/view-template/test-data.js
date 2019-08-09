// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
export default [
  {
    "id":"query1",
    "type":"query",
    "method":"POST or GET",
    "data":"post or get 数据地址",
    "attribute": {
      "an":true,//是否展开
      "showTable": "table1",//搜索数据显示表格
    },
    "children": [
      {
        "id": "mobile",
        "type":"InputText",
        "label": '手机号',
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "width": 8,
        "attribute":{
          "icon":"user",
          "size":"default",
          disabled: false,
          "allowClear":true,//是否支持清除
          "placeholder":"请输入手机号",
          "Tooltip":{"title":"请输入手机号","placement":"top"},//提示信息  默认无
          "addonBefore":"a",
          "addonAfter":"",
          //参考antd v-decorator配置 (https://vue.ant.design/components/form-cn/#API)
          "decorator":{
            "rules":[
              {"required":false,"message":"请输入手机号"},
              // {"pattern":"/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/",
              //   "message":"请输入正确的手机号"}
            ],
            "validateTrigger":"blur",
            // "initialValue": "15699555750"
          }
        }
      },
      {
        "id": "textarea",
        "type":"Textarea",
        "label": '多行文本输入框',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
          "placeholder":"提示信息textarea",
          "autosize": { minRows: 1, maxRows: 2 },
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
        "id": "timePicker1",
        "type":"TimePicker",
        "label": '时间选择器',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
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
        },
        methods: {
          //因为JSON.stringfy不能转化function，如果必须的话可以采用m-test中的强制序列化方式
          "onChange"(time, timeString) {
            console.log(time, timeString)
          },
        }
      },
      {
        "id": "datePicker1",
        "type":"DatePicker",
        "label": '日期选择器',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
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
        "id": "rangePicker1",
        "type":"RangePicker",
        "label": '日期范围',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
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
        "id": "monthPicker1",
        "type":"MonthPicker",
        "label": '月选择',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
          "placeholder":"YYYY-MM-DD",
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
        "id": "number1",
        "type":"InputNumber",
        "label": '数字输入框',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
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
        "id": "inputSearch1",
        "type":"inputSearch",
        "label": '搜索输入框',
        // 若果isRemote为true时，说明需要从远程获取数据，
        isRemote: false,
        data: '', //
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
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
        "id": "radio1",
        "type":"Radio",
        "label": '单选',
        // 若果isRemote为true时，说明需要从远程获取数据，
        isRemote: false,
        data: [
          {label:"选项1", value: "value1","inner":"jsonobj.set('mobile','attribute.disabled',true)"},//控制 state1 显示/隐藏
          {label:"选项2", value: "value2","inner":"jsonobj.set('mobile','attribute.disabled',false)"}//选中关联
        ],
        dataUrl : '',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
          "Tooltip":{"title":"提示文本","placement":"top"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        }
      },
      {
        "id": "checkbox1",
        "type":"Checkbox",
        "label": '多选',
        // 若果isRemote为true时，说明需要从远程获取数据，
        isRemote: false,
        data: [
          {label:"多选1", value: "value1","inner":"jsonobj.set('mobile','attribute.disabled',true)"},//控制 state1 显示/隐藏
          {label:"多选2", value: "value2","inner":"jsonobj.set('mobile','attribute.disabled',false)"}//选中关联
        ],
        dataUrl : '',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
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
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
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
        "id": "button1",
        "type":"Button",
        text: '我是按钮1',
        "width": 4,
        offset: 0,
        "attribute":{
          "size":"default",
          disabled: false,
          loading: false,
          type: 'primary',
          icon: 'user',
          "inner":"jsonobj.set('datePicker1','attribute.disabled',true)",
        }
      },
      {
        "id": "switch1",
        "type":"Switch",
        label: '开关',
        "width": 4,
        offset: 0,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
          "checkedChildren":'开',
          unCheckedChildren: '关',
          "size":"default",
          disabled: false,
          // 打开开关时执行的事件
          "checkEvent":"jsonobj.set('button1','attribute.type','danger')",
          // 关闭开关执行的事件
          "unCheckEvent":"jsonobj.set('button1','attribute.type','primary')",
        }
      },
      {
        id: 'select1',
        type: "select",
        label: "select",
        width: 8,    // 4-24
        labelCol: {span: 6},   // 文案长度
        wrapperCol: {span: 15, offset: 1},// 输入框长度
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
         // "Tooltip":{"title":"提示文本","placement":"top"},
         "decorator":{
           "rules":[
             {"required":false,"message":""},
           ],
           "initialValue": 'Apple'
         }
       }
      },
      {
        "id": "selectSearch1",
        "type":"selectSearch",
        "label": '搜索输入框',
        isRemote: false,
        // isRemote为false时，说明采用本地数据（data为数组，text和value作为每一项的key格式）
        data: [
          { text: "hello", value: "hello"},
          { text: "asd", value: "asd"},
          { text: "123", value: "123"},
          { text: "333", value: "456"}
        ],
        // 如果isRemote为true时，说明需要从远程获取数据(dataUrl不为空)，
        dataUrl: '',
        "width": 8,
        "labelCol": {"span":6},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
          filterOption: true,
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
        id: 'a1',
        type: "A",
        width: 8,
        offset: 0,
        text: '这是一个链接',
        href: 'https://www.baidu.com',
        icon: 'user',
        _blank: true,
      }
    ]
  },
  {
    id: 'a1',
    type: "A",
    text: '这是一个链接',
    href: 'https://www.baidu.com',
    icon: 'user',
    _blank: true,
  }
]

