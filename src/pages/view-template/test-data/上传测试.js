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
    text: '上传测试',
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
    },
    "children": [
      {
        id: 'upload1',
        type: 'Upload',
        text: '点击上传',
        // test url :
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',  // 上传地址
        name: 'file',           // 发到后台的文件参数名
        headers: {
          "Authorization":"Rds eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjY0NDA5MjksImp0aSI6InJvb3QiLCJpYXQiOjE1NjY0MzM3MjksIm5iZiI6MTU2NjQzMzcyOSwic3ViIjoid2VifDIyMy43MS45Ni4xMzcifQ.UG4UJpm2KlhAcqBjrqF6LIYX_WGWbVmUG2EaRaYFYQaCwWNyLu0uy6YWsWRtzAA3foGVJ1PA2HsAsXR3AFx8mg"
        },
        withCredentials: false, // 上传请求时是否携带 cookie
        label: '官方接口',
        width: 24,    // 4-24
        labelCol: {span: 5},   // 文案长度
        wrapperCol: {span: 17, offset: 2},// 输入框长度
        attribute: {
          directory: false, // 支持上传文件夹
          accept: '',       // 接受上传的文件类型
          multiple: true,  // 是否支持多选文件
          icon: 'upload',
        }
      },
      {
        id: 'uploadImg1',
        type: 'UploadImg',
        text: '点击上传',
        // test url : https://www.mocky.io/v2/5cc8019d300000980a055e76
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',  // 上传地址
        name: 'file',           // 发到后台的文件参数名
        headers: {
          // authorization: 'authorization-text',
          // "Authorization":"Rds eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjY0NDA5MjksImp0aSI6InJvb3QiLCJpYXQiOjE1NjY0MzM3MjksIm5iZiI6MTU2NjQzMzcyOSwic3ViIjoid2VifDIyMy43MS45Ni4xMzcifQ.UG4UJpm2KlhAcqBjrqF6LIYX_WGWbVmUG2EaRaYFYQaCwWNyLu0uy6YWsWRtzAA3foGVJ1PA2HsAsXR3AFx8mg"
        },
        withCredentials: false, // 上传请求时是否携带 cookie
        label: '官方接口',
        width: 24,    // 4-24
        labelCol: {span: 5},   // 文案长度
        wrapperCol: {span: 17, offset: 2},// 输入框长度
        attribute: {
          directory: false, // 支持上传文件夹
          accept: '',       // 接受上传的文件类型
          multiple: false,  // 是否支持多选文件
          icon: 'upload',
          max: 3  //最多上传图片个数---默认1个
        }
      },
      {
        id: 'upload-file2',
        type: 'Upload',
        text: '点击上传',
        // test url : https://www.mocky.io/v2/5cc8019d300000980a055e76
        action: 'http://47.244.197.84:10088/api/v1/upload/file',  // 上传地址
        name: 'field',           // 发到后台的文件参数名
        headers: {
          hhh: 1
        },
        withCredentials: false, // 上传请求时是否携带 cookie
        label: '47.244.197.84',
        beforeUpload: `(file, fileList) => {
          console.log('配置文件中执行beforeUpload', file, fileList)
          // 如果return false 则表示不通过组件内部上传
          return true;
        }`,
        width: 24,    // 4-24
        labelCol: {span: 5},   // 文案长度
        wrapperCol: {span: 17, offset: 2},// 输入框长度
        attribute: {
          directory: false, // 支持上传文件夹
          accept: '',       // 接受上传的文件类型
          multiple: true,  // 是否支持多选文件
          icon: 'upload',
          showUploadList: {
            showPreviewIcon: true,
            showRemoveIcon: false
          }
        }
      },
      {
        id: 'upload-img2',
        type: 'UploadImg',
        text: '点击上传图片',
        // test url : https://www.mocky.io/v2/5cc8019d300000980a055e76
        action: 'http://47.244.197.84:10088/api/v1/upload/image',  // 上传地址
        name: 'field',           // 发到后台的文件参数名
        headers: {
          // authorization: 'authorization-text',
          // "Authorization":"Rds eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjY0NDA5MjksImp0aSI6InJvb3QiLCJpYXQiOjE1NjY0MzM3MjksIm5iZiI6MTU2NjQzMzcyOSwic3ViIjoid2VifDIyMy43MS45Ni4xMzcifQ.UG4UJpm2KlhAcqBjrqF6LIYX_WGWbVmUG2EaRaYFYQaCwWNyLu0uy6YWsWRtzAA3foGVJ1PA2HsAsXR3AFx8mg"
        },
        withCredentials: false, // 上传请求时是否携带 cookie
        label: '47.244.197.84',
        width: 24,    // 4-24
        labelCol: {span: 5},   // 文案长度
        wrapperCol: {span: 17, offset: 2},// 输入框长度
        attribute: {
          directory: false, // 支持上传文件夹
          accept: 'image/*',       // 接受上传的文件类型--设置仅能选择图片
          multiple: false,  // 是否支持多选文件
          icon: 'upload',
          max: 3  //最多上传图片个数---默认1个
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
