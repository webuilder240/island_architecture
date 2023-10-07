export default class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.getElementById("confirmButton").addEventListener("click", () => this.resolve(true));
  }

  resolve(value) {
    if (this.resolver) {
      this.resolver(value);
      if(document.body.contains(this)) {
        document.body.removeChild(this);
      }
    }
  }

  show(message) {
    this.shadowRoot.querySelector("#message").textContent = message;
    document.body.appendChild(this);
    return new Promise((resolve) => {
      this.resolver = resolve;
    });
  }

  render() {
    const style = `
      div {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 1px solid #ccc;
        padding: 10px;
        z-index: 1000;
      }
      button {
        margin: 5px;
      }
    `
    const html = `
      <p id="message"></p>
      <button id="confirmButton">OK</button>
    `
    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      <div>${html}</div>
    `;
  }
}
customElements.define('custom-alert', CustomAlert);
