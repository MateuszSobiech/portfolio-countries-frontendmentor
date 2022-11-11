import { Country } from '../components/Country';

export class CountryService {
  static countries: ICountry[];

  static async fetchCountries(endpoint: string) {
    const countries: ICountry[] = await (await fetch(`https://restcountries.com/v3.1${endpoint}`)).json();
    this.countries = countries;
  }

  static render(countries: ICountry[] = null) {
    const container = document.querySelector<HTMLDivElement>('p-index .p-index__container');

    if (!container) return;

    if ((this.countries as any).status === 404) {
      container.innerHTML = 'No results';
      return;
    }

    container.innerHTML = '';
    (countries || this.countries).forEach((country) => {
      container.append(new Country(country));
    });
  }
}
