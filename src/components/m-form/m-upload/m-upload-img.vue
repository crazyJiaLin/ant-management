<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-upload  listType="picture-card" :fileList="fileList"
               :multiple="options.attribute.multiple" :action="options.action"
               :headers="headers" :name="options.name" :accept="options.attribute.accept"
               @preview="handlePreview"
               @change="handleChange"
               v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
<!--      <a-button>-->
<!--        <a-icon v-if="options.attribute.icon" :type="options.attribute.icon" /> {{options.text}}-->
<!--      </a-button>-->
      <div v-if="fileList.length < (options.attribute.max ? options.attribute.max : 1)">
        <a-icon :type="(options.attribute && options.attribute.icon) ? options.attribute.icon : 'plus'" />
        <div class="ant-upload-text">{{options.text}}</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-form-item>
</template>

<script>
  import {Upload, Button, Icon, Form, Modal, Message} from 'ant-design-vue'
  export default {
    name: "m-upload",
    components: {
      AFormItem: Form.Item,
      AUpload: Upload,
      AButton: Button,
      AIcon: Icon,
      AModal: Modal
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
        previewVisible: false,
        previewImage: '',
        fileList: [],
      }
    },
    methods: {
      handleCancel () {
        this.previewVisible = false
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange (info) {
        this.fileList = info.fileList;
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          Message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          Message.error(info.file.response.error.message);
        }
      },
      // TODO 如果需要手动上传的话，需要设置beforeUpload 钩子函数，返回 false 后，手动上传文件。
    }
  }
</script>

<style scoped>

</style>
