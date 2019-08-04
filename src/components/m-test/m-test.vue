<template>
  <div class="test-wrap">
    <a-checkbox-group :options="optionsWithDisabled" :defaultValue="['Apple']" @change="onChange">
      <span slot="label" slot-scope="{name, code}">{{name + code}}</span>
    </a-checkbox-group>
  </div>
</template>

<script>
  import {Checkbox} from 'ant-design-vue'
  export default {
    name: "m-test",
    components: {
      ACheckboxGroup: Checkbox.Group
    },
    data() {
      return {
        optionsWithDisabled : [
          { value: 'Apple',  name: '1231', code:'value1' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange', disabled: false },
        ]
      }
    },
    methods : {
      onChange (value) {
        console.log(value)
      }
    }
  }
</script>

<style scoped>

</style>
