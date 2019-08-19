let conf = {
	"list": [{
		"record_id": "6fb7d088-7528-40b1-929d-36f590c1ddf5",
		"name": "首页",
		"sequence": 1900000,
		"icon": "dashboard",
		"router": "/dashboard",
		"hidden": 0,
		"parent_id": "",
		"parent_path": "",
		"resources": null,
		"actions": null
	}, {
		"record_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
		"name": "系统管理",
		"sequence": 1100000,
		"icon": "setting",
		"router": "",
		"hidden": 0,
		"parent_id": "",
		"parent_path": "",
		"resources": null,
		"actions": null,
		"children": [{
			"template":"模板id 请求当前页面检查是否有此key,有则请求模板json数据",//返回格式{"code":1,message:"","data":{}}  错误格式框架统一
			"record_id": "08ddef6d-6055-455b-bba5-a704db813a82",//菜单ID
			"name": "菜单管理",                                 //菜单名称
			//菜单右边 突出显示的提示
			"sequence": 1190000,                                //权重
			"icon": "solution",
			"router": "/system/menu",                           //路由，如果使用模板这里为空
			"hidden": 0,                                        //是否隐藏
			"parent_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
			"parent_path": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
			"resources": null,
			"actions": [{
				"code": "add",
				"name": "新增"
			}, {
				"code": "edit",
				"name": "编辑"
			}, {
				"code": "del",
				"name": "删除"
			}, {
				"code": "query",//对应上边请求地址
				"name": "查询"
			}]
		}, {
			"record_id": "65d6de24-6727-45db-b939-90145851f8e4",
			"name": "角色管理",
			"sequence": 1180000,
			"icon": "audit",
			"router": "/system/role",
			"hidden": 0,
			"parent_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
			"parent_path": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
			"resources": null,
			"actions": [{
				"code": "add",
				"name": "新增"
			}, {
				"code": "edit",
				"name": "编辑"
			}, {
				"code": "del",
				"name": "删除"
			}, {
				"code": "query",
				"name": "查询"
			}]
		}, {
			"record_id": "977db01a-3086-4d3d-8da5-c0243c3cbeb1",
			"name": "用户管理",
			"sequence": 1170000,
			"icon": "user",
			"router": "/system/user",
			"hidden": 0,
			"parent_id": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
			"parent_path": "dfbb4bd9-de6d-4e02-ba0f-5a147bed3670",
			"resources": null,
			"actions": [{
				"code": "add",
				"name": "新增"
			}, {
				"code": "edit",
				"name": "编辑"
			}, {
				"code": "del",
				"name": "删除"
			}, {
				"code": "query",
				"name": "查询"
			}]
		}]
	}]
}



// template=模板ID  增删改查方法周一上服务器
// 存在问题：
// 1,执行事件方法不够灵活,如何实现方法的嵌套,比如   window.confirm()和message.success() , jsonobj.disable("id",true)
// 2,key关键字，过于长是否可以使用数值转换为关键字来处理
// 如：["id","data","text"]
// 则 {"0":"name1","1":"文本输入框","2":url} 压缩后上传服务器

