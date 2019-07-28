<template>
  <div class="hello">
    <a-row>
      <a-col :span="6" :offset="9">
        <a-input ></a-input>
      </a-col>
    </a-row>
    <axios-test></axios-test>
  </div>
</template>

<script>
import {Row, Col, Input} from 'ant-design-vue'
import AxiosTest from './AxiosTest'
export default {
  name: 'HelloWorld',
  components: {
    ARow: Row,
    ACol: Col,
    AInput : Input,
    AxiosTest
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
