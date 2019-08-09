// let conf = {
// 	"list": [{
// 		"record_id": "6fb7d088-7528-40b1-929d-36f590c1ddf5",
// 		"name": "首页",
// 		"sequence": 1900000,
// 		"icon": "dashboard",
// 		"router": "/dashboard",
// 		"hidden": 0,
// 		"parent_id": "",
// 		"parent_path": "",
// 		"resources": null,
// 		"actions": null
// 	    }, {
// 		"record_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
// 		"name": "系统管理",
// 		"sequence": 1100000,
// 		"icon": "setting",
// 		"router": "",
// 		"hidden": 0,
// 		"parent_id": "",
// 		"parent_path": "",
// 		"resources": null,
// 		"actions": null,
// 		"children": [
//             {"template":[
// 				//搜索栏
// 				{
//                     "type":"Row",
//                     "attribute":{
//                         "align":"middle",
//                         "gutter":"24",
//                         "justify":"center",
//                         "ColArr":[{
//                             "type":"Col",
//                             "attribute" : {
//                                 "span":24,
//                                 "scrollX":false,//显示滚动条
//                                 "scrollY":false,
//                                 "body":[
//                                     {
//                                         "type":"query",
//                                         "attribute": {
//                                             "an":true,  //是否展开
//                                             "showTable": 'table1',//搜索数据显示表格
//                                             "body":{
//                                                 "name1": {
//                                                     text:"文本输入框",
//                                                     "placeholder":"提示信息",
//                                                     default:"默认值",
//                                                     data:"",
//                                                     type:"text",
//                                                     "attribute":{   
//                                                         "icon":"user",
//                                                         "size":"small",
//                                                         "allowClear":true,//是否支持清除
//                                                         "required":true,//验证必填
//                                                         "decorator":{
//                                                             "rules":{
//                                                                 "pattern":"/^1[34578]\d{9}$/",
//                                                                 "message":"请输入正确的手机号"
//                                                             },
//                                                             validate:"blur"
//                                                         }
//                                                     }
//                                                 },
//                                                 "region1": {
//                                                     text:"级联选择",
//                                                     "placeholder":"",
//                                                     default:["aaaa","bbb","ccc"],
//                                                     data:"data",
//                                                     type:"Cascader",
//                                                     "attribute":{
//                                                     "allowClear":true,//是否支持清除
//                                                     "size":"small",
//                                                     "required":true,//验证必填
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         }
// 					]
// 				}},
// 				//工具栏
//                 {"type":"Row",
//                 "attribute":{
// 					"align":"middle",
// 					"gutter":"24",
// 					"justify":"center",
// 					"ColArr":[
//                         {"type":"Col",
//                         attribute: {
// 							"span":12,
// 							"scrollX":false,//显示滚动条
// 							"scrollY":false,
// 							"align":"left",
// 							"body":[
//                                 {"buttonWin":"按钮窗口",
//                                 data:"form提交地址",
//                                 type:"ButtonWin",
//                                 "attribute":{
//                                     "size":"small",shape:"circle",type:"primary","icon":"图标","width":500,"heght":600,
//                                     "formtemplate":"default",//默认 表单
//                                     "button":{"add":"新增","close":"关闭"},
//                                     "form":[
//                                         //......//同上json插件
//                                     ]
//                                 }},
//                                 {"buttonajax":"按钮Ajax",
//                                 data:"",
//                                 type:"ButtonAjax",
//                                 "attribute":{
//                                     "loading":true,//是否显示进度 状态
//                                     "size":"small",shape:"circle",type:"primary","icon":"图标"
//                                 }}
//                             ]
// 						}},
//                         {"type":"Col",
//                         attribute:{
// 							"span":12,
// 							"scroolX":false,//显示滚动条
// 							"scroolY":false,
// 							"align":"right",
// 							"body":[
//                                 {
//                                     "buttonajax":"按钮Ajax",
//                                     data:"",
//                                     type:"ButtonAjax",
//                                     "attribute":{
//                                         "loading":true,//是否显示进度 状态
//                                         "size":"small",shape:"circle",type:"primary","icon":"图标"
//                                     }
//                                 }
// 							]
// 						}}
// 					]
// 				}},
// 				//表格区域
// 				{"type":"Row","attribute":{
// 					"align":"middle",
// 					"gutter":"24",
// 					"justify":"center",
// 					"ColArr":[
// 						{"type":"Col",attribute{
// 							"span":24
// 							"scroolX":false,//显示滚动条
// 							"scroolY":false,
// 							"height":"auto"//auto 撑满屏幕 
// 							"body":[
// 								{text:"记录表格",data:"数据源",type:"table","attribute":{
// 									"width":500,"heght":600,//默认宽高 百分比
// 									"isCheckbox":true,//是否显示多选
// 									"inner":{"buttonajax":"display"},
// 									"list":{//列表字段
// 										"id":{"index":0,"title":"id",width:100,fixed:"left"},
// 										"name":{"index":1,"title":"用户名",width:100,"render":[
// 												{"s":{text:"{name}({id})",default:"",data:"",type:"Badge","attribute":{"status":"processing"}}
// 										]},
// 										"key":{"index":2,"title":"TOKEN",width:100,"render":"<div>{key}</div>"},//render中如何使用上边定义好的格式
// 										"toole":{
// 											"index":3,
// 											"fixed":"right",
// 											"render":[{"edit":同上},"del":同上],
// 										}
// 									},
// 									"pageSize":10,//页面数据条数  为空则不分页显示
// 								}}
// 							]
// 						}}
// 					]
// 				}},
//             ],
// 			"record_id": "08ddef6d-6055-455b-bba5-a704db813a82",//菜单ID
// 			"name": "菜单管理",                                 //菜单名称
// 			//菜单右边 突出显示的提示
// 			"sequence": 1190000,                                //权重
// 			"icon": "solution",
// 			"router": "/system/menu",                           //路由，如果使用模板这里为空
// 			"hidden": 0,                                        //是否隐藏
// 			"parent_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
// 			"parent_path": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
// 			"resources": null,
// 			"actions": [{
// 				"code": "add",
// 				"name": "新增"
// 			}, {
// 				"code": "edit",
// 				"name": "编辑"
// 			}, {
// 				"code": "del",
// 				"name": "删除"
// 			}, {
// 				"code": "query",//对应上边请求地址
// 				"name": "查询"
// 			}]
// 		}, {
// 			"record_id": "65d6de24-6727-45db-b939-90145851f8e4",
// 			"name": "角色管理",
// 			"sequence": 1180000,
// 			"icon": "audit",
// 			"router": "/system/role",
// 			"hidden": 0,
// 			"parent_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
// 			"parent_path": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
// 			"resources": null,
// 			"actions": [{
// 				"code": "add",
// 				"name": "新增"
// 			}, {
// 				"code": "edit",
// 				"name": "编辑"
// 			}, {
// 				"code": "del",
// 				"name": "删除"
// 			}, {
// 				"code": "query",
// 				"name": "查询"
// 			}]
// 		}, {
// 			"record_id": "977db01a-3086-4d3d-8da5-c0243c3cbeb1",
// 			"name": "用户管理",
// 			"sequence": 1170000,
// 			"icon": "user",
// 			"router": "/system/user",
// 			"hidden": 0,
// 			"parent_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
// 			"parent_path": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
// 			"resources": null,
// 			"actions": [{
// 				"code": "add",
// 				"name": "新增"
// 			}, {
// 				"code": "edit",
// 				"name": "编辑"
// 			}, {
// 				"code": "del",
// 				"name": "删除"
// 			}, {
// 				"code": "query",
// 				"name": "查询"
// 			}]
// 		}]
// 	}]
// }



