let observer;

const disconnectObserver = () => {
  if (observer) {
    observer.disconnect();
  }
};

const setupIntersectionObserver = (componentName, callback) => {
  console.log(`setupIntersectionObserver: ${componentName}`)
  const target = document.querySelector(`#${componentName.toLowerCase()}-container`);
  if (target) {
    disconnectObserver();

    observer = new IntersectionObserver(callback);
    observer.observe(target);
  }
};

const initializeEvents = (componentName, callback) => {
  // DOMContentLoadedイベントが発生したら関数を実行
  document.addEventListener('DOMContentLoaded', () => {
    setupIntersectionObserver(componentName, callback);
  });

  // ページ離脱イベントの監視
  window.addEventListener('beforeunload', disconnectObserver);

  // Turboによるページ遷移のイベントを購読
  document.addEventListener('turbo:before-visit', disconnectObserver);
  document.addEventListener('turbo:load', () => {
    setupIntersectionObserver(componentName, callback);
  });
};

export { initializeEvents, disconnectObserver };
