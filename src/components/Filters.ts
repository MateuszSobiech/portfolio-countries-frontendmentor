class Filters extends HTMLElement {
  handleInputChange: (event: Event) => void;
  handleSelectChange: (event: Event) => void;

  constructor() {
    super();

    this.handleInputChange = () => {
      console.log('input change');
    };

    this.handleSelectChange = () => {
      console.log('select change');
    };
  }

  get input() {
    return this.querySelector<HTMLInputElement>('.c-filters__input');
  }

  get select() {
    return this.querySelector<HTMLSelectElement>('.c-filters__select');
  }

  connectedCallback() {
    this.render();

    this.input?.addEventListener('input', this.handleInputChange);
    this.select?.addEventListener('input', this.handleSelectChange);
  }

  disconnectedCallback() {
    this.input?.removeEventListener('input', this.handleInputChange);
    this.select?.removeEventListener('input', this.handleSelectChange);
  }

  render() {
    this.innerHTML = `
      <section class="c-filters">
        <div style="position: relative">
          <input class="c-filters__input" placeholder="Search for a country..." />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <select class="c-filters__select">
          <option value="all">Filter by Region</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </section>
      `;
  }
}

window.customElements.define('c-filters', Filters);
