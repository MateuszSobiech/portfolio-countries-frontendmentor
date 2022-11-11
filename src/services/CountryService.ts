import { Country } from '../components/Country.comp';

export class CountryService {
  static selectedCountry: string = '';
  static countries: ICountry[];

  static apiUrl: string = 'https://restcountries.com/v3.1';

  static async fetchCountries(endpoint: string) {
    const countries: ICountry[] = await (await fetch(`${this.apiUrl}${endpoint}`)).json();
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

  static async getCountry(): Promise<ICountry> {
    const searchCountry = this.selectedCountry || localStorage.getItem('selectedCountry') || 'Poland';
    localStorage.setItem('selectedCountry', searchCountry);

    const countries = await (await fetch(`${this.apiUrl}/name/${searchCountry}`)).json();
    return countries.find(({ name: { common } }) => common === searchCountry);
  }

  static async getBorderNames(codes: string): Promise<ICountry[]> {
    return await (await fetch(`${this.apiUrl}/alpha?codes=${codes}`)).json();
  }
}
