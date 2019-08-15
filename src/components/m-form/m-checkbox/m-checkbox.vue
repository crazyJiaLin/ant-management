<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-checkbox-group v-if="!options.attribute.Tooltip"
                      @change="onChange" :disabled="options.attribute.disabled"
                      v-decorator="[
                        options.id,
                        options.attribute.decorator
                      ]">
      <a-checkbox v-for="(item, index) in dataList" :key="index"
                       :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value">
        {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
      </a-checkbox>
<!--      <a-radio  :value="item.value" v-for="(item, index) in dataList" :key="index">{{item.label}}</a-radio>-->
    </a-checkbox-group>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-checkbox-group @change="onChange"
                        :disabled="options.attribute.disabled"  v-decorator="[
                          options.id,
                          options.attribute.decorator
                        ]">
        <a-checkbox v-for="(item, index) in dataList" :key="index"
                    :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value">
          {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
        </a-checkbox>
      </a-checkbox-group>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Checkbox, Tooltip, Icon} from 'ant-design-vue'
  export default {
    name: "m-checkbox",
    components: {
      AFormItem: Form.Item,
      ACheckbox: Checkbox,
      ACheckboxGroup: Checkbox.Group,
      ATooltip: Tooltip,
      AIcon: Icon,
    },
    props: {
      options: Object
    },
    computed: {
      dataList() {
        return this.options.isRemote ? this.data : this.options.data
        // return ['a', 'b', 'c']
      }
    },
    data () {
      return {
        data: [],
      }
    },
    methods : {
      onChange (checkedKeys) {
        // console.log(' checked', checkedKeys)
        // TODO 考虑到如果多选，所有带inner的方法是不是都需要执行一遍？ 所以目前先不实现checkbox的点击执行操作功能
        // 拿到选择的value值，需要遍历数组，获取到当前选中的inner，提交给父组件执行
        // for(let i=0; i<this.dataList.length; i++){
        //   if(this.dataList[i].value == curVal) {
        //     if(this.dataList[i].inner) {
        //       this.$emit('submitEvent', this.dataList[i].inner)
        //     }
        //     return;
        //   }
        // }
      },
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
      // console.log(this.options)
      this.getData();
    }
  }
</script>

<style scoped>

</style>
