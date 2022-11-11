interface ICountry {
  flags: { png: string; svg: string };
  name: { common: string; nativeName: {} };
  population: number;
  region: string;
  capital: string[];
}

let sample = [
  {
    flags: { png: 'https://flagcdn.com/w320/de.png', svg: 'https://flagcdn.com/de.svg' },
    name: { common: 'Germany', official: 'Federal Republic of Germany', nativeName: { deu: { official: 'Bundesrepublik Deutschland', common: 'Deutschland' } } },
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
