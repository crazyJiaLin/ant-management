<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-upload  v-if="!options.attribute.Tooltip" :multiple="options.attribute.multiple" :loading="true"
               :fileList="fileList" :action="options.action"
              :headers="headers" :name="options.name"
               @change="handleChange" :beforeUpload="beforeUpload" :remove="handleRemove"
               v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
      <a-button>
        <a-icon v-if="options.attribute.icon" :type="options.attribute.icon" /> {{options.text}}
      </a-button>
    </a-upload>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-upload :multiple="options.attribute.multiple" :action="options.action"
                 :headers="options.headers" :name="options.name" @change="handleChange"
                v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
        <a-button>
          <a-icon v-if="options.attribute.icon" :type="options.attribute.icon" /> {{options.text}}
        </a-button>
      </a-upload>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Upload, Button, Icon, Form, Tooltip, Message} from 'ant-design-vue'
  export default {
    name: "m-upload",
    components: {
      AFormItem: Form.Item,
      ATooltip: Tooltip,
      AUpload: Upload,
      AButton: Button,
      AIcon: Icon
    },
    props: {
      options: Object
    },
    computed : {
      headers () {
        if(this.options.headers.Authorization) return this.options.headers;
        let Authorization = ''
        let accessToken = this.$getLocalStorage('access_token')
        let tokenType = this.$getLocalStorage('token_type')
        if(accessToken && tokenType) {
          Authorization = tokenType + ' ' + accessToken
        }
        return {
          ...this.options.header,
          Authorization: Authorization
        }
      }
    },
    data () {
      return {
        fileList: [
          // {
          //   uid: '1',
          //   name: 'xxx.png',
          //   status: 'wait',
          //   response: 'Server Error 500', // custom error message to show
          //   url: 'http://www.baidu.com/xxx.png',
          // }
        ],
      }
    },
    methods: {
      handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          Message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          Message.error(`${info.file.name} file upload failed.`);
        }
      },
      beforeUpload(file) {
        this.fileList = [...this.fileList, file]
        let beforeUpload = $eval(this.options.beforeUpload)
        return beforeUpload(file, this.fileList);
      },
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList
      },
      // TODO 如果需要手动上传的话，需要设置beforeUpload 钩子函数，返回 false 后，手动上传文件。
    }
  }
</script>

<style scoped>

</style>
