<template>
  <div class="test-wrap">
  </div>
</template>

<script>
  // import JsonEditor from 'vue-json-ui-editor'
  import {Checkbox, Button} from 'ant-design-vue'
  export default {
    name: "m-test",
    components: {
      ACheckboxGroup: Checkbox.Group,
      AButton: Button,
      // JsonEditor
    },
    data() {
      return {

      }
    },
    mounted() {
      let t = {
        "id": "timepicker",
        "type":"TimePicker",
        "label": '时间选择器',
        "width": 8,
        "labelCol": {"span":7},
        "wrapperCol": {"span":16, "offset": 1},
        "attribute":{
          "placeholder":"hh:mm:ss",
          format: "hh:mm:ss",
          size: 'small',
          "Tooltip":{"title":"请选择时间","placement":"bottom"},
          "decorator":{
            "rules":[
              {"required":false,"message":""},
            ],
            "initialValue": ""
          }
        },
        methods: {
          hello: 123,
          "onChange"(time, timeString) {
            console.log(time, timeString)
          },
        }
      }
      let res = {};
      let str = this.serialize(t, 'res')
      console.log(str)
      eval(str)
      console.log(res)
    },
    methods : {
      //带函数序列化
      serialize(obj, name){
        var result = "";
        function serializeInternal(o, path) {
          for (let p in o) {
            var value = o[p];
            if (typeof value != "object") {
              if (typeof value == "string") {
                result += "\n" + path + "[" + (isNaN(p)?"\""+p+"\"":p) + "] = " + "\"" + value.replace(/\"/g,"\\\"") + "\""+";";
              }else {
                result += "\n" + path + "[" + (isNaN(p)?"\""+p+"\"":p) + "] = " + value+";";
              }
            }
            else {
              if (value instanceof Array) {
                result += "\n" + path +"[" + (isNaN(p)?"\""+p+"\"":p) + "]"+"="+"new Array();";
                serializeInternal(value, path + "[" + (isNaN(p)?"\""+p+"\"":p) + "]");
              } else {
                result += "\n" + path  + "[" + (isNaN(p)?"\""+p+"\"":p) + "]"+"="+"new Object();";
                serializeInternal(value, path +"[" + (isNaN(p)?"\""+p+"\"":p) + "]");
              }
            }
          }
        }
        serializeInternal(obj, name);
        return result;
      }
    },

  }
</script>

<style scoped>

</style>
