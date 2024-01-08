import {h, createApp} from "vue"
class VueIsland extends HTMLElement {
  constructor() {
    super()
    this.vueInstance = null
  }

  connectedCallback() {
    this.name = this.dataset.name
    this.loadVueInstance()
  }

  kebabToPascalCase(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

  async loadVueInstance() {
    const props = this.initalProps()
    if (!this.vueInstance) {
      const componentName = this.kebabToPascalCase(this.name);
      const componentModule = await import(`../components/${componentName}.vue`);
      const AsyncComponent = componentModule.default;

      this.vueInstance = createApp({
        render() {
          return h(AsyncComponent, props);
        }
      });
      this.vueInstance.mount(this);
    }
  }

  initalProps() {
    return JSON.parse(this.dataset.initProps || '{}');
  }

  unloadVueInstance() {
    if (this.vueInstance) {
      this.vueInstance.unmount();
      this.vueInstance = null;
    }
  }

  disconnectedCallback() {
    this.unloadVueInstance();
  }
}

customElements.define("vue-island", VueIsland)
