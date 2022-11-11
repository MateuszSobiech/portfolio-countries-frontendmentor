import { CountryService } from '../services/CountryService';

class CountryDetails extends HTMLElement {
  handleBorderClick: (event: Event) => void;

  constructor() {
    super();

    this.handleBorderClick = ({ target }) => {
      if (target instanceof HTMLButtonElement && target.closest('.p-country-details__borders')) {
        const { innerText } = target;

        CountryService.selectedCountry = innerText;
        this.dispatchEvent(new Event('hashchange', { bubbles: true }));
      }
    };
  }

  connectedCallback() {
    this.render();

    this.addEventListener('click', this.handleBorderClick);
  }

  disconnectedCallback() {}

  async render() {
    const country: ICountry = await CountryService.getCountry();

    if (!country) {
      this.innerHTML = `
        <main class="p-country-details">
          <h2>Error, this country is not available</h2>
        </main>
      `;
      return;
    }

    const {
      flags: { png = '' },
      name: { common = '', nativeName },
      population = 0,
      region = '',
      capital,
      subregion = '',
      tld,
      currencies,
      languages,
      borders = [],
    } = country;

    const firstNative: string = (Object.values(nativeName)[0] as any)?.common || '';
    const formattedCurrencies: string = (Object.values(currencies) as any[]).map(({ name }) => name).join(', ') || '';
    const formattedLanguages: string = (Object.values(languages) as string[]).join(', ') || '';

    const borderNames: string[] = borders.length ? await this.getBorderNames(borders) : [];

    this.innerHTML = `
      <main class="p-country-details">
        <a href="#/" class="p-country-details__back-button"><i class="fa-solid fa-arrow-left-long"></i> Back</a>
        <article>
          <img src="${png}" alt="flag" />
          <div>
            <h2>${common}</h2>
            <p>Native Name: <span>${firstNative}</span></p>
            <p>Population: <span>${population?.toLocaleString('en-US')}</span></p>
            <p>Region: <span>${region}</span></p>
            <p>Sub Region: <span>${subregion}</span></p>
            <p>Capital: <span>${capital.join(', ') || ''}</span></p>
            
            <p class="p-country-details--mt48">Top Level Domain: <span>${tld.join(', ') || ''}</span></p>
            <p>Currencies: <span>${formattedCurrencies}</span></p>
            <p>Languages: <span>${formattedLanguages}</span></p>

            <h3 class="p-country-details--mt48">Border Countries:</h3>
            <div class="p-country-details__borders">${borderNames.join('')}</div>
          </div>
        </article>
      </main>
    `;
  }

  async getBorderNames(borders: string[]) {
    const countries = await CountryService.getBorderNames(borders.join());
    return countries.map(({ name: { common } }) => `<button>${common}</button>`);
  }
}
window.customElements.define('p-country-details', CountryDetails);
