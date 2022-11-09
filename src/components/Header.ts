class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    this.querySelector('button')?.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }

  render() {
    this.innerHTML = `
      <header class="header">
        <h1 class="header__title">Where in the world?</h1>
        <button class="header__button"><i class="fa-solid fa-moon"></i> Dark Mode</button>
      </header>
    `;
  }
}

window.customElements.define('c-header', Header);
