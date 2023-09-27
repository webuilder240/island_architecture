import barba from '@barba/core';
import { setupIntersectionObserver } from './intersectionSetup.js';

function autoSetupIntersectionObservers() {
  const main = document.body.getElementsByTagName("main")[0];
  const observers = [];

  if (main) {
    const elements = main.querySelectorAll('[id$="-container"]'); // 例: "-container"で終わるIDを持つ要素を探す
    elements.forEach(element => {
      const componentName = element.id.replace('-container', '');
      const observer = setupIntersectionObserver(componentName);
      if (observer) {
        observers.push(observer);
        console.log(`loaded ${componentName}`)
      }
    });
  }
  return observers; // 作成されたobserversを返す
}

document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObserver('Sidemenu')

  let currentObservers = []; // currentObserversをここで初期化
  barba.init({})

  barba.hooks.after((data) => {
    console.log('afterEnter start', currentObservers);
    currentObservers = autoSetupIntersectionObservers(); // 購読を開始
    console.log('afterEnter end', currentObservers);
  });

  barba.hooks.beforeLeave((data) => {
    console.log('beforeLeave start', currentObservers);
    currentObservers.forEach(observer => {
      disconnectedIntersectionObserver(observer); // 購読を停止
    });
    currentObservers = []; // currentObserversをクリア
    console.log('beforeLeave end', currentObservers);
  });
});
