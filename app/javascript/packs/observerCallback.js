import { loadAndMountVueApp } from "./vueAppHandler";

let hasBeenLoaded = false;  // 追加: ロードが完了したかの状態を追跡するフラグ

export function onboardingObserverCallback(componentName, entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasBeenLoaded) { // 追加: フラグの確認を追加
      loadAndMountVueApp(componentName);
      hasBeenLoaded = true;  // 追加: ロードが完了したときにフラグを更新
      observer.disconnect(); // 追加: 監視を停止
    }
  });
}
