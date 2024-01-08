import Vue from 'vue';

class Vue2Island extends HTMLElement {
  constructor() {
    super();
    this.vueInstance = null;
  }

  connectedCallback() {
    this.name = this.dataset.name
    this.mountMode = this.dataset.mountMode === 'true'
    this.loadVueInstance();
  }

  kebabToPascalCase(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

  async loadVueInstance() {
    const props = this.initalProps()
    const hasProps = (Object.keys(props).length > 0)
    if (!this.vueInstance) {
      // カスタムエレメントの名前を元にVueコンポーネントを特定
      const componentName = this.kebabToPascalCase(this.name);
      const componentModule = await import(`../components/${componentName}.vue`);
      const AsyncComponent = Vue.extend(componentModule.default);
      if (hasProps) {
        this.vueInstance = new Vue({
          render: h => h(AsyncComponent, {props: props}),
        }).$mount();
      } else {
        this.vueInstance = new Vue({
          render: h => h(AsyncComponent),
        }).$mount();
      }

      this.appendChild(this.vueInstance.$el);
    }
  }

  unloadVueInstance() {
    if (this.vueInstance) {
      this.vueInstance.$destroy();
      this.vueInstance = null;
    }
  }

  initalProps() {
    return JSON.parse(this.dataset.initProps || '{}');
  }

  disconnectedCallback() {
    this.unloadVueInstance();
  }
}

customElements.define("vue2-island", Vue2Island)
