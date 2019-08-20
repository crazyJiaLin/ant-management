// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
/**
 * 目前属性值中碰到函数的，只能吧函数转为字符串，然后存入，关于解析只支持部分，有待完善
 * 所以在需要传函数的时候，一定要传正确可执行的函数，不然有一些必须的值拿不到，组件会报错
 * */
export default [
  {
    id: 'steps1',
    type: 'Steps',
    attribute: {
      size: 'small',
      status: 'error',
      initial: 0,
    },
    steps: [
      {
        title: '步骤1',
        icon: 'aliwangwang',
        content: [
          {
            id: 'form1',

          }
        ]
      }
    ]
  }
]
