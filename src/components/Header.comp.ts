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
      <header class="c-header">
        <h1><a href="#/">Where in the world?</a></h1>
        <button class="c-header__button"><i class="fa-solid fa-moon"></i> Dark Mode</button>
      </header>
    `;
  }
}

window.customElements.define('c-header', Header);
