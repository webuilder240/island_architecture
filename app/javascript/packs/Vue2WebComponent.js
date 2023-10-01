import Vue from 'vue';

class Vue2WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.observer = null;
    this.vueInstance = null;
  }

  connectedCallback() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadVueInstance();
        } else {
          this.unloadVueInstance();
        }
      });
    }, options);

    this.observer.observe(this);
  }

  kebabToPascalCase(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

  async loadVueInstance() {
    if (!this.vueInstance) {
      // カスタムエレメントの名前を元にVueコンポーネントを特定
      const componentName = this.kebabToPascalCase(this.localName);
      const componentModule = await import(`./components/${componentName}.vue`);
      const AsyncComponent = Vue.extend(componentModule.default);

      this.vueInstance = new Vue({
        render: h => h(AsyncComponent)
      }).$mount();
      this.shadowRoot.appendChild(this.vueInstance.$el);
    }
  }

  unloadVueInstance() {
    if (this.vueInstance) {
      this.vueInstance.$destroy();
      this.vueInstance = null;
    }
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.unloadVueInstance();
  }
}

export function defineVue2Element(tagName) {
  class DynamicClass extends Vue2WebComponent {}
  customElements.define(tagName, DynamicClass);
  return DynamicClass;
}
// customElements.define('vue2-async-web-component', Vue2WebComponent);
