<template>
  <div class="query-wrap">
    query-wrap2
    <a-form :form="form" @submit="handleSearch">
      <a-form-item v-for="(item,index) in children" :label="item.label"
                   :labelCol="item.labelCol" :wrapperCol="item.wrapperCol" :key="item.id">
        <a-input v-if="item.type === 'text'" :placeholder="item.placeholder"
                 :allowClear="item.allowClear" :addonBefore="item.addonBefore"
                 :addonAfter="item.addonAfter" v-decorator="[
                     item.id,
                     item.decorator
                 ]"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import {Form, Button, Icon} from 'ant-design-vue'
  export default {
    name: "m-query",
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AButton: Button,
      AIcon: Icon
    },
    props: {
      options: Object
    },
    computed : {
      children() {
        return this.options.attribute.children
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
      }
    },
    methods: {
      handleSearch (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          console.log('error', error);
          console.log('Received values of form: ', values);
        });
      }
    }
  }
</script>

<style scoped>

</style>
