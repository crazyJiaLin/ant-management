<template>
  <div :style="options.attribute.wrapperStyle">
    <a-tabs
      :type="options.attribute.type" :tabPosition="options.attribute.tabPosition"
      :animated="options.attribute.animated" :hideAdd="options.attribute.hideAdd"
      :size="options.attribute.size" :tabBarGutter="options.attribute.tabBarGutter"
      :tabBarStyle="options.attribute.tabBarStyle"  :defaultActiveKey="options.attribute.defaultActiveKey"
      @change="onChange"
    >
      <a-tab-pane
        v-for="item1 in options.children"
        :key="item1.id" :disabled="item1.attribute.disabled"
      >
        <span slot="tab">
          <a-icon v-if="item1.attribute.icon" :type="item1.attribute.icon" />
          {{item1.title}}
        </span>
        <template v-for="item in item1.children">
          <m-query v-if="item.type && (item.type.toLowerCase() === 'query')" :options="item"
                   @submitEvent="handleSubmitEvent"/>
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
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import {Tabs, Icon} from 'ant-design-vue'
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
    name: "m-tabs",
    components: {
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      AIcon: Icon,
      MQuery, MForm, MTable, MSteps, MModal,
      MButton, MBadge, MTransfer,
      MDiv, MPre, 'm-a': MA,
    },
    props: {
      options: Object
    },
    mounted () {
      // this.getContent();
      for(let i=0; i<this.options.children.length; i++) {
        this.getContent(this.options.children[i])
      }
    },
    methods: {
      onChange (key) {
        console.log(key)
      },
      getContent (item) {
        if(!item.isRemote || !item.data) return;
        // 根据配置文件中data的配置项发送请求，获取content数据
        console.log(item.data.method)
        let method = item.data.method.toLowerCase();
        this.$axios[method](item.data.url,item.data.params)
          .then(res => {
            console.log(res)
            if(item.data.isBase64Data) {
              // 需要Base54解码
              let jsonStr = Base64.decode(res.data.data)
              // 解析解码后的json数据
              this.parseJSON(jsonStr, item)
            }else{
              // 不需要base64解码，直接解析json数据
              this.parseJSON(res.data.data, item)
            }
          }).catch(err => {
          console.log(err)
          message.error(item.id + '组件请求数据失败！');
        })
      },
      parseJSON (jsonStr, item) {
        try{
          this.content = new JsonObj(JSON.parse(jsonStr));
          // 将content内容通知给父组件，添加到父组件的children里
          console.log(item.id, new Array(JSON.parse(jsonStr)))
          this.$emit('submitEvent', `jsonobj.set('${item.id}','children',${jsonStr});`)
        }catch (e) {
          // console.log('转化错误',e.toString())
          message.error('数据不能转化为json格式')
        }
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
