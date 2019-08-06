<template>
  <div class="test-wrap">
    <json-editor ref="JsonEditor" :schema="schema" v-model="model">
      <a-button @click="submit">submit</a-button>
      <a-button @click="reset">Reset</a-button>
    </json-editor>
    <pre>{{JSON.stringify({name:"cjl",children:[
      {name: 'hello'}
      ]},null, 2)}}</pre>
  </div>
</template>

<script>
  import JsonEditor from 'vue-json-ui-editor'
  import {Checkbox, Button} from 'ant-design-vue'
  export default {
    name: "m-test",
    components: {
      ACheckboxGroup: Checkbox.Group,
      AButton: Button,
      JsonEditor
    },
    data() {
      return {

        // init json schma file ( require('@/schema/newsletter') )
        schema: {
          type: 'object',
          title: 'vue-json-editor demo',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        // data
        model: {
          name: 'Yourtion',
        },
      }
    },
    methods : {
      submit(_e) {
        alert(JSON.stringify(this.model));
      },
      reset() {
        this.$refs.JsonEditor.reset();
      },
    }
  }
</script>

<style scoped>

</style>
