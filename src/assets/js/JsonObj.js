import axios from 'axios'
// Object.prototype.setObj1 = function (id, attr, value) {
//   this[attr] = value;
// }
// let obj = {};
// obj.setObj1('id', 'test', true)
//因为在vue项目中无法对Object原型添加方法，所以使用全局方法定义，直接挂在到window对象上，在使用的时候记得传参
// 如果不使用call方法来改变this指向的话，我们就直接定义一个构造函数来创建对象吧，这样吧所有原型方法全部挂在在使用本构造函数生成出来的对象原型上
window.JsonObj = (function(options){

  function Obj (options) {
    // 使用训话将options数组中内容设置到组件this中
    this.length = options.length;
    for(let i=0; i<options.length; i++){
      this[i] = options[i];
    }
  }
  /**
   * 使用本原型下的方法需要保证你的对象是由window.JsonObj new出来的，而不是原Object new出来的
   * 因为不确定disabled和visible所在的结构，所以不写这两种方法了，有需要直接通过set来实现
   * */
  Obj.prototype = {
    // 通过id和attr设置对应属性值
    set (id, attr, value) {
      let msg = `没有找到 id=${id} 匹配项`;
      attr = attr.split('.');

      // 递归查找到id对应的值
      (function find(list) {
        for(let i=0; i<list.length; i++) {
          // console.log(list[i].id)
          if(list[i].id == id) {
            let evalStr = 'list[i]';
            for(let i=0; i<attr.length; i++){
              evalStr += `['${attr[i]}']`
            }
            evalStr += ' = value';
            // list[i][attr] = value;
            // console.log('要执行的代码', evalStr)
            $eval(evalStr, 'jsonObj.set')
            msg = `找到匹配项, id=${id}, 匹配属性为 ${attr}`;
            return;
          }
          if(list[i].children && list[i].children.length > 0) {
            //递归查找
            find(list[i].children);
          }
        }
      })(this)
      console.log(msg)
    },
    // 通过控件id和属性名获取到属性值
    get (id, attr) {
      let msg = `未找到 id=${id} 匹配项`;
      attr = attr.split('.')
      // 递归查找到id对应的值
      (function find(list) {
        for(let i=0; i<list.length; i++) {
          // console.log(list[i].id)
          if(list[i].id == id) {
            let evalStr = 'return list[i]';
            for(let i=0; i<attr.length; i++){
              evalStr += `['${attr[i]}']`;
            }
            // list[i][attr] = value;
            // console.log('要执行的代码', evalStr)
            msg = `找到匹配项, id=${id}`;
            $eval(evalStr, 'jsonObj.get')
          }
          if(list[i].children && list[i].children.length > 0) {
            find(list[i].children)
          }
        }
      })(this)
      console.log(msg);
      return null;
    },
    ajax (method, url, data, success, failed) {
      axios[method](url, data).then(res => {
        success && success(res)
      }).catch(err => {
        failed && failed(err)
      })
    }
  }
  return Obj;
})();

// jsonObj.setObj.call(json,'id', 'test', true)
//

