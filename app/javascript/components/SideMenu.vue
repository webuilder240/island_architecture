<template>
  <div class="side-menu">
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <a :href="item.link" @click.prevent="handleClick(item)">{{ item.label }}</a>
      </li>
    </ul>
    <div @click="newAlert">
      newAlert
    </div>
  </div>
</template>

<script>
import CustomMyAlert from "../WebComponents/CustomMyAlert"
const customMyAlert = new CustomMyAlert()

export default {
  data() {
    return {
      menuItems: [
        { label: 'Home', link: '/' },
        { label: 'Posts', link: '/posts' },
      ]
    }
  },
  methods: {
    handleClick(item) {
      console.log(`Clicked ${item.label} link`);
    },
    async newAlert() {
      const result = await customMyAlert.show('SideMenu.vue mounted')
      if (result) {
        console.log('NewAlert mounted confirmed')
      } else {
        console.log('NewAlert mounted canceled')
      }
    }
  },
  async mounted() {
    const result = await customMyAlert.show('SideMenu.vue mounted')
    if (result) {
      console.log('SideMenu.vue mounted confirmed')
    } else {
      console.log('SideMenu.vue mounted canceled')
    }
  }
}
</script>

<style scoped>
.side-menu {
  background-color: #f0f0f0;
  padding: 10px;
}

.side-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.side-menu li {
  margin-bottom: 10px;
}

.side-menu a {
  color: #333;
  text-decoration: none;
}
</style>
