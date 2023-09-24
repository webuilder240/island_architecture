import { createApp } from 'vue';

let hasBeenLoaded = false;  // 追加: ロードが完了したかの状態を追跡するフラグ
const loadAndMountVueApp = async (componentName) => {
  try {
    const { default: Component } = await import(`../${componentName}.vue`);
    const appInstance = createApp(Component);
    appInstance.mount(`#${componentName.toLowerCase()}-container`);
  } catch (error) {
    console.error(`Failed to load ${componentName}.vue:`, error);
  }
};

const onboardingObserverCallback = (entries, observer, componentName) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasBeenLoaded) { // 追加: フラグの確認を追加
      loadAndMountVueApp('App');
      hasBeenLoaded = true;  // 追加: ロードが完了したときにフラグを更新
      observer.disconnect(); // 追加: 監視を停止
    }
  });
};

export { loadAndMountVueApp, onboardingObserverCallback };
