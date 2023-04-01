interface ICountry {
  flags: { png: string; svg: string; alt: string };
  name: { common: string; nativeName: {} };
  population: number;
  region: string;
  capital: string[];
  subregion: string;
  tld: string[];
  currencies: {};
  languages: {};
  borders: string[];
}
