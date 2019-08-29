<template>
  <a-modal :title="options.attribute.title" :visible="options.attribute.visible"
           :width="options.attribute.width" :zIndex="options.attribute.zIndex"
           :autoFocusButton="options.attribute.autoFocusButton" :cancelText="options.attribute.cancelText"
           :okText="options.attribute.okText" :okType="options.attribute.okType"
           :confirmLoading="options.attribute.confirmLoading" :destroyOnClose="options.attribute.destroyOnClose"
           :closable="options.attribute.closable" :footer="options.attribute.footer"
          @ok="handleOk" @cancel="handleCancel"
  >
    <template v-for="(item, index) in options.children" >
      <m-query v-if="item.type && (item.type.toLowerCase() === 'query')" :options="item"
               @submitEvent="handleSubmitEvent" @search="handleSearch(item.tableId, $event)"/>
      <m-form v-if="item.type && (item.type.toLowerCase() === 'form')" :options="item"
              @submitEvent="handleSubmitEvent"/>
      <m-table v-if="item.type && (item.type.toLowerCase() === 'table')" :options="item" @submitEvent="handleSubmitEvent"/>
      <m-steps v-if="item.type && (item.type.toLowerCase() === 'steps')" :options="item" @submitEvent="handleSubmitEvent"/>
      <m-modal v-if="item.type && (item.type.toLowerCase() === 'modal')" :options="item" @submitEvent="handleSubmitEvent"/>

      <m-badge v-if="item.type && (item.type.toLowerCase() === 'badge')" :options="item" @submitEvent="handleSubmitEvent"/>
      <m-transfer v-if="item.type && (item.type.toLowerCase() === 'transfer')" :options="item"/>
      <m-a v-if="item.type && (item.type.toLowerCase() === 'a')" :options="item" @submitEvent="handleSubmitEvent"/>
      <m-button v-if="item.type && (item.type.toLowerCase() === 'button')" :options="item" @submitEvent="handleSubmitEvent"/>
      <m-div v-if="item.type && (item.type.toLowerCase() === 'div')" :options="item"/>
      <m-pre v-if="item.type && (item.type.toLowerCase() === 'pre')" :options="item"/>
    </template>
  </a-modal>
</template>

<script>
  const Base64 = require('js-base64').Base64
  import {Modal} from 'ant-design-vue'
  import MQuery from '@/components/m-form/m-query/m-query'
  import MForm from '@/components/m-form/m-form'
  import MTable from '@/components/m-table/m-table'
  import MSteps from '@/components/m-steps/m-steps'
  import MModal from '@/components/m-modal/m-modal'

  import MButton from '@/components/m-form/m-button/m-button'
  import MBadge from '@/components/m-badge/m-badge'
  import MTransfer from '@/components/m-transfer/m-transfer'

  import MA from '@/components/m-native/m-a'
  import MDiv from '@/components/m-native/m-div'
  import MPre from '@/components/m-native/m-pre'
  export default {
    name: "m-modal",
    components: {
      AModal: Modal,
      MQuery, MForm, MTable, MSteps, MModal,
      MButton, MBadge, MTransfer,
      MDiv, MPre, 'm-a': MA,
    },
    props: {
      options: Object
    },
    data () {
      return {
        content: []
      }
    },
    mounted() {
      this.getContent();
    },
    methods: {
      handleOk (e) {
        let okFn = $eval(this.options.methods ? this.options.methods.ok : null)
        okFn(e, this);
      },
      getContent () {
        if(!this.options.isRemote || !this.options.data) return;
        // 根据配置文件中data的配置项发送请求，获取content数据
        console.log(this.options.data.method)
        let method = this.options.data.method.toLowerCase();
        this.$axios[method](this.options.data.url,this.options.data.params)
          .then(res => {
            console.log(res)
            if(this.options.data.isBase64Data) {
              // 需要Base54解码
              let jsonStr = Base64.decode(res.data.data)
              // 解析解码后的json数据
              this.parseJSON(jsonStr)
            }else{
              // 不需要base64解码，直接解析json数据
              this.parseJSON(res.data.data)
            }
          }).catch(err => {
            console.log(err)
            message.error(this.options.id + '组件请求数据失败！');
        })
      },
      parseJSON (jsonStr) {
        try{
          this.content = new JsonObj(JSON.parse(jsonStr));
          // 将content内容通知给父组件，添加到父组件的children里
          console.log(this.options.id, new Array(JSON.parse(jsonStr)))
          this.$emit('submitEvent', `jsonobj.set('${this.options.id}','children',${jsonStr});`)
        }catch (e) {
          // console.log('转化错误',e.toString())
          message.error('数据不能转化为json格式')
        }
      },
      handleCancel (e) {
        let cancelFn = $eval(this.options.methods ? this.options.methods.cancel : null)
        cancelFn(e, this);
      },
      handleSearch(tableId, params) {
        // console.log('start search', tableId, params)
        // 通过自定义方法吧params设置到对应的table中去
        this.template.set(tableId, 'params', params)
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
