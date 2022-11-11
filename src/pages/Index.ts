import { CountryService } from './../services/CountryService';

class Index extends HTMLElement {
  showCountryDetails: (event: Event) => void;

  constructor() {
    super();

    this.showCountryDetails = ({ target }) => {
      if (target instanceof HTMLElement && target.closest('c-country')) {
        const component = target.closest('c-country') as HTMLElement;
        const { name } = component.dataset;

        CountryService.selectedCountry = name;
        location.hash = '#/country';
      }
    };
  }

  async connectedCallback() {
    this.addEventListener('click', this.showCountryDetails);
    this.render();

    await CountryService.fetchCountries('/all');
    CountryService.render();
  }

  disconnectedCallback() {}

  render() {
    this.innerHTML = `
      <main class="p-index">
        <c-filters></c-filters>
        <div class="p-index__container"></div>
      </main>
    `;
  }
}

window.customElements.define('p-index', Index);
