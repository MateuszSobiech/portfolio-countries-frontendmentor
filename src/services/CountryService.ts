class CountryService {
  static API_URL = 'https://restcountries.com/v3.1';

  static fetchCountries = async (): Promise<ICountry[]> => {
    const countries: ICountry[] = await (await fetch(`${this.API_URL}/all`)).json();

    if ((countries as any).status >= 400) throw new Error(`Error during fetchCountries()`);

    return countries.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
  };

  static fetchCountry = async (countryName: string): Promise<ICountry> => {
    const countries = await (await fetch(`${this.API_URL}/name/${countryName}`)).json();
    return countries.find(({ name: { common } }) => common === countryName);
  };

  static fetchBorderNames = async (codes: string): Promise<ICountry[]> => {
    return await (await fetch(`${this.API_URL}/alpha?codes=${codes}`)).json();
  };
}

export default CountryService;
