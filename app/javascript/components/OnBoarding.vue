<template>
  <div id="app">
    <h2>Welcome to Onboarding</h2>
    <button @click="increment" v-text="count" type="button"></button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('Component mounted.')
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },  
  beforeUnmount() {
    console.log('Component unmounted.')
  },
}
</script>

<style></style>