// ////基础json插件样例
// /*

// 					"name1":{text:"文本输入框","placeholder":"提示信息",default:"默认值",data:"",type:"text""attribute":{
// 							"icon":"user","size":"small","allowClear":true,//是否支持清除
// 							"required":true,//验证必填
// 							"decorator":{"rules":{"pattern":"/^1[34578]\d{9}$/","message":"请输入正确的手机号"},validate:"blur"}
// 					}},
					
// 					"region1":{text:"级联选择","placeholder":"",default:["aaaa","bbb","ccc"],data:"data",type:"Cascader","attribute":{
// 						"allowClear":true,//是否支持清除
// 						"size":"small",
// 						"required":true,//验证必填
// 					}},


// 					"time1":{text:"时间输入","placeholder":"",default:"0123",data:"",type:"TimePicker","attribute":{
// 						"format":"HH:mm","size":"small",
// 						"required":true,//验证必填
// 					}},


// 					"data1":{text:"日期","placeholder":"",default:"0123",data:"",type:"DatePicker","attribute":{
// 						"format":"YYYY-MM-DD HH","size":"small",
// 						"required":true,//验证必填
// 					}},
// 					"data2":{text:"日期区间","placeholder":"",default:"0123",data:"",type:"RangePicker","attribute":{
// 						"format":"YYYY-MM-DD HH",
// 						"required":true,//验证必填
// 					}},
// 					"data3":{text:"月选择","placeholder":"",default:"0123",data:"",type:"MonthPicker","attribute":{
// 						"size":"small",
// 						"required":true,//验证必填
// 					}},

// 					"number1":{text:"数字输入框","placeholder":"",default:"0123",data:"",type:"InputNumber","attribute":{
// 						"formatter":"￥{value}%",
// 						"max":10,"min":0,"size":"small",
// 						"required":true,//验证必填
// 					}},

// 					"tree1":{text:"单选|多选树","placeholder":"",default:"0",data:"tree",type:"TreeSelect","attribute":{
// 						"size":"small","mode":"multiple",
// 						"required":true,//验证必填
// 					}},

