import { Country } from '../components/Country';
import { CountryService } from './../services/CountryService';

class Index extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
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
