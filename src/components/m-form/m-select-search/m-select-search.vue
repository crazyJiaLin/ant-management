<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-select showSearch :placeholder="options.attribute.placeholder"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="true"
              @search="handleSearch"
              @change="handleChange"
              :notFoundContent="null"
    >
      <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
    </a-select>
    <!--    <a-tooltip v-if="options.attribute.Tooltip"-->
    <!--               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">-->
    <!--      <a-input-search :placeholder="options.attribute.placeholder"-->
    <!--                      :size="options.attribute.size" :disabled="options.attribute.disabled"-->
    <!--                      :enterButton="options.attribute.enterButton"-->
    <!--                      v-decorator="[-->
    <!--                     options.id,-->
    <!--                     options.attribute.decorator-->
    <!--                 ]">-->
    <!--        <a-icon v-if="options.attribute.icon" slot="enterButton"></a-icon>-->
    <!--      </a-input-search>-->
    <!--    </a-tooltip>-->
  </a-form-item>
</template>

<script>
  import {Form, Input, Select, Tooltip, Icon} from 'ant-design-vue'
  export default {
    name: "m-select-search",
    components: {
      AFormItem: Form.Item,
      AInputSearch: Input.Search,
      ATooltip: Tooltip,
      AIcon: Icon,
      ASelect: Select,
      ASelectOption: Select.Option
    },
    props: {
      options: Object
    },
    data () {
      return {
        data: this.options.data
      }
    },
    methods : {
      handleSearch (value) {
        fetch(value, data => this.data = data);
      },
      handleChange (value) {
        console.log(value)
        this.value = value
        fetch(value, data => this.data = data);
      },
    },
    mounted () {
      // console.log(this.options)
    }
  }
</script>

<style scoped lang="less">
  .ant-input-number{
    width: 100%
  }
</style>
