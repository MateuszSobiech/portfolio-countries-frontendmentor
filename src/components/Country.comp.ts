export class Country extends HTMLElement {
  country: ICountry;

  constructor(country: ICountry) {
    super();

    this.country = country;
  }

  connectedCallback() {
    if (!this.country) {
      alert('Problem with country data.');
      return;
    }

    this.render();
  }

  render = () => {
    const {
      flags: { png = '', alt = 'flag image' },
      name: { common = '' },
      population = 0,
      region = '',
      capital = '',
    } = this.country;

    this.dataset.name = common;

    const populationValue = population?.toLocaleString('en-US') || 'No informations';
    this.innerHTML = `
    <article class="c-country">
      <img src="${png}" alt="${alt}" loading="lazy" />
      <div class="c-country__info">
        <p class="c-country__title">${common}</p>
        <p class="c-country__text">Population: <span>${populationValue}</span></p>
        <p class="c-country__text">Region: <span>${region}</span></p>
        <p class="c-country__text">Capital: <span>${capital}</span></p>
      </div>
    </article`;
  };
}

customElements.define('c-country', Country);
