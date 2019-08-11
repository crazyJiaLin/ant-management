<template>
  <a-table :columns="options.columns"
           :rowKey="eval(options.rowKeys)"
           :dataSource="dataList"
           :pagination="pagination"
           :loading="loading"
           @change="handleTableChange"
  >
  </a-table>
</template>
<script>
  import {Table} from 'ant-design-vue'
  export default {
    name: 'm-table',
    components: {
      ATable: Table
    },
    props: {
      options: Object
    },
    computed: {
      dataList() {
        return this.options.isRemote ? this.data : this.options.data;
      }
    },
    data() {
      return {
        data: [],
        pagination: this.options.pagination,
        loading: false,
        // columns: this.options.columns,
      }
    },
    mounted() {
      this.fetch();
    },
    methods: {
      handleTableChange (pagination, filters, sorter) {
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch (params = {}) {
        console.log('params:', params);
        this.loading = true
        this.$axios.get('https://randomuser.me/api',{
          params: {
            results: 10,
            ...params,
          }
        }).then((res) => {
          let data = res.data;
          console.log(data)
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
      }
    },
  }
</script>
