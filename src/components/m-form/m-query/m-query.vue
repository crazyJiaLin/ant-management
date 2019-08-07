<template>
  <div class="query-wrap">
    <a-form :form="form" @submit="handleSearch">
      <a-row>
        <a-col v-for="(item,index) in children" :span="item.width" :key="item.id">
          <m-input  v-if="item.type && (item.type.toLowerCase() === 'text')" :options="item"></m-input>
          <m-textarea v-if="item.type && (item.type.toLowerCase() === 'textarea')" :options="item"></m-textarea>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import {Form, Button, Row, Col, Input, Icon} from 'ant-design-vue'
  import MInput from '@/components/m-form/m-input/m-input'
  import MTextarea from '@/components/m-form/m-textarea/m-textarea'
  export default {
    name: "m-query",
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      ARow: Row,
      ACol: Col,
      AButton: Button,
      AIcon: Icon,
      MInput,
      MTextarea
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

<style scoped lang="less">
  @import "m-query";
</style>
