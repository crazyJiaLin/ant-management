<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-switch v-if="!options.attribute.Tooltip"
             :size="options.attribute.size" :disabled="options.attribute.disabled"
              :checkedChildren="options.attribute.checkedChildren"
              :unCheckedChildren="options.attribute.unCheckedChildren"
              @change="onChange"
             v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]"/>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-switch :size="options.attribute.size" :disabled="options.attribute.disabled"
                :checkedChildren="options.attribute.checkedChildren"
                :unCheckedChildren="options.attribute.unCheckedChildren"
                @change="onChange"
                v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]"/>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Switch, Tooltip} from 'ant-design-vue'
  export default {
    name: "m-switch",
    components: {
      AFormItem: Form.Item,
      ASwitch: Switch,
      ATooltip: Tooltip
    },
    props: {
      options: Object
    },
    methods: {
      onChange (checked) {
        if(checked) {
          this.$emit('submitEvent', this.options.attribute.checkEvent)
        }else{
          this.$emit('submitEvent', this.options.attribute.unCheckEvent)
        }

      },
    },
    mounted() {
      // console.log(this.options)
    }
  }
</script>

<style scoped>

</style>
