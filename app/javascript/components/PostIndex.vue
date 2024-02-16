<template>
  <div id="app">
    <h2>Welcome to Posts</h2>
    <input type="text" v-model="search" placeholder="Search">
    <div v-for="post in posts" :key="post.id" class="list-item">
      <div class="post">
        <a :href="`/posts/${post.id}`">
          <h2> 
            {{ post.title }} 
            <span v-if="post.unread"> unread </span>
          </h2>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es"
export default {
  mounted() {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        this.fetchApi()
      }
    });
    this.fetchApi()
  },
  data() {
    return {
      posts: [],
      search: null
    }
  },
  watch: {
    search() {
      this.debounceFetchApi()
    }
  },
  methods: {
    debounceFetchApi: debounce(function() {
      this.fetchApi()
    }, 500),
    fetchApi() {
      if (this.search) {
        fetch(`/posts.json?keyword=${this.search}`).then(response => response.json()).then(data => this.posts = data)
      } else {
        fetch(`/posts.json`).then(response => response.json()).then(data => this.posts = data)
      }
    }
  }
}
</script>

<style>
/* 追加と削除のアニメーション */
.room-list-enter-active, .room-list-leave-active {
  transition: all 0.5s ease;
}
.room-list-enter, .room-list-leave-to /* Vue 2.1.8以降はv-leave-to */ {
  opacity: 0;
  transform: translateY(30px);
}

/* 並び替えのアニメーション */
.room-item-move {
  transition: transform 0.5s ease;
}

/* アイテムがリスト内で移動する際のアニメーション */
.list-item-move {
  transition: transform 0.5s ease;
}

/* アイテムの初期状態と終了状態 */
.list-enter-active, .list-leave-active {
  transition: opacity 0.5s ease;
}
.list-enter, .list-leave-to /* Vue 2.1.8以降はlist-leave-to */ {
  opacity: 0;
}

</style>
