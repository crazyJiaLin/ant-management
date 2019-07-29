<template>
  <div class="router-wrap">
    <div class="form-wrap">

    </div>
    <div class="table-wrap">
      <sys-menu-table></sys-menu-table>
    </div>
  </div>
</template>

<script>
  // import MTable from '@/components/m-table/m-table'
  import SysMenuTable from './sys-menu-table/sys-menu-table'
  export default {
    name: "sys-menu",
    components: {
      SysMenuTable
    },
    data () {
      return {
        menuTree: [],
      }
    },
    methods : {
      getMenuTree () {

      }
    },
    mounted() {
      // this.getMenuTree();
    }
  }
</script>

<style scoped lang="less">
 @import "sys-menu";
</style>
