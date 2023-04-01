const API_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = async (endpoint: string): Promise<ICountry[]> => {
  const countries: ICountry[] = await (await fetch(`${API_URL}${endpoint}`)).json();

  if ((countries as any).status >= 400) throw new Error(`Error to fetch ${endpoint}`);

  return countries.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
};

export const getCountry = async (countryName: string): Promise<ICountry> => {
  const countries = await (await fetch(`${API_URL}/name/${countryName}`)).json();
  return countries.find(({ name: { common } }) => common === countryName);
};

export const getBorderNames = async (codes: string): Promise<ICountry[]> => {
  return await (await fetch(`${API_URL}/alpha?codes=${codes}`)).json();
};
