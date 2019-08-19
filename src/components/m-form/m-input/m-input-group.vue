<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-input-group v-if="!options.attribute.Tooltip" :size="options.attribute.size" compact>
      <template v-for="(item, index) in options.children">
<!--        遗留问题decorator的重复怎么处理-->
          <a-input v-if="item.type && (item.type.toLowerCase() === 'inputtext')"
                   :style="item.attribute.style"  :placeholder="item.attribute.placeholder"
                   :size="item.attribute.size" :disabled="item.attribute.disabled"
                   @change="onChange(item.id, 'input', $event)"
                  />
        <a-select v-if="item.type && (item.type.toLowerCase() === 'select')"
                  :placeholder="item.attribute.placeholder" :style="item.attribute.style"
                  :allowClear="item.attribute.allowClear" :mode="item.attribute.mode"
                  @change="onChange(item.id, 'select', $event)"
        >
          <a-select-option v-for="(item2, index) in item.data" :key="index"
                           :value="(item.fieldsName && item.fieldsName.value) ? item2[item.fieldsName.value] : item2.value">
            {{(item.fieldsName && item.fieldsName.label) ? item2[item.fieldsName.label] : item2.label}}
          </a-select-option>
        </a-select>
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
      onChange (name, type, ev) {
        let value = ''
        if(type === 'input') {
          value = ev.target.value;
        }else if(type === 'select') {
          value = ev
        }
        // 向父组件提交group内每个组件的fileds和值
        this.$emit('change', name, value)
      },
      // 子组件中带动作的，需要template对配置json数据进行操作
      handleSubmitEvent (value) {
        this.$emit('submitEvent', value)
      }
    }
  }
</script>

<style scoped>

</style>
