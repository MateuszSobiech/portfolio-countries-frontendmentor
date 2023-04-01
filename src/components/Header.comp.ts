class Header extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.handleThemeChange);

    this.render();
  }

  // Listeners
  handleThemeChange = ({ target }: Event & { target: HTMLButtonElement }) => {
    if (!target.closest('.c-header__button')) return;

    document.body.classList.toggle('dark');
  };

  // Renderers
  render = () => {
    this.innerHTML = `
    <header class="c-header">
      <h1><a href="#/">Where in the world?</a></h1>
      <button class="c-header__button"><i class="fa-solid fa-moon"></i> Dark Mode</button>
    </header>`;
  };
}

customElements.define('c-header', Header);
