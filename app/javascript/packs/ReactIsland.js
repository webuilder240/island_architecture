import { h, render } from 'preact';

class PreactWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.observer = null;
    this.preactRoot = null;
  }

  connectedCallback() {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadPreactInstance();
        }
      });
    }, options);

    this.observer.observe(this);
  }

  kebabToPascalCase(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

  async loadPreactInstance() {
    if (!this.preactRoot) {
      // カスタムエレメントの名前を元にPreactコンポーネントを特定
      const componentName = this.kebabToPascalCase(this.localName);
      const componentModule = await import(`../components/${componentName}.jsx`);
      const AsyncComponent = componentModule.default;

      this.preactRoot = render(h(AsyncComponent), this.shadowRoot);
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
  }

  unloadPreactInstance() {
    if (this.preactRoot) {
      render(null, this.shadowRoot, this.preactRoot);
      this.preactRoot = null;
    }
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.unloadPreactInstance();
  }
}

export function definePreactElement(tagName) {
  class DynamicClass extends PreactWebComponent {}
  customElements.define(tagName, DynamicClass);
  return DynamicClass;
}


definePreactElement("counter-app")
