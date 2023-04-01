import { getCountry, getBorderNames } from '../services/CountryService';

class CountryDetails extends HTMLElement {
  country: ICountry;

  async connectedCallback() {
    this.addEventListener('click', this.handleBorderClick);

    try {
      const name = this.getNameParam();
      this.country = await getCountry(name);
      this.render();
    } catch {
      this.renderError();
    }
  }

  // Listeners
  handleBorderClick = ({ target }: Event & { target: HTMLElement }) => {
    if (!target.matches('[borderButton]')) return;

    const { innerText: name } = target;
    location.hash = `#/country?name=${name}`;
  };

  // Helpers
  getNameParam = () => {
    const nameParam = location.hash.split('?')[1].split('=')[1];
    return nameParam;
  };

  getBorderNames = async (borders: string[]) => {
    const countries = await getBorderNames(borders.join());
    return countries.map(({ name: { common } }) => `<button borderButton >${common}</button>`);
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

    const borderNames: string[] = borders.length ? await this.getBorderNames(borders) : [];

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
              <p>Population: <span>${population?.toLocaleString('en-US')}</span></p>
              <p>Region: <span>${region}</span></p>
              <p>Sub Region: <span>${subregion}</span></p>
              <p>Capital: <span>${capital.join(', ') || ''}</span></p>
            </div>

            <div class="p-country-details--mt48 md:info-second">
              <p>Top Level Domain: <span>${tld.join(', ') || ''}</span></p>
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
