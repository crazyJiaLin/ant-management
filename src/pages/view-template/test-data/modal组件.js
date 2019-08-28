// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
/**
 * 目前属性值中碰到函数的，只能吧函数转为字符串，然后存入，关于解析只支持部分，有待完善
 * 所以在需要传函数的时候，一定要传正确可执行的函数，不然有一些必须的值拿不到，组件会报错
 * */
export default [
  {
    "id": "formModalBtn",
    "type":"Button",
    text: '带表单的Modal',
    "attribute":{
      "size":"default",
      disabled: false,
      loading: false,
      type: 'primary',
      icon: 'eye',
      "inner":"jsonobj.set('formModal','attribute.visible',true)",
      wrapperStyle : {
        display: 'inline-block',
        margin: '20px'
      }
    }
  },
  {
    "id": "divModalBtn",
    "type":"Button",
    text: '普通Modal',
    "attribute":{
      "size":"default",
      disabled: false,
      loading: false,
      type: 'primary',
      icon: 'eye',
      "inner":"jsonobj.set('divModal','attribute.visible',true)",
      wrapperStyle : {
        display: 'inline-block',
        margin: '20px'
      }
    }
  },
  {
    id: 'formModal',
    type: 'Modal',
    isRemote: false,  //是否获取远程数据，如果是的话，内容json由data求处理的结果作为数据解析, 否则内容由content为准
    data : {
      method: 'GET',
      dataUrl: '',      // 远程数据获取url
      isBase64Data : false,   // 获取到的数据是否为base64格式，如果为base64格式的话组件内部进行解码
    },
    attribute: {
      visible: false,
      title: '带表单的Modal',
      width: 600,
      zIndex: 999,
      destroyOnClose: true,   // 关闭时是否销毁 Modal 里的子元素
      autoFocusButton: 'ok',  // null|string: ok cancel --- 指定自动获得焦点的按钮
      cancelText : '取消',
      okText: '确认',
      okType: 'primary',
      confirmLoading: false,
      closable: true,
      footer: null  // footer，用于设置弹出框的footer，这里因为content是form表单，提交的动作需要由表单处理，
                    // 所以将modal的footer设置为null，不让他显示，用form的button代替
    },
    methods: {
      cancel: `(e, that) => {
        console.log(e, that);
        that.$emit('submitEvent', "jsonobj.set('formModal','attribute.visible',false)")
      }`,
      ok: `(e, that) => {
        // e和that分别为事件e和当前组件的this
        console.log(e, that)
        that.$emit('submitEvent', "jsonobj.set('formModal','attribute.confirmLoading',true); jsonobj.set('formModal','attribute.title','2s后自动关闭');")
        setTimeout(() => {
          that.$emit('submitEvent', "jsonobj.set('formModal','attribute.visible',false);")
          that.$emit('submitEvent', "jsonobj.set('formModal','attribute.title','弹出框');")
          that.$emit('submitEvent', "jsonobj.set('formModal','attribute.confirmLoading',false);")
        }, 2000)
        
      }`
    },
    children: [
      {
        id: 'form',
        type: 'Form',
        method: 'post',
        url: '/test',
        // 这里的params即表单按照decorator中配置的项解析出来的参数，如果有数据变动，请在beforeSubmit钩子函数中处理
        beforeSubmit: `(params, that) => {
          // 表单提交之前，将表单提交按钮置为loading状态
          that.$emit('submitEvent', "jsonobj.set('formSubmitBtn','attribute.loading',true)");
          notification.info({
            message: 'beforeSubmit',
            description: JSON.stringify(params)
          })
        }`,
        submitted: `(res, that) => {
          // 提交成功后，取消loading状态
          that.$emit('submitEvent', "jsonobj.set('formSubmitBtn','attribute.loading',false)");
           console.log(res);
           notification.success({
            message: '表单提交成功'
           });
        }`,
        failed: `(err, that) => {
          // 提交失败后，取消loading状态
          that.$emit('submitEvent', "jsonobj.set('formSubmitBtn','attribute.loading',false)");
          console.log(err)
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
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center'
          },
          formStyle: {
            width: '100%',
            // background: '#fff0f0'
          },
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
                  {"required":false,"message":"请选择"},
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
            id: 'divideLine',
            type: 'div',
            style: {
              width: '100%',
              height: '0',
              display: 'inline-block',
              marginBottom : '15px',
              borderBottom: '1px solid #e8e8e8'
            }
          },
          {
            "id": "formSubmitBtn",
            "type":"Button",
            text: '确认',
            "width": 4,
            offset: 15,
            "attribute":{
              "size":"default",
              htmlType: 'submit',
              disabled: false,
              loading: false,
              type: 'primary',
              icon: 'dingding',
              wrapperStyle: {
                textAlign: 'right',
              },
              "inner":"",
            }
          },
          {
            "id": "reset",
            "type":"Button",
            text: '取消',
            "width": 4,
            offset: 1,
            "attribute":{
              "size":"default",
              disabled: false,
              loading: false,
              type: 'default',
              icon: 'aliwangwang',
              wrapperStyle: {
                textAlign: 'right',
              },
              "inner":"jsonobj.set('formSubmitBtn','attribute.loading',false); jsonobj.set('formModal','attribute.visible',false);",
            }
          },
        ]
      }
    ]
  },
  {
    id: 'divModal',
    type: 'Modal',
    isRemote: false,  //是否获取远程数据，如果是的话，内容json由data求处理的结果作为数据解析, 否则内容由content为准
    data : {
      method: 'GET',
      dataUrl: '',      // 远程数据获取url
      isBase64Data : false,   // 获取到的数据是否为base64格式，如果为base64格式的话组件内部进行解码
    },
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
