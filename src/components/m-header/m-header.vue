<template>
  <a-layout-header class="header-wrap">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => this.$emit('clickCollBtn')"/>
    <div class="user-wrap">

    </div>
  </a-layout-header>
</template>

<script>
  import {Layout, Icon} from 'ant-design-vue'
  export default {
    name: "m-header",
    components: {
      ALayoutHeader: Layout.Header,
      AIcon: Icon
    },
    props: {
      collapsed: Boolean
    },
    data () {
      return {
      }
    },
    methods: {
      getUserInfo () {
        this.$axios.get('/current/user').then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getUserInfo();
    }
  }
</script>

<style scoped lang="less">
  @import "m-header";
</style>
