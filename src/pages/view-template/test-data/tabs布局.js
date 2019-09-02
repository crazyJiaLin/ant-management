// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
/**
 * 目前属性值中碰到函数的，只能吧函数转为字符串，然后存入，关于解析只支持部分，有待完善
 * 所以在需要传函数的时候，一定要传正确可执行的函数，不然有一些必须的值拿不到，组件会报错
 * */
export default [
  {
    id: 'tabs1',
    type: 'Tabs',
    attribute: {
      type: 'line',       // 页签的基本样式，可选 line、card editable-card 类型
      tabPosition: 'left', // 页签位置，可选值有 top right bottom left
      animated : true,    // 是否使用动画切换 Tabs，在 tabPosition=top|bottom 时有效
      defaultActiveKey: 'tab1',   // 默认的key，是tab中的id
      hideAdd: false,     // 是否隐藏加号图标，在 type="editable-card" 时有效
      size: 'default',
      tabBarGutter: 2,    // tabs 之间的间隙
      tabBarStyle: {
      },
      wrapperStyle : {
        width: '60%',
        margin: '50px auto 0'
      }
    },
    children : [
      {
        id: 'tab1',
        title: '带图标',
        isRemote: false,  //是否远程获取数据
        attribute: {
          forceRender: false,   // 被隐藏时是否渲染 DOM 结构
          icon: 'user',
          style: {}
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
        id: 'tab2',
        title: 'tab2',
        isRemote: false,  //是否远程获取数据
        data: {
          method: 'get',
          url: '',
          needBase64: false
        },
        attribute: {
          forceRender: false,   // 被隐藏时是否渲染 DOM 结构
          style: {}
        },
        children: [
          {
            id: 'steps1',
            type: 'Steps',
            attribute: {
              size: 'small',    // 目前支持普通（default）和迷你（small）
              direction: 'horizontal', // 目前支持水平（horizontal）和竖直（vertical）两种方向
              labelPlacement: 'horizontal', // 指定标签放置位置，默认水平放图标右侧，可选vertical放图标下方
              progressDot: false,
              status: 'process',  // 指定当前步骤的状态，可选 wait process finish error
              initial: 0,
              wrapperStyle: {
                width: '90%',
                margin: '20px auto 0'
              },
              stepsStyle: {
                marginBottom: '20px'
              },
              contentStyle: {
                // height: '300px',
                width: '90%',
                margin: '30px auto 0',
                padding: '0 15px',
                borderRadius: '5px',
                boxShadow: '1px 1px 20px 0 rgba(0, 0, 0, .2)'
              },
              actionStyle: {
                margin: '20px 0 50px',
                textAlign: 'center'
              }
            },
            steps: [
              {
                title: '步骤1',
                icon: 'aliwangwang',
                description: '步骤1描述',
                // 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。
                status: 'process',      // 可选：wait process finish error
                content: [
                  {
                    id: 'step1-div',
                    type: 'div',
                    // html-按照html标签来解析文本
                    html: '<h3 style="text-align: center; padding-top: 20px; font-size: 20px;">表单</h3>'
                  },
                  {
                    id: 'step1-form',
                    type: 'Form',
                    method: 'post',
                    url: '/test',
                    submitTimes: 0,  // 用于外界控制submit，改变此值会让表单进行自主提交
                    // 这里的params即表单按照decorator中配置的项解析出来的参数，如果有数据变动，请在beforeSubmit钩子函数中处理 --- 最好不要搞异步的事
                    beforeSubmit: `(params) => {
              console.log('表单提交前的钩子函数', params)
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
                        padding: '25px 0',
                        display: 'flex',
                        alignItem: 'center',
                        justifyContent: 'center'
                      },
                      formStyle: {
                        // width: '90%',
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
                          "autosize": { minRows: 1, maxRows: 3 },
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
                    ]
                  }
                ],
                action: [
                  {
                    id: 'step1-next',
                    type: 'Button',
                    btnType: 'primary',
                    loading: false,
                    text: '下一步',
                    /**
                     * 设置action按钮的类型 next、 previous、 finish、 self
                     * 如果是self，不进行current变化，在表单提交结束后会根据表单提交状态来调用type为self的action中的钩子函数
                     */
                    actionType: 'self',
                    // 在action动作之前需要进行的操作，比如表单提交
                    beforeAction: `(steps, current) => {
                console.log(steps,current)
                // 修改button loading状态为loading
                steps[current.index].action[0].loading = true
                // 查找到form1的表单，通过修改submitTimes进行表单验证提交
                for(let i=0; i<steps[current.index].content.length; i++) {
                  console.log(steps[current.index].content[i])
                  if(steps[current.index].content[i].id === 'step1-form') {
                    console.log('匹配到', steps[current.index].content[i])
                    // 提交表单
                    ++ steps[current.index].content[i].submitTimes
                  }
                }
            }`,
                    // 这里模拟了一个表单提交的过程，想着在表单提交完成后再执行下边的操作
                    formSuccess : `(steps, current) => {
               console.log('formSuccess钩子函数中执行', steps, current)
                // 修改button loading状态
                steps[current.index].action[0].loading = false 
                // 修改当前步骤状态
                steps[current.index].status = 'finish'
                // 跳转到下一步骤
                ++ current.index
            }`,
                    formFailed : `(steps, current) => {
               console.log('formFailed钩子函数中执行', steps, current)
                // 修改button loading状态
                steps[current.index].action[0].loading = false 
                // 修改当前步骤状态 ---- 这里没有测试接口，所以提交失败的情况下也算作成功
                // steps[current.index].status = 'finish'
                // 跳转到下一步骤
                ++ current.index
            }`,
                    validFailed: `(steps, current) => {
               console.log('validFailed钩子函数中执行', steps, current)
               // 修改button loading状态
                steps[current.index].action[0].loading = false 
                // 修改当前step状态
                steps[current.index].status = 'error'
            }`,
                    style: {}
                  }
                ]
              },
              {
                title: '步骤2',
                icon: 'wechat',
                description: 'description of step2',
                content: [
                  {
                    id: 'pre2',
                    type: 'pre',
                    text: `
              step第二部，
              哈哈哈
              text
              hello world
            `
                  },
                  {
                    id: 'button1',
                    type: 'Button',
                    text: '表单信息确认',
                    btnType: 'default',
                    wrapperStyle: {
                      paddingBottom: '30px',
                      textAlign: 'center'
                    },
                    style: {
                    },
                    "size":"large",
                    disabled: false,
                    loading: false,
                    icon: 'user',
                  }
                ],
                action: [
                  {
                    id: 'step2-next',
                    type: 'Button',
                    btnType: 'primary',
                    text: '下一步',
                    actionType: 'next',   // 设置action按钮的类型 next、 previous、 finish
                    // 在action动作之前需要进行的操作，比如表单提交
                    beforeAction: `(steps) => {
                console.log(steps)
              // this.steps[this.current]
            }`,
                    inner: `content.set('form1', 'submitTime', content.get('form1', 'submitTime') + 1)`,
                    style: {}
                  },
                  {
                    id: 'step2-pre',
                    type: 'Button',
                    btnType: 'default',
                    text: '上一步',
                    actionType: 'previous',   // 设置action按钮的类型 next、 previous、 finish
                    // 在action动作之前需要进行的操作，比如表单提交
                    beforeAction: `(steps) => {
                console.log(steps)
              // this.steps[this.current]
            }`,
                    inner: `content.set('form1', 'submitTime', content.get('form1', 'submitTime') + 1)`,
                    style: {
                      marginLeft: '5px'
                    }
                  }
                ]
              },
              {
                title: '步骤3',
                description: 'finished',
                content: [
                  {
                    id: 'step3-icon',
                    type: 'icon',
                    icon: 'check-circle',
                    spin: false,
                    wrapperStyle: {
                      margin: '30px auto',
                      textAlign: 'center',
                      fontSize: '50px',
                      fontWeight: 'bold',
                      color: '#1890ff'
                    }
                  },
                  {
                    id: 'div3',
                    type: 'div',
                    html: '123'
                  }
                ],
                action: [
                  {
                    id: 'step3-done',
                    type: 'Button',
                    btnType: 'primary',
                    text: '完成',
                    actionType: 'finish',   // 设置action按钮的类型 next、 previous、 finish
                    // 在action动作之前需要进行的操作，比如表单提交
                    beforeAction: `(steps) => {
                console.log(steps)
              // this.steps[this.current]
            }`,
                    inner: `content.set('form1', 'submitTime', content.get('form1', 'submitTime') + 1)`,
                    style: {}
                  },
                  {
                    id: 'step3-pre',
                    type: 'Button',
                    btnType: 'default',
                    text: '上一步',
                    actionType: 'previous',   // 设置action按钮的类型 next、 previous、 finish
                    // 在action动作之前需要进行的操作，比如表单提交
                    beforeAction: `(steps) => {
                console.log(steps)
              // this.steps[this.current]
            }`,
                    inner: `content.set('form1', 'submitTime', content.get('form1', 'submitTime') + 1)`,
                    style: {
                      marginLeft: '5px'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'tab3',
        title: '远程获取数据',
        isRemote: true,  //是否远程获取数据
        data: {
          method: 'GET',
          url: '/gettemplates/4257c289-e7af-4f94-ad71-92c3b5e25ae4',
          params: {},
          isBase64Data: true  //是否需要base64解码
        },
        attribute: {
          forceRender: false,   // 被隐藏时是否渲染 DOM 结构
          icon: 'windows',
          style: {}
        },
        children: []
      },
      {
        id: 'tab4',
        title: '禁用tab',
        isRemote: false,  //是否远程获取数据
        attribute: {
          forceRender: false,   // 被隐藏时是否渲染 DOM 结构
          disabled: true,
          icon: 'google',
          style: {}
        },
        children: []
      }
    ]
  }
]
