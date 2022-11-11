import { CountryService } from '../services/CountryService';

class Filters extends HTMLElement {
  handleInputChange: () => void;
  handleSelectChange: () => void;

  constructor() {
    super();

    this.handleInputChange = async () => {
      const { value } = this.input;
      const endpoint = value ? `/name/${value}` : '/all';
      await CountryService.fetchCountries(endpoint);

      this.handleSelectChange();
    };

    this.handleSelectChange = () => {
      const { value } = this.select;
      let filteredCountries: ICountry[];

      if (value === 'all') {
        filteredCountries = CountryService.countries;
      } else {
        filteredCountries = CountryService.countries.filter(({ region }) => region === value);
      }

      CountryService.render(filteredCountries);
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
