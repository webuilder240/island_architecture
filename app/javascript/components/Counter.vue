<template>
  <div class="counter">
    <h1>{{ localCount }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // console.log('Component mounted.')
    // debugger
  },
  data() {
    return {
      localCount: this.count
    }
  },
  methods: {
    increment() {
      this.localCount++
    }
  }
}
</script>
