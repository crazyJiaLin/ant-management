<template>
  <div class="editable-cell">
    <div
      class="editable-cell-input-wrapper"
    >
      <a-form>
        <a-form-item
          :label-col="{span:0}"
          label=""
          :validate-status="validStatus"
        >
          <a-input :value="value" @change="handleChange"/>
<!--          <a-icon type="check" class="editable-cell-icon-check" @click="check" />-->
        </a-form-item>
      </a-form>
    </div>
<!--    <div-->
<!--      v-else-->
<!--      class="editable-cell-text-wrapper"-->
<!--    >-->
<!--      {{ value || ' ' }}-->
<!--      <a-icon-->
<!--        type="edit"-->
<!--        class="editable-cell-icon"-->
<!--        @click="edit"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>
<script>
  import {Input, Icon, Form} from 'ant-design-vue'
  export default {
    components: {
      AInput: Input,
      AIcon: Icon,
      AForm: Form,
      AFormItem: Form.Item
    },
    props: {
      text: String,
    },
    data () {
      return {
        value: this.text,
        editable: true,
        validStatus: '',
      };
    },
    methods: {
      handleChange (e) {
        const value = e.target.value;
        this.value = value;
        if(this.value == '') {
          this.validStatus = 'error'
        }else {
          this.validStatus = 'validating'
        }
        this.$emit('change', this.value)
      },
      // check () {
      //   this.editable = false;
      //   this.$emit('change', this.value);
      // },
      // edit () {
      //   this.editable = true;
      // },
    },
  };
</script>
<style lang="less" scoped>
  .editable-cell-input-wrapper {
    .ant-input{
      /*width: 85%;*/
      /*margin-right: 15px;*/
    }
    .ant-row.ant-form-item {
      margin-bottom: 0;
    }
  }
</style>
