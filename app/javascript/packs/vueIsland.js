import {h, createApp, defineAsyncComponent} from "vue"
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
      // const AsyncComponent = defineAsyncComponent(() => import(`../components/${componentName}.vue`))

      const hasProps = (Object.keys(props).length > 0)
      if (hasProps) {
        this.vueInstance = createApp({
          render() {
            return h(AsyncComponent, props);
          }
        });
      } else {
        this.vueInstance = createApp({
          render() {
            return h(AsyncComponent);
          }
        });
      }

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
