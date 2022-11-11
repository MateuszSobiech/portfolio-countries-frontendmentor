class Index extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  render() {
    this.innerHTML = `
      <main class="p-index">
        <c-filters></c-filters>
        <div class="p-index__container">
        <c-country></c-country>
        </div>
      </main>
    `;
  }
}

window.customElements.define('p-index', Index);
