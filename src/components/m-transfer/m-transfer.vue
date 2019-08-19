<template>
  <a-transfer
    :dataSource="dataSource" :targetKeys="targetKeys"
    :selectedKeys="selectedKeys" :render="item => item.title"
    :showSearch="options.attribute.showSearch" :title="options.attribute.title"
    :disabled="options.attribute.disabled" :operations="options.attribute.operations"
    :locale="options.attribute.locale" :listStyle="options.attribute.listStyle"
    :style="options.attribute.style"
    @change="onChange"
    @selectChange="onSelectChange"
    @scroll="onScroll"
    @search="onSearch"
  >
  </a-transfer>
</template>
<script>
  import {Transfer} from 'ant-design-vue'
  export default {
    name: "m-transfer",
    components: {
      ATransfer: Transfer
    },
    props: {
      options: Object
    },
    computed: {
      render () {
        return $eval(this.options.render, 'transfer render')
      }
    },
    data () {
      return {
        dataSource : this.options.dataSource,
        targetKeys : this.options.targetKeys,
        selectedKeys: this.options.selectedKeys
      }
    },
    methods: {
      onChange (nextTargetKeys, direction, moveKeys) {
        this.targetKeys = nextTargetKeys
        // console.log(this.options.methods.onChange)
        if(this.options.methods && this.options.methods.onChange) {
          let fn = $eval(this.options.methods.onChange)
          fn(nextTargetKeys, direction, moveKeys);
        }
      },
      onSelectChange (sourceSelectedKeys, targetSelectedKeys) {
        this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
        if(this.options.methods && this.options.methods.onSelectChange) {
          let fn = $eval(this.options.methods.onSelectChange)
          fn(sourceSelectedKeys, targetSelectedKeys)
        }
      },
      onScroll (direction, e) {
        if (this.options.methods && this.options.methods.onScroll) {
          let fn =  $eval(this.options.methods.onScroll);
          fn(direction, e);
        }
      },
      onSearch (direction, value) {
        if (this.options.methods && this.options.methods.onSearch) {
          let fn = $eval(this.options.methods.onSearch);
          fn(direction, value)
        }
      },
    }
  }
</script>

<style scoped>

</style>
