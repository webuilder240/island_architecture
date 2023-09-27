import { createApp } from 'vue';

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
    if (entry.isIntersecting) { // 追加: フラグの確認を追加
      loadAndMountVueApp(componentName);
      observer.disconnect(); // 追加: 監視を停止
    }
  });
};

export { loadAndMountVueApp, onboardingObserverCallback };
