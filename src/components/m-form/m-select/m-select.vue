<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-select v-if="!options.attribute.Tooltip" :size="options.attribute.size" :placeholder="options.attribute.placeholder"
                :allowClear="options.attribute.allowClear" :mode="options.attribute.mode"
                v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
      <a-select-option v-for="(item, index) in dataList" :key="index"
                       :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value">
        {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
      </a-select-option>
    </a-select>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-select :size="options.attribute.size" :placeholder="options.attribute.placeholder"
                :allowClear="options.attribute.allowClear" :mode="options.attribute.mode"
                v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
        <a-select-option v-for="(item, index) in dataList" :key="index"
                         :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value">
          {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
        </a-select-option>
      </a-select>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Select, Tooltip, Icon} from 'ant-design-vue'
  export default {
    name: "m-select",
    components: {
      AFormItem: Form.Item,
      ASelect: Select,
      ASelectOption: Select.Option,
      ATooltip: Tooltip,
      AIcon: Icon
    },
    props: {
      options: Object
    },
    computed : {
      dataList() {
        return this.options.isRemote ? this.data : this.options.data;
      }
    },
    data () {
      return {
        data : []
      }
    },
    methods: {
      getData () {
        if(!this.options.isRemote) return;
        this.$axios.get(this.options.dataUrl, this.options.params).then(res => {
          // console.log(res)
          if(res.data) {
            this.data = res.data.list
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
