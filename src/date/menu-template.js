let template = [
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
          "type":"Text",
          "label": '手机号',
          "labelCol": {"span":6},
          "wrapperCol": {"span":16},
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
                   {"pattern":"/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/",
                     "message":"请输入正确的手机号"}
               ],
               "validateTrigger":"blur",
               "initialValue": "15699555750"
             }
          }
        },
        {
          "id": "textarea",
          "type":"Textarea",
          "label": '多行文本输入框',
          "width": 8,
          "labelCol": {"span":7},
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
        }
      ]
    }
  }
]
