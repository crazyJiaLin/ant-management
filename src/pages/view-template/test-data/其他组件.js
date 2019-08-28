// jsonObj.set(id, attr. value)方法 id为要匹配控件的id， attr是属性名称，如果带嵌套的话，请用'.'进行分割（attribute.disabled）, value为要修改的值
//不管有没有组件，最外层请用方括号，让template作为数组的形式传入
/**
 * 目前属性值中碰到函数的，只能吧函数转为字符串，然后存入，关于解析只支持部分，有待完善
 * 所以在需要传函数的时候，一定要传正确可执行的函数，不然有一些必须的值拿不到，组件会报错
 * */
export default [
  {
    id: 'badgeDescription',
    type: 'div',
    html: 'Badge:',
    style: {
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'inline-block',
      marginLeft: '50px'
    }
  },
  {
    id: 'badge1',
    type: 'Badge',
    isRemote: false,  //是否远程，为true时通过dataUrl(get请求)和params获取数据
    dataUrl: '',
    params: {},
    count: 1,
    content: {
      type: 'button',
      text: '点一下试试',
      btnType: 'primary',
      click: `jsonobj.set('badge2','count', jsonobj.get('badge2', 'count') + 1)`
      // click: `console.log(jsonobj.get('badge2', 'count'))`
    },
    attribute: {
      style: {
        marginLeft: '100px',
        display: 'inline-block'
      },        // badge 样式
      numberStyle: {},  // 状态点样式
      dot: false,           // 是否为点模式
      showZero: false,      // 为0是否显示
      // offset: [10,10],      // 设置状态点的位置偏移，格式为 [x, y]
      overflowCount: 9,     // 封顶数值
      // status: 'default',       // 'success', 'processing, 'default', 'error', 'warning'
      // text: 'hello',        // 在设置了 status 的前提下有效，设置状态点的文本
      title: 'title',       // 鼠标放在状态点上的显示内容
    }
  },
  {
    id: 'badge2',
    type: 'Badge',
    isRemote: false,  //是否远程，为true时通过dataUrl(get请求)和params获取数据
    dataUrl: '',
    params: {},
    count: 1,
    content: {
      type: 'a',
      text: 'link',
      href: '#',
      style: {},
    },
    attribute: {
      style: {
        marginLeft: '100px',
        display: 'inline-block'
      },        // badge 样式
      numberStyle: {},  // 状态点样式
      dot: false,           // 是否为点模式
      showZero: false,      // 为0是否显示
      offset: [10, 0],      // 设置状态点的位置偏移，格式为 [x, y]
      overflowCount: 10,     // 封顶数值
      // status: 'default',       // 'success', 'processing, 'default', 'error', 'warning'
      // text: 'hello',        // 在设置了 status 的前提下有效，设置状态点的文本
      title: 'title',       // 鼠标放在状态点上的显示内容
    }
  },
  {
    id: 'badge3',
    type: 'Badge',
    isRemote: false,  //是否远程，为true时通过dataUrl(get请求)和params获取数据
    dataUrl: '',
    params: {},
    count: 1,
    content: {
      type: 'icon',
      icon: 'aliwangwang',
      style: {
        fontSize: '20px'
      },
    },
    attribute: {
      style: {
        marginLeft: '100px',
        display: 'inline-block'
      },        // badge 样式
      numberStyle: {},  // 状态点样式
      dot: false,           // 是否为点模式
      showZero: false,      // 为0是否显示
      // offset: [10,10],      // 设置状态点的位置偏移，格式为 [x, y]
      overflowCount: 9,     // 封顶数值
      // status: 'default',       // 'success', 'processing, 'default', 'error', 'warning'
      // text: 'hello',        // 在设置了 status 的前提下有效，设置状态点的文本
      title: 'title',       // 鼠标放在状态点上的显示内容
    }
  },
  {
    id: 'div1',
    type: 'div',
    text: '这里是div，通过样式控制',
    style: {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      marginTop: '30px',
    }
  },
  {
    id: 'pre1',
    type: 'pre',
    text: `这里是pre
    ，用于展示带分割的
    text`,
    style: {
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      marginTop: '30px',
    }
  },
  {
    id: 'a1',
    type: 'a',
    text: 'a标签',
    icon: 'delete',
    href: 'http://www.baidu.com',
    _blank: true,
    style: {
      fontSize: '20px',
      margin: '20px 0 0 50px',
    }
  },
  {
    id: 'transfer-description',
    type: 'div',
    text: '穿梭层',
    style: {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '30px 0',
    }
  },
  {
    "id": "transfer1",
    text:"穿梭框",
    type:"Transfer",
    dataSource:[
      {
        key: 'a',
        title: 'a',
        disabled : false
      },{
        key: 'b',
        title: 'b',
        disabled : false
      },{
        key: 'c',
        title: 'c',
        disabled : false
      },{
        key: 'd',
        title: 'd',
        disabled : false
      },{
        key: 'e',
        title: 'e',
        disabled : false
      },{
        key: 'f',
        title: 'f',
        disabled : false
      },{
        key: 'x',
        title: 'x',
        disabled : false
      }],
    targetKeys: ['a','b', 'c'],
    selectedKeys: ['a','f'],
    render : `item => item.title`,
    "attribute":{
      "titles":['穿梭框源', '穿梭目标'],//穿梭框标题
      style: {
        // display: 'flex',
        // alignItem: 'center',
        // justifyContent: 'center',
        marginBottom: '100px'
      },
      disabled: false,
      operations: ['to right', 'to left'],
      showSearch: true,
      locale: {
        itemUnit: '项',
        itemsUnit: '项',
        notFoundContent: '列表为空',
        searchPlaceholder: '请输入搜索内容'
      },
      listStyle: {
        width: '250px',
        height: '300px',
      }
    },
    methods: {
      onChange : `(nextTargetKeys, direction, moveKeys) => {
        console.log('onChange', nextTargetKeys, direction, moveKeys)
      }`,
      onSelectChange:  `(sourceSelectedKeys, targetSelectedKeys) => {
        console.log('onSelectChange', sourceSelectedKeys, targetSelectedKeys)
      }`,
      onScroll: `(direction, e) => {
        console.log('onScroll', direction, e)
      }`,
      onSearch: `(direction, value) => {
        console.log('onSearch', direction, value)
      }`
    }
  },
]
