<template>
  <div class="side-menu">
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <a :href="item.link" @click.prevent="handleClick(item)">{{ item.label }}</a>
      </li>
    </ul>
    <button type="button" @click="newAlert">
      newAlert
    </button>
    <button type="button" @click="newConfirm">
      newConfirm
    </button>
  </div>
</template>

<script>
import CustomAlert from "../WebComponents/CustomAlert"
const customAlert = new CustomAlert()

import CustomConfirm from "../WebComponents/CustomConfirm"
const customConfirm = new CustomConfirm()

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
    async newConfirm() {
      const result = await customConfirm.show('SideMenu.vue mounted')
      if (result) {
        console.log('NewAlert mounted confirmed')
      } else {
        console.log('NewAlert mounted canceled')
      }
    },
    async newAlert() {
      await customAlert.show('SideMenu.vue Alerted')
      console.log('NewAlert mounted confirmed')
    }
  },
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
