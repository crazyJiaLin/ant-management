import {Message, Modal, Notification} from "ant-design-vue";
window.message = Message;
window.confirm = Modal.confirm;
window.notification = Notification;
window.$eval = function(code, fnName) {
  // eval错误处理
  if(!code) return () => {};
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

