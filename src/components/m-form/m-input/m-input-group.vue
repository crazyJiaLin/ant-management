<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-input-group v-if="!options.attribute.Tooltip" :size="options.attribute.size" compact>
      <template v-for="(item, index) in options.children">
<!--        <a-form-item :labelCol="{span:0}" :warapperCol="{span:24}">-->
<!--        遗留问题decorator的重复怎么处理-->
          <a-input v-if="item.type && (item.type.toLowerCase() === 'inputtext')"
                   :style="item.attribute.style"  :placeholder="item.attribute.placeholder"
                   :size="item.attribute.size" :disabled="item.attribute.disabled"
                   v-decorator="[
                     item.id,
                     item.attribute.decorator
                 ]"/>
<!--        </a-form-item>-->

      </template>
    </a-input-group>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Col, Input, Select, DatePicker, TimePicker} from 'ant-design-vue'
  export default {
    name: "m-input-group",
    components: {
      AFormItem: Form.Item,
      ACol: Col,
      AInput: Input,
      AInputGroup: Input.Group,
      ASelect: Select,
      ASelectOption: Select.Option,
      ADatePicker: DatePicker,
      ATimePicker: TimePicker,
    },
    props: {
      options: Object
    },
    methods: {
      // 子组件中带动作的，需要template对配置json数据进行操作
      handleSubmitEvent (value) {
        this.$emit('submitEvent', value)
      }
    }
  }
</script>

<style scoped>

</style>
