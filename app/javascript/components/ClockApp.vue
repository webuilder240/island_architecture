<template>
  <div class="clock" v-if="loaded">
    <div class="clock__time">{{ time }}</div>
    <div class="clock__date">{{ date }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      date: ''
    }
  },
  mounted() {
    this.getTime();
    this.getDate();
    setTimeout(() => {
      this.getTime();
      this.getDate();
    }, 1000);
  },
  computed: {
    loaded() {
      return this.time && this.date;
    }
  },
  methods: {
    getTime() {
      const date = new Date();
      this.time = date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    getDate() {
      const date = new Date();
      this.date = date.toLocaleDateString(navigator.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
}
</script>
