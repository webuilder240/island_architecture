import { loadAndMountVueApp } from "./vueAppHandler";

export function onboardingObserverCallback(componentName, entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) { // 追加: フラグの確認を追加
      loadAndMountVueApp(componentName);
      observer.disconnect(); // 追加: 監視を停止
    }
  });
}
