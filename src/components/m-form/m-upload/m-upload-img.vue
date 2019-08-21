<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-upload  listType="picture-card" :fileList="fileList"
               :multiple="options.attribute.multiple" :action="options.action"
               :headers="options.headers" :name="options.name"
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
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-form-item>
</template>

<script>
  import {Upload, Button, Icon, Form, Modal} from 'ant-design-vue'
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
      handleChange ({ fileList }) {
        this.fileList = fileList
      },
      // TODO 如果需要手动上传的话，需要设置beforeUpload 钩子函数，返回 false 后，手动上传文件。
    }
  }
</script>

<style scoped>

</style>
