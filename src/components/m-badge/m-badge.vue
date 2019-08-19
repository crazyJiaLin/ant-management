<template>
  <a-badge :count="options.count" :style="options.attribute.style"
           :numberStyle="options.attribute.numberStyle" :dot="options.attribute.dot"
           :showZero="options.attribute.showZero" :offset="options.attribute.offset"
           :overflowCount="options.attribute.overflowCount" :status="options.attribute.status"
           :text="options.attribute.text" :title="options.attribute.title"
  >
    <a  v-if="options.content && options.content.type.toLowerCase() === 'a'"
        :href="options.content.href" :style="options.content.style"
    >{{options.content.text}}</a>
    <a-icon  v-if="options.content && options.content.type.toLowerCase() === 'icon'"
             :type="options.content.icon" :style="options.content.style"
    ></a-icon>
    <a-button v-if="options.content && options.content.type.toLowerCase() === 'button'"
              :type="options.content.btnType" @click="onClick"
    >{{options.content.text}}</a-button>
  </a-badge>
</template>

<script>
  import {Badge, Icon, Button} from 'ant-design-vue'
  export default {
    name: "m-badge",
    components: {
      ABadge: Badge,
      AIcon: Icon,
      AButton: Button
    },
    props: {
      options: Object
    },
    computed : {
      myCount () {
        return this.options.isRemote ? this.count : this.options.count;
      },
    },
    data() {
      return {
        count: 0
      }
    },
    methods: {
      fetch() {
        if(!this.options.isRemote || !this.options.dataUrl) return;
        this.$axios.get(this.options.dataUrl, this.options.params).then(res => {
          console.log('get badge data')
          if(res.data){
            this.count = res.data;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onClick () {
        (this.options.content && this.options.content.click) &&
        this.$emit('submitEvent', this.options.content.click)
      }
    }
  }
</script>

<style scoped>

</style>