////基础json插件样例
/*
					//post or get 数据
					返回正确数据{"code":1,message:"","data":[]}
					错误返回{error:{"code":401,"message":""}} 系统统一错误提示  看接口数据Models中的HTTPError结构


					基础属性
					id="xxx"  			唯一标识，前端调式不显示这个id属性，使用refs处理
					data="/user/list"   远程获取默认数据或直接数据{}，为空则使用default未默认数据
					text="xxxx"  		如果是表单，则显示 表单项名称: 其它情况不显示
					default=""			默认值
					attribute={
						"disabled":true,//只有按钮和输入框有此属性
						"visible":"visible",//visible|hidden 显示隐藏
						"width":"宽度,默认外层col控制宽度",
						"Tooltip":{
							"title":"提示文本",
							"placement":"提示显示方向" //top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
						},
						"decorator":{
							"required":true,//验证是否必填 默认false
						}
					}//json模块属性

					//公共方法
					message.success()
					message.error()
					message.warning()
					message.loading()
					window.confirm()//是否窗口

					jsonobj.call("自定义方法名称",...参数);//自定义方法一次性加载
					//基础属性，输入框和按钮专属
					jsonobj.set("id","属性","值");
					jsonobj.get("id","属性");
					jsonobj.visible("id",true);
					jsonobj.disable("id",true);


					//专属方法
					jsonobj.submit("id");//表单提交
					jsonobj.refresh("id");//刷新数据表格
					jsonobj.Steps("id","步骤");//步骤布局中设置执行步骤   由 jsonobj.set 设置步骤status状态


					//ajax提交数据 错误信息统一拦截提示  看接口数据Models中的HTTPError结构
					jsonobj.ajax("GET",url);|jsonobj.ajax("POST",url,data);


					{"id":"name1",text:"文本输入框","placeholder":"提示信息",default:"默认值",type:"text""attribute":{
							"icon":"user","size":"small","allowClear":true,//是否支持清除
							"width":"宽度",
							"Tooltip":{"title":"提示文本","placement":"top"},//提示信息  默认无
							"addonBefore":"input,设置前置标签",
							"addonAfter":"input,设置后置标签",
							"decorator":{"required":true,"rules":{"pattern":"/^1[34578]\d{9}$/","message":"请输入正确的手机号"},validate:"blur"}//校验
					}},

					{"id":"textarea",text:"多行文本输入框","placeholder":"",default:"默认值",type:"Textarea"
						"attribute":{
							"minRows":3,"maxRows":10,
							"width":"宽度",
							"Tooltip":{},
							"decorator":{}//验证输入内容
						}
					},

					{"id":"time1",text:"时间输入","placeholder":"",default:"0123",type:"TimePicker","attribute":{
						"format":"HH:mm","size":"small",
					}},


					{"id":"data1",text:"日期","placeholder":"",default:"0123",type:"DatePicker","attribute":{
						"format":"YYYY-MM-DD HH","size":"small",
					}},
					{"id":"data2",text:"日期区间","placeholder":"",default:"0123",type:"RangePicker","attribute":{
						"format":"YYYY-MM-DD HH",
					}},
					{"id":"data3",text:"月选择","placeholder":"",default:"0123",type:"MonthPicker","attribute":{
						"size":"small",
					}},

					{"id":"number1",text:"数字输入框","placeholder":"",default:"0123",type:"InputNumber","attribute":{
						"formatter":"￥{value}%",
						"max":10,"min":0,"size":"small",
					}},













					//之后json模块 都需要 isRemote:"true 是否远程获取数据" 来判定data是否是url
					//需要 关联post数据 返回显示区域

					{"id":"inputSearch1","text":"搜索输入框","placeholder":"提示信息","default":"默认值","isRemote":"true 是否远程获取数据",
					"data":"远程获取内容","type":"inputSearch",
					"attribute":{
							"icon":"user",
							"size":"small",
							"width":"宽度",
							"enterButton":"看 ant 中属性",
							"Tooltip":{"title":"提示文本","placement":"top"},//提示信息  默认无
							"decorator":{"required":true},//校验
							"inner":"jsonobj.submit('form1')" //change关联
					}},

					{"id":"region1",text:"级联选择","placeholder":"",default:["aaaa","bbb","ccc"],data:"data",type:"Cascader",
					"attribute":{
						"icon":"选择框后缀图标 同ant级联中的suffixIcon属性","allowClear":true,//是否支持清除
						"size":"small",
					}},

					{"id":"radio1",text:"单选",default:"value1",isRemote:"true 是否远程获取数据",data:[
							{"选项1":"value1","inner":"jsonobj.set('tree1','disable',true)"},//控制 state1 显示/隐藏
							{"选项2":"value2","inner":"jsonobj.set('tree1','display',false)"}//选中关联
						],type:"Radio","attribute":{
						"size":"small",
					}},

					{"id":"checkbox1",text:"多选",default:["value1","value2"],data:[
							{"选项1":"value1","inner":"jsonobj.set('tree1','disable',true)"},//控制 state1 显示/隐藏
							{"选项2":"value2","inner":"jsonobj.set('tree1','display',false)"}//选中关联
						],type:"Checkbox","attribute":{
						"buttonStyle":"solid",//solid,outline
						"size":"small",
					}},

          {"id":"button1",text:"按钮",data:"",type:"Button",
          "attribute":{
						"loading":true,//是否显示进度 状态
						"size":"small",shape:"circle",type:"primary","icon":"图标",
						"inner":"jsonobj.visible('modal1',true);"
					},


					{"id":"a1",text:"链接",href:"#",type:"A","attribute":{
						"inner":"jsonobj.visible('modal1',true);"
					}},


					//这里是否考虑选中后直接上传？在表单如何提交
					{"id":"upload1",text:"上传",default:"",type:"Upload","attribute":{
						"mode":"multiple",//是否允许上传多个
						"size":"small"
					}},
					{"id":"transfer1",text:"穿梭框", type:"Transfer",
					default:["aaaa","bbb","ccc"],data:["穿梭框源 数据","穿梭目标 数据"],
					"attribute":{
						"titles":['穿梭框源', '穿梭目标'],//穿梭框标题
						"pageSize":10,//分页条数  不设置则不分页显示
					}},



					{"id":"switch1",text:"开关",default:true,data:"可远程获取数据",type:"Switch","attribute":{
						"checkText":["开","关"],
						"size":"small",
						"inner":"jsonobj.set('badge1','status','Success');jsonobj.set('badge1','count','10');"
						//远程获取 或操作时 设置 loading 状态
					}},


					{"id":"badge1",text:"状态",default:"",data:"可远程获取数据",type:"Badge","attribute":{
						"status":"processing",//Success Error Default processing warning
						"count":""
					}},

						{"id":"tree1",text:"单选|多选树","placeholder":"",default:"0",data:"tree",type:"TreeSelect","attribute":{
						"icon":"单选|多选树后缀图标 同ant中TreeSelect的suffixIcon属性",
						"size":"small","mode":"multiple",
					}},

					{"id":"state1",text:"单选|多选框","placeholder":"",isRemote:"true 是否远程获取数据",default:"-1",data:[
							{"全部状态":"","inner":"jsonobj.visible('tree1',true)"}, //关联 tree 单选树 状态为隐藏
							{"禁用":-1,"inner":"jsonobj.visible('tree1',true)"},
							{"启用":0,"inner":"jsonobj.visible('tree1',false)"}//关联 tree 单选树 状态为显示  选中关联
						],type:"Select","attribute":{
						"size":"small","mode":"multiple",
					}},




					//只支持水平垂直居中显示
				{
					"id":"modal1",text:"窗口",
					data:"可以获取json数据地址 W",
					type:"Modal",
					"attribute":{
						"zIndex":10000,
						"closable":true,//是否显示右上角的关闭按钮
						"keyboard":true,//是否支持键盘esc关闭
						"mask":true,//是否展示遮罩
						"maskClosable":true,//点击蒙层是否允许关闭
						"visible":"hidden",title:"空则隐藏标题栏","width":500,"heght":600,
						"footerButton":[
							....可以使用json模块布局  左边和右边设置 按钮
						],
						"children":[
							......//同上json插件
						]
					},







					{"id":"table1",text:"记录表格",data:"数据源",type:"table",
					"attribute":{
						"width":500,"heght":600,//默认宽高 百分比
						"isCheckbox":true,//是否显示多选
						"inner":{"buttonajax":"display"},//关联对象 的样式
						"list":{//列表字段
							"id":{"index":0,"title":"id",width:100,fixed:"left"},
							"name":{"index":1,"title":"用户名",width:100,"render":[
									{"id":"aaa_{id}",text:"{name}({id})",default:"",data:"",type:"Badge","attribute":{
										"status":"processing"
									}}
							]},
							"key":{"index":2,"title":"TOKEN",width:100,"render":"<div>{key}</div>"},//render中如何使用上边定义好的格式
							"toole":{
								"index":3,
								"fixed":"right",
								"renderfun":"jsonobj.set('badge1','count',这里如何处理列表传来的值);",//每一条数据都执行
								"render":[
									{"id":"a_{id}",text:"删除{id}",href:"#",type:"A","attribute":{
										"inner":"jsonobj.ajax("GET","/del?id={id}");"
									}},
								],
							}
						},
						"pageSize":10,//页面数据条数  为空则不分页显示
					}},



					//布局类
					//搜索区域  展开收起
					{"id":"query1","type":"query","method":"POST or GET",data:"post or get 数据地址","attribute"{
						"an":true,//是否展开
						"showTable":table1,//搜索数据显示表格
						"children":[
							......//同上json插件  按数组顺序
						]
					}},

					//步骤布局 只有横向  需要json交互数据   如何处理？
					{"id":"Steps1","type":"Steps",data:"","attribute"{
						"size":"small",
						"status":"error",//当前步骤状态 wait process finish error
						"initial":0,//起始序号，从 0 开始记数
						"steps":[
							{
								"title":'步骤1',
								"icon":"图标",//为空有默认图标
								"content":[
									......//同上json插件  按数组顺序
								]
							}
						]
					}},

					{"id":"form1","type":"Form","method":"POST or GET",data:"post or get 数据地址","attribute"{
						"an":true,//是否展开
						"showTable":table1,//搜索数据显示表格
						"children":[
							......//同上json插件  按数组顺序
						]
					}},

					//input 布局
					{"id":"inputGroup1","type":"inputGroup","attribute"{
						"compact":true,//默认不使用col控制宽度, 不支持使用col控制宽度
						"children":[
							......//同上json插件  按数组顺序
						]
					}},

					//行列布局
					{"id":"Row1","type":"Row","attribute":{
						"align":"middle",
						"gutter":"24",
						"justify":"center",
						"children":[
							{"id":"Col1","type":"Col",attribute{
								"span":8,
								"push":1,"pull":1,
								"xs":6,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6,
								"scroolX":true,//显示滚动条
								"scroolY":false,
								"height":"auto"//auto 撑满屏幕
								"children":[
									......//同上json插件  按数组顺序
								]
							}}
						]
					}}
*/
