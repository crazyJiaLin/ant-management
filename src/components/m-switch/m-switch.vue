<template>
  <a-switch :size="options.attribute.size" :disabled="options.attribute.disabled"
            v-model="options.attribute.checked"
            :checkedChildren="options.attribute.checkedChildren" :loading="loading"
            :unCheckedChildren="options.attribute.unCheckedChildren"
            @change="onChange"
           />
</template>

<script>
  import {Switch} from 'ant-design-vue'
  export default {
    name: "m-switch",
    components: {
      ASwitch: Switch
    },
    props: {
      options: Object
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      onChange (checked) {
        let change = $eval(this.options.onChange);
        change(checked, this);
      },
    },
  }
</script>

<style scoped>

</style>
