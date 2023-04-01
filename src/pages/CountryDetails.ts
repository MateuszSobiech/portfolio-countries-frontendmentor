import CountryService from '../services/CountryService';

class CountryDetails extends HTMLElement {
  country: ICountry;

  async connectedCallback() {
    this.addEventListener('click', this.handleBorderClick);

    try {
      const code = this.getCodeParam();

      this.country = await CountryService.fetchCountry(code);
      if (!this.country) throw new Error(`Can not find country for code: "${code}"`);

      this.render();
    } catch (error) {
      this.renderError();

      console.error(error);
    }
  }

  // Listeners
  handleBorderClick = ({ target }: Event & { target: HTMLElement }) => {
    if (!target.matches('[borderButton]')) return;

    const { code } = target.dataset;
    location.hash = `#/country?code=${code}`;
  };

  // Helpers
  getCodeParam = () => {
    const codeParam = location.hash.split('?')[1].split('=')[1];
    return codeParam;
  };

  getBorderNames = async (borders: string[]) => {
    const countries = await CountryService.fetchBorderNames(borders.join());
    return countries.map(({ cca2, name: { common } }) => {
      return `<button borderButton data-code="${cca2}">${common}</button>`;
    });
  };

  // Renderers
  renderError = () => {
    this.innerHTML = `
    <main class="p-country-details">
      <h2>Error, this country is not available</h2>
    </main>`;
  };

  render = async () => {
    const {
      flags: { png = '', alt = 'Flag image' },
      name: { common = '', nativeName = {} },
      population = 0,
      region = '',
      capital = [],
      subregion = '',
      tld = [],
      currencies = {},
      languages = {},
      borders = [],
    } = this.country;

    const firstNative: string = (Object.values(nativeName)[0] as any)?.common || '';

    const formattedCurrencies: string =
      (Object.values(currencies) as any[]).map(({ name }) => name).join(', ') || '';

    const formattedLanguages: string = Object.values(languages).join(', ') || '';

    const borderNames: string[] = borders.length
      ? await this.getBorderNames(borders)
      : ['<span style="font-size: 14px; line-height: 2;">No results</span>'];

    const populationValue = population?.toLocaleString('en-US') || 'No informations';
    this.innerHTML = `
    <main class="p-country-details">
      <a href="#/" class="p-country-details__back-button"><i class="fa-solid fa-arrow-left-long"></i> Back</a>

      <article>
        <img src="${png}" alt="${alt}" />

        <div>
          <h2>${common}</h2>
          
          <div class="md:info">
            <div>
              <p>Native Name: <span>${firstNative}</span></p>
              <p>Population: <span>${populationValue}</span></p>
              <p>Region: <span>${region}</span></p>
              <p>Sub Region: <span>${subregion}</span></p>
              <p>Capital: <span>${capital.join(', ')}</span></p>
            </div>

            <div class="p-country-details--mt48 md:info-second">
              <p>Top Level Domain: <span>${tld.join(', ')}</span></p>
              <p>Currencies: <span>${formattedCurrencies}</span></p>
              <p>Languages: <span>${formattedLanguages}</span></p>
            </div>
          </div>

          <div class="p-country-details--mt48 md:borders">
            <h3><div style="width: max-content;">Border Countries:</div></h3>
            <div class="p-country-details__borders">${borderNames.join('')}</div>
          </div>
        </div>
      </article>
    </main>`;
  };
}

customElements.define('p-country-details', CountryDetails);
