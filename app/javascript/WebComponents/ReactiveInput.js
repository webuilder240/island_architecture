export default class ReactiveInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    // Shadow DOM内のslot要素を取得
    this.slotElement = this.shadowRoot.querySelector('slot');

    // slotの内容が変わったときに更新
    this.slotElement.addEventListener('slotchange', this.setupInput.bind(this));

    this.setupInput();  // 初期セットアップ
  }

  setupInput() {
    // Light DOM内のinput要素とdiv要素を取得
    this.inputElement = this.querySelector('input');
    this.displayElement = this.querySelector('div');

    if (this.inputElement && this.displayElement) {
      // 以前のイベントリスナをクリア（冪等性を保つため）
      this.inputElement.removeEventListener('input', this.onInput);

      // 新しいイベントリスナを設定
      this.onInput = () => {
        this.displayElement.textContent = this.inputElement.value;
      };

      this.inputElement.addEventListener('input', this.onInput);
      this.displayElement.textContent = this.inputElement.value;
    }
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener('input', this.onInput);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
  }
}

customElements.define('reactive-input', ReactiveInput);
