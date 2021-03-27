<template>
  <Login v-if="state.TableName === ''" @TableNameFun="TableNameFun" />
  <Home v-if="state.TableName !== ''" :TableName="state.TableName" :sort="state.sort" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import Login from './views/login/index.vue'
import Home from './views/home/index.vue'

const state = reactive({
  TableName: '',
  sort: 0,
})

const TableNameFun = (val, val1) => {
  state.TableName = val
  state.sort = val1
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background: #f7f8fa;
  height: 100vh;
  /* margin-top: 60px; */
}
</style>
