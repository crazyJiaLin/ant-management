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
        :key="item1.id" :tab="item1.title"
      >
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
  import {Tabs} from 'ant-design-vue'
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
      MQuery, MForm, MTable, MSteps, MModal,
      MButton, MBadge, MTransfer,
      MDiv, MPre, 'm-a': MA,
    },
    props: {
      options: Object
    },
    methods: {
      onChange (key) {
        console.log(key)
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
