<template>
  <div>
    <a-table >

    </a-table>
  </div>
</template>

<script>
  import {Table} from  'ant-design-vue'
  export default {
    name: "m-test2",
    components: {
      ATable: Table
    },
    data(){
      return {
        // customRow(record) {
        //   return {
        //     props: {
        //       // xxx
        //     },
        //     on: { // 事件
        //       click: () => {
        //       },       // 点击行
        //       mouseenter: () => {
        //       },  // 鼠标移入行
        //       // xxxx...
        //     },
        //   };
        // }
      }
    }
  }
</script>

<style scoped>

</style>
