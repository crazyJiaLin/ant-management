template = [
  {
    "id":"query1",
    "type":"query",
    "method":"POST or GET",
    "data":"post or get 数据地址",
    "attribute": {
      "an":true,//是否展开
      "showTable": "table1",//搜索数据显示表格
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
            "allowClear":true,//是否支持清除
            "placeholder":"请输入手机号",
            "Tooltip":{"title":"请输入手机号","placement":"top"},//提示信息  默认无
            "addonBefore":"a",
            "addonAfter":"",
            //参考antd v-decorator配置 (https://vue.ant.design/components/form-cn/#API)
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
          isRemote: false,
          data: '',
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
        }
      ]
    }
  }
]
