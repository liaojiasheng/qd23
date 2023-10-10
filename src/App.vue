<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getAPIList } from './api'
export default {
  name: 'App',
  created () {
    this.getURLFn()
  },
  methods: {
    async getURLFn () {
      const res = await getAPIList()
      console.log(res)
    }
  }
}
</script>

<style lang="less"></style>
