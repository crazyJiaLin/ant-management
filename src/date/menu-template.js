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
          "label": '用户名',
          "placeholder":"提示信息",
          "type":"text",
          "attribute":{
            "icon":"user",
            "size":"small",
            "allowClear":true,//是否支持清除
            "labelCol": {"span":6},
            "wrapperCol": {"span":16},
            "Tooltip":{"title":"提示文本","placement":"top"},//提示信息  默认无
            "addonBefore":"<a-icon type='user'>",
            "addonAfter":"<a-icon type='close'>",
            //参考antd v-decorator配置 (https://vue.ant.design/components/form-cn/#API)
            "decorator":{
               "rules":[
                   {"required":true,"message":"请输入手机号"},
                   {"pattern":"/^1[34578]\d{9}$/","message":"请输入正确的手机号"}
               ],
               "validateTrigger":"blur",
               "initialValue": "15699555750"
             }
          }
        }
      ]
    }
  }
]
