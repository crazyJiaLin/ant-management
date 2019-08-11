<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-upload  v-if="!options.attribute.Tooltip" name="file" :multiple="options.attribute.multiple" :action="options.action"
              :headers="options.headers" @change="handleChange"  v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
      <a-button>
        <a-icon v-if="options.attribute.icon" :type="options.attribute.icon" /> {{options.text}}
      </a-button>
    </a-upload>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
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
      // TODO 如果需要手动上传的话，需要设置beforeUpload 钩子函数，返回 false 后，手动上传文件。
    }
  }
</script>

<style scoped>

</style>
