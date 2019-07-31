<template>
  <div class="breadcrumb-wrap">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in routes" :key="index">
        <a v-if="index < routes.length-1">{{item.title}}</a>
        <span v-if="index == routes.length-1">{{item.title}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
  import {Breadcrumb} from 'ant-design-vue'
  export default {
    name: "m-breadcrumb",
    components: {
      ABreadcrumb: Breadcrumb,
      ABreadcrumbItem: Breadcrumb.Item
    },
    data () {
      return {
        routes : this.$store.state.routes
      }
    },
    watch : {
      $route(to) {
        this.routes = this.$store.state.routes;
        // console.log(to.matched)
        // this.routes = [];
        // for (let i=0; i<to.matched.length; i++){
        //   let title = to.matched[i].meta.title;
        //   if(title && title != '') {
        //     this.routes.push({
        //       title: title,
        //       path: to.matched[i].path
        //     });
        //   }
        // }
      }
    },
    mounted() {
      // console.log(this.$router)
      // console.log(123)
    }
  }
</script>

<style scoped>
  .breadcrumb-wrap{
    margin: 10px;
  }
</style>
