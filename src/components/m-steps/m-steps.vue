<template>
  <div :style="options.attribute.wrapperStyle">
<!--    steps 线条-->
    <a-steps :current="current.index" :status="options.attribute.status"
             :direction="options.attribute.direction" :labelPlacement="options.attribute.labelPlacement"
             :size="options.attribute.size" :progressDot="options.attribute.progressDot"
             :style="options.attribute.stepsStyle"
    >
      <a-step v-for="item in steps" :key="item.title"
              :title="item.title" :status="item.status"
              :description="item.description"
      >
        <a-icon v-if="item.icon" :type="item.icon" slot="icon"/>
      </a-step>
    </a-steps>
<!--    内容-->
    <div class="steps-content" :style="options.attribute.contentStyle">
      <div v-for="(item1, index1) in steps" v-show="index1 == current.index">
        <template  v-for="(item, index) in item1.content">
          <m-query v-if="item.type && (item.type.toLowerCase() === 'query')" :options="item"
                   @submitEvent="handleSubmitEvent" @search="handleSearch(item.tableId, $event)"/>
          <m-form v-if="item.type && (item.type.toLowerCase() === 'form')" :options="item"
                  @submitEvent="handleSubmitEvent" @afterSubmit="handleFormSubmit(item1, $event)"/>
          <m-table v-if="item.type && (item.type.toLowerCase() === 'table')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-steps v-if="item.type && (item.type.toLowerCase() === 'steps')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-badge v-if="item.type && (item.type.toLowerCase() === 'badge')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-transfer v-if="item.type && (item.type.toLowerCase() === 'transfer')" :options="item"/>
          <m-a v-if="item.type && (item.type.toLowerCase() === 'a')" :options="item" @submitEvent="handleSubmitEvent"/>
          <m-div v-if="item.type && (item.type.toLowerCase() === 'div')" :options="item"/>
          <m-pre v-if="item.type && (item.type.toLowerCase() === 'pre')" :options="item"/>
          <div v-if="item.type && (item.type.toLowerCase() === 'button')" :style="item.wrapperStyle">
            <a-button
              :type="item.btnType" :style="item.style" :size="item.size"
              :loading="item.loading" :disabled="item.disabled"
            >
              <a-icon v-if="item.icon" :type="item.icon"></a-icon>
              {{item.text}}
            </a-button>
          </div>
          <div v-if="item.type && (item.type.toLowerCase() === 'icon')" :style="item.wrapperStyle">
            <a-icon :type="item.icon" :style="item.style" :spin="item.spin"></a-icon>
          </div>
        </template>
      </div>

    </div>
<!--    操作按钮-->
    <div class="steps-action" :style="options.attribute.actionStyle">
      <template v-for="(item, index) in steps[current.index].action">
        <a-button v-if="item.type && (item.type.toLowerCase() === 'button')"
                  :type="item.btnType" :style="item.style" :loading="item.loading"
                  @click="handleActionClick(item)"
        >{{item.text}}</a-button>
      </template>
    </div>
  </div>
</template>

<script>
  import {Steps, Button, Icon} from 'ant-design-vue'

  import MQuery from '@/components/m-form/m-query/m-query'
  import MForm from '@/components/m-form/m-form'
  import MTable from '@/components/m-table/m-table'
  import MSteps from '@/components/m-steps/m-steps'

  import MA from '@/components/m-native/m-a'
  import MBadge from '@/components/m-badge/m-badge'
  import MTransfer from '@/components/m-transfer/m-transfer'

  import MDiv from '@/components/m-native/m-div'
  import MPre from '@/components/m-native/m-pre'
  export default {
    name: "m-steps",
    components: {
      ASteps: Steps,
      AStep: Steps.Step,
      AButton: Button,
      AIcon: Icon,
      MQuery, MForm, MTable, MSteps,
      'm-a': MA, MBadge, MTransfer,
      MDiv, MPre
    },
    props: {
      options: Object
    },
    data() {
      return {
        current: {
          index: this.options.attribute.initial ? this.options.attribute.initial : 0
        },
        steps: this.options.steps
      }
    },
    methods: {
      handleActionClick (item) {
        // console.log(item)
        let beforeAction = $eval(item.beforeAction);
        beforeAction(this.steps, this.current);
        if(item.actionType === 'next') {
          this.next();
        }else if(item.actionType === 'previous') {
          this.previous();
        }else if (item.actionType === 'finish') {
          this.finish();
        }
      },
      // 表单提交完成之后的事件监听
      handleFormSubmit (item, value) {
        // value 为form组件传进来的值，包括提交状态status和相应数据data
        console.log('after submit', item, value)
        for(let i=0; i<item.action.length; i++) {
          if(item.action[i].actionType === 'self') {
            // 找到self的action，根据form状态调用相应的回调函数
            if(value.status === 'success') {
              let formSuccess = $eval(item.action[i].formSuccess)
              formSuccess(this.steps, this.current)
            }else if(value.status === 'failed') {
              let formFailed = $eval(item.action[i].formFailed)
              formFailed(this.steps, this.current)
            }else if(value.status === 'validFailed') {
              let validFailed = $eval(item.action[i].validFailed)
              validFailed(this.steps, this.current)
            }
          }
        }
        // let formSuccess = $eval(this.options.)
      },
      next() {
        this.current.index++
      },
      previous() {
        this.current.index--
      },
      finish() {
        notification.success({
          message: '操作成功'
        });
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