// 					"state1":{text:"单选|多选框","placeholder":"",default:"-1",data:[
// 							{"全部状态":"","inner":["tree1"],"state":"display:hidden"}, //关联 tree 单选树 状态为隐藏
// 							{"禁用":-1,"inner":["tree1"],"state":"display:hidden"},
// 							{"启用":0,"inner":["tree1"],"state":"display:none"}//关联 tree 单选树 状态为显示
// 						],type:"Select","attribute":{
// 						"size":"small","mode":"multiple",
// 						"required":true,//验证必填
// 					}},


// 					"textarea":{text:"多行文本输入框","placeholder":"",default:"默认值",data:"",type:"Textarea"
// 						"attribute":{
// 							"minRows":3,"maxRows":10,
// 							"required":true,//验证必填
// 							"decorator":{}//验证输入内容
// 						}
// 					},

// 					"radio":{text:"单选",default:"value1",data:[
// 							{"选项1":"value1","inner":["state1"],"state":"display:hidden"},//控制 state1 显示/隐藏
// 							{"选项2":"value2","inner":["state1"],"state":"display:none"}
// 						],type:"Radio","attribute":{
// 						isButton:true,//是否使用Button模式
// 						"buttonStyle":"solid",//solid,outline
// 						"size":"small",
// 						"required":true,//验证必填
// 					}},


// 					"transfer":{text:"穿梭框",default:["aaaa","bbb","ccc"],data:["Source","Target"],type:"Transfer","attribute":{
// 						"titles":['Source', 'Target'],
// 						"pageSize":10,//分页条数
// 					}},



// 					"switch":{text:"开关",default:true,data:"可远程获取数据",type:"Switch","attribute":{
// 						"checkText":["开","关"],
// 						"size":"small"
// 					}},


// 					"badge1":{text:"状态",default:"",data:"可远程获取数据",type:"Badge","attribute":{
// 						"status":"processing",
// 						"count":""
// 					}},



// 					//提交地址?steps=1 or 2 每步骤提交一次
// 					"buttonWin":{"按钮窗口",data:"form提交地址",type:"ButtonWin","attribute":{
// 						"size":"small",shape:"circle",type:"primary","icon":"图标","width":500,"heght":600,
// 						"formtemplate":"default",//默认 default=默认表单  next=分步窗口表单
// 						"button":{"add":"新增","close":"关闭"},//"button":{"add":"保存","prev":"上一步","next":"下一步","close":"取消"},
// 						"form":[
// 							......//同上json插件
// 						]
// 					},

// 					"buttonajax":"按钮Ajax",data:"",type:"ButtonAjax","attribute":{
// 						"loading":true,//是否显示进度 状态
// 						"size":"small",shape:"circle",type:"primary","icon":"图标"
// 					},


// 					"a1":{text:"链接窗口",href:"",type:"AWin","attribute":{
// 						"width":500,"heght":600
// 						......//同上按钮窗口属性
// 					}},
// 					"a2":{text:"链接Ajax",href:"",type:"AAjax","attribute":{}},
// 					"a3":{text:"链接Url",href:"",type:"AUrl","attribute":{}},

// 					"upload":{text:"上传",default:"",data:"sssss",type:"Upload","attribute":{
// 						"mode":"multiple",//是否允许上传多个
// 						"size":"small"
// 					}},



// 					"table1":{text:"记录表格",data:"数据源",type:"table","attribute":{
// 						"width":500,"heght":600,//默认宽高 百分比
// 						"isCheckbox":true,//是否显示多选
// 						"inner":{"buttonajax":"display"},
// 						"list":{//列表字段
// 							"id":{"index":0,"title":"id",width:100,fixed:"left"},
// 							"name":{"index":1,"title":"用户名",width:100,"render":[
// 									{"s":{text:"{name}({id})",default:"",data:"",type:"Badge","attribute":{"status":"processing"}}
// 							]},
// 							"key":{"index":2,"title":"TOKEN",width:100,"render":"<div>{key}</div>"},//render中如何使用上边定义好的格式
// 							"toole":{
// 								"index":3,
// 								"fixed":"right",
// 								"render":[{"edit":同上},"del":同上],
// 							}
// 						},
// 						"pageSize":10,//页面数据条数  为空则不分页显示
// 					}},



// 					//布局类
// 					//搜索区域
// 					{"type":"query","attribute"{
// 						"an":true,//是否展开
// 						"showTable":table1,//搜索数据显示表格
// 						"body":[
// 							......//同上json插件
// 						]
// 					}},
// 					//行列布局
// 					{"type":"Row","attribute":{
// 						"align":"middle",
// 						"gutter":"24",
// 						"justify":"center",
// 						"ColArr":[
// 							{"type":"Col",attribute{
// 								"span":8
// 								"scroolX":true,//显示滚动条
// 								"scroolY":false,
// 								"height":"auto"//auto 撑满屏幕 
// 								"body":[
// 									......//同上json插件
// 								]
// 							}}
// 						]
// 					}}
// */