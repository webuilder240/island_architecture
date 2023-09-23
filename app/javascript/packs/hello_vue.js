import { createApp } from 'vue';

let observer;

const loadAndMountVueApp = async () => {
  try {
    // App.vueを動的にインポート
    const { default: App } = await import('../Onboarding.vue');
    
    const appInstance = createApp(App);
    appInstance.mount('#onboarding-container');

    // Observerを解除
    if (observer) {
      observer.disconnect();
    }
  } catch (error) {
    console.error("Failed to load App.vue:", error);
  }
};

const onboardingObserverCallback = (entries, observer) => {
  for (let entry of entries) {
    if (entry.isIntersecting) {
      loadAndMountVueApp();
      observer.disconnect();
    }
  }
};

// Intersection Observerのセットアップ
const init = () => {
  const target = document.querySelector('#onboarding-container');
  if (target) {
    observer = new IntersectionObserver(onboardingObserverCallback);
    observer.observe(target);
  }
};

// DOMContentLoadedイベントが発生したらinit関数を実行
document.addEventListener('DOMContentLoaded', init);

// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })
