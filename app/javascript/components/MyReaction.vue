<template>
  <div v-if="state">
    <div v-text="state.count"></div>
    <button type="button" @click="increment">increment</button>
    <button type="button" @click="decrement">decrement</button>
  </div>
</template>

<script>
import { createStore } from "../packs/simpleStore.ts"
const store = createStore({
  state: {
    count: 0
  },
  actions: {
    increment: (state) => {
      state.count+=1
    },
    decrement: (state) => {
      state.count-=1
    },
  }
})

export default {
  data() {
    return {
      state: {
        count: store.getState().count
      }
    }
  },
  methods: {
    increment() {
      store.dispatch('increment')
    },
    decrement() {
      store.dispatch('decrement')
    },
    _onChange() {
      this.state.count = store.getState().count
      console.log(this.state.count)
    }
  },
  mounted() {
    store.onChange(this._onChange.bind(this))
  }
}
</script>
