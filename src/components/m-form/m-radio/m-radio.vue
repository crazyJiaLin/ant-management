<template>
  <a-form-item  :label="options.label"
                :labelCol="options.labelCol" :wrapperCol="options.wrapperCol" >
    <a-radio-group v-if="!options.attribute.Tooltip" @change="onChange"
                   :disabled="options.attribute.disabled" :buttonStyle="options.attribute.buttonStyle"
                   v-decorator="[
                    options.id,
                    options.attribute.decorator
                  ]"
    >
      <a-radio v-if="!options.attribute.isButton" v-for="(item, index) in dataList" :key="index"
               :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value"
               :disabled="item.disabled"
      >
        {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
      </a-radio>
      <a-radio-button v-if="options.attribute.isButton" v-for="(item, index) in dataList" :key="index"
                      :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value"
                      :disabled="item.disabled"
      >
        {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
      </a-radio-button>
    </a-radio-group>
    <a-tooltip v-if="options.attribute.Tooltip"
               :placement="options.attribute.Tooltip.placement" :title="options.attribute.Tooltip.title">
      <a-radio-group @change="onChange" :buttonStyle="options.attribute.buttonStyle"
                     :disabled="options.attribute.disabled"
                     v-decorator="[
                        options.id,
                        options.attribute.decorator
                      ]"
      >
        <a-radio v-if="!options.attribute.isButton" v-for="(item, index) in dataList" :key="index"
                 :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value"
                 :disabled="item.disabled"
        >
          {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
        </a-radio>
        <a-radio-button v-if="options.attribute.isButton" v-for="(item, index) in dataList" :key="index"
                        :value="(options.fieldsName && options.fieldsName.value) ? item[options.fieldsName.value] : item.value"
                        :disabled="item.disabled"
        >
          {{(options.fieldsName && options.fieldsName.label) ? item[options.fieldsName.label] : item.label}}
        </a-radio-button>
      </a-radio-group>
    </a-tooltip>
  </a-form-item>
</template>

<script>
  import {Form, Radio, Tooltip, Icon} from 'ant-design-vue'
  export default {
    name: "m-radio",
    components: {
      AFormItem: Form.Item,
      ARadio: Radio,
      ARadioGroup: Radio.Group,
      ARadioButton: Radio.Button,
      ATooltip: Tooltip,
      AIcon: Icon,
    },
    props: {
      options: Object
    },
    computed: {
      dataList() {
        return this.options.isRemote ? this.data : this.options.data
      }
    },
    data () {
      return {
        data: this.options.data
      }
    },
    methods : {
      onChange (e) {
        let curVal = e.target.value
        // console.log('radio checked', curVal)
        // 拿到选择的value值，需要遍历数组，获取到当前选中的inner，提交给父组件执行
        for(let i=0; i<this.dataList.length; i++){
          if(this.dataList[i].value == curVal) {
            if(this.dataList[i].inner) {
              this.$emit('submitEvent', this.dataList[i].inner)
            }
            return;
          }
        }
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
