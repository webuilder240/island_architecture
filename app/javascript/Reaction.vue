<template>
  <div class="side-menu">
    <button v-text="count" @click="increment"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment(item) {
      this.count+=1
    }
  },
  mounted() {
    console.log('Reaction Component mounted.')
  }
}
</script>
