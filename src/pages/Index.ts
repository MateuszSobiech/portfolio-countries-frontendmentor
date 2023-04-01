import { Country } from '../components/Country.comp';
import CountryService from './../services/CountryService';

class Index extends HTMLElement {
  countries: ICountry[];

  get container() {
    return this.querySelector('.p-index__container');
  }

  async connectedCallback() {
    this.addEventListener('click', this.handleCountryShow);
    this.addEventListener('filtersChange', this.handleFiltersChange);

    this.render();

    try {
      this.countries = await CountryService.fetchCountries();
      this.renderCountries(this.countries);
    } catch (error) {
      this.container.textContent = 'No results';
    }
  }

  // Listeners
  handleCountryShow = ({ target }: Event & { target: HTMLElement }) => {
    const component = target.closest<HTMLElement>('c-country');
    if (!component) return;

    const { name } = component.dataset;
    location.hash = `#/country?name=${name}`;
  };

  handleFiltersChange = ({ detail: { input, select } }: CustomEvent<IFiltersValues>) => {
    let filteredCountries: ICountry[];

    filteredCountries = this.countries.filter(({ name: { common } }) => {
      return common.toLocaleLowerCase().includes(input.toLocaleLowerCase());
    });

    if (select !== 'all') {
      filteredCountries = filteredCountries.filter(({ region }) => region === select);
    }

    this.renderCountries(filteredCountries);
  };

  // Renderers
  render = () => {
    this.innerHTML = `
      <main class="p-index">
        <c-filters></c-filters>
        <div class="p-index__container"></div>
      </main>
    `;
  };

  renderCountries = (countries: ICountry[]) => {
    const container = this.container;

    container.innerHTML = '';
    countries.forEach((country) => {
      container.append(new Country(country));
    });
  };
}

customElements.define('p-index', Index);
