<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-input-search v-if="!options.attribute.Tooltip" :placeholder="options.attribute.placeholder"
                    :size="options.attribute.size" :disabled="options.attribute.disabled"
                    :enterButton="options.attribute.enterButton"
                    v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]">
      <a-icon v-if="options.attribute.icon" slot="enterButton"></a-icon>
    </a-input-search>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-input-search :placeholder="options.attribute.placeholder"
                      :size="options.attribute.size" :disabled="options.attribute.disabled"
                      :enterButton="options.attribute.enterButton"
                      v-decorator="[
                     options.id,
                     options.attribute.decorator
                 ]">
        <a-icon v-if="options.attribute.icon" slot="enterButton"></a-icon>
      </a-input-search>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Input, Tooltip, Icon} from 'ant-design-vue'
  export default {
    name: "m-input-search",
    components: {
      AFormItem: Form.Item,
      AInputSearch: Input.Search,
      ATooltip: Tooltip,
      AIcon: Icon
    },
    props: {
      options: Object
    },
    mounted() {
      // console.log(this.options)
    }
  }
</script>

<style scoped lang="less">
  .ant-input-number{
    width: 100%
  }
</style>
