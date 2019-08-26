import {Message, Modal, Notification} from "ant-design-vue";
window.message = Message;
window.confirm = Modal.confirm;
window.notification = Notification;
window.$eval = function(code, fnName) {
  // eval错误处理
  if(!code || code == '') return () => {};
  let res = () => {};
  try{
    // console.log('开始执行', code)
    res = eval(code);
  }catch (e) {
    console.error('eval执行错误',e)
    Notification.error({
      message: (fnName ? fnName : '') + '函数执行错误',
      description: code
    })
  }
  return res;
}

window.$debounce = function (func, wait) {
  if (typeof func !== 'function') {
    throw new TypeError('need a function');
  }
  wait = +wait || 0;

  let timeId = null;

  return function () {
    // console.log('滚动了滚动了');  // 测试时可放开
    const self = this;
    const args = arguments;

    if (timeId) {
      clearTimeout(timeId);   // 清除定时器，重新设定一个新的定时器
    }
    timeId = setTimeout(() => {
      func.apply(self, args); // arguments 是传给函数的参数，这里是 event  对象
    }, wait);
  }
}
