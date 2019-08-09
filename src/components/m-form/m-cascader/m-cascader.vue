<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-cascader v-if="!options.attribute.Tooltip" :size="options.attribute.size"
                :options="options.isRemote ? data : options.data"  :fieldNames="options.fieldNames"
                :allowClear="options.attribute.allowClear" :placeholder="options.attribute.placeholder"
                v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
      <a-icon v-if="options.attribute.suffixIcon" :type="options.attribute.suffixIcon" slot="suffixIcon" class="test"/>
    </a-cascader>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-cascader :options="options.isRemote ? data : options.data"  :fieldNames="options.fieldNames"
                  :allowClear="options.attribute.allowClear" :placeholder="options.attribute.placeholder"
                  :size="options.attribute.size" v-decorator="[
                  options.id,
                  options.attribute.decorator
                ]">
        <a-icon v-if="options.attribute.suffixIcon" :type="options.attribute.suffixIcon" slot="suffixIcon" class="test"/>
      </a-cascader>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Cascader, Tooltip, Icon} from 'ant-design-vue'
  export default {
    name: "m-cascader",
    components: {
      AFormItem: Form.Item,
      ACascader: Cascader,
      ATooltip: Tooltip,
      AIcon: Icon
    },
    props: {
      options: Object
    },
    data () {
      return {
        data : []
      }
    },
    methods: {
      getData () {
        if(!this.options.isRemote) return;
        this.$axios.get(this.options.dataUrl).then(res => {
          console.log(res)
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
