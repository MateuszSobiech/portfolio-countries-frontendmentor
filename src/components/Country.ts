export class Country extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <article class="c-country">
      <img src="https://flagcdn.com/w320/de.png" alt="flag" />
      <div class="c-country__info">
        <p class="c-country__title">Germany</p>
        <p class="c-country__text">Population: <span>${(83240525).toLocaleString('en-US') || ''}</span></p>
        <p class="c-country__text">Region: <span>Europe</span></p>
        <p class="c-country__text">Capital: <span>Berlin</span></p>
      </div>
    </article
    `;
  }
}

window.customElements.define('c-country', Country);

let sample = [
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany', nativeName: { deu: { official: 'Bundesrepublik Deutschland', common: 'Deutschland' } } },
    flags: { png: 'https://flagcdn.com/w320/de.png', svg: 'https://flagcdn.com/de.svg' },
    population: 83240525,
    region: 'Europe',
    capital: ['Berlin'],
    tld: ['.de'],
    cca2: 'DE',
    ccn3: '276',
    cca3: 'DEU',
    cioc: 'GER',
    independent: true,
    status: 'officially-assigned',
    unMember: true,
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    idd: { root: '+4', suffixes: ['9'] },
    altSpellings: ['DE', 'Federal Republic of Germany', 'Bundesrepublik Deutschland'],
    subregion: 'Western Europe',
    languages: { deu: 'German' },
    latlng: [51.0, 9.0],
    landlocked: false,
    borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
    area: 357114.0,
    demonyms: { eng: { f: 'German', m: 'German' }, fra: { f: 'Allemande', m: 'Allemand' } },
    flag: '\uD83C\uDDE9\uD83C\uDDEA',
    maps: { googleMaps: 'https://goo.gl/maps/mD9FBMq1nvXUBrkv6', openStreetMaps: 'https://www.openstreetmap.org/relation/51477' },
    gini: { '2016': 31.9 },
    fifa: 'GER',
    car: { signs: ['DY'], side: 'right' },
    timezones: ['UTC+01:00'],
    continents: ['Europe'],
    coatOfArms: { png: 'https://mainfacts.com/media/images/coats_of_arms/de.png', svg: 'https://mainfacts.com/media/images/coats_of_arms/de.svg' },
    startOfWeek: 'monday',
    capitalInfo: { latlng: [52.52, 13.4] },
    postalCode: { format: '#####', regex: '^(\\d{5})$' },
  },
];
