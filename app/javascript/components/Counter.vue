<template>
  <div class="counter">
    <h1>{{ siteName }}</h1>
    <h2>{{ localCount }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    siteName: {
      type: String,
      required: true
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
