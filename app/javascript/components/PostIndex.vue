<template>
  <div id="app">
    <h2>Welcome to Posts</h2>
    <div v-for="post in posts">
      <div class="post">
        <a :href="`/posts/${post.id}`">
          <h2> {{ post.title }} </h2>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('pageshow',(event) => {
      if (event.persisted) {
        // bfcache発動時の処理
        this.fetchApi()
      }
    });
    this.fetchApi()
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    fetchApi() {
      fetch('/posts.json').then(response => response.json()).then(data => this.posts = data)
    }
  }
}
</script>

<style></style>
