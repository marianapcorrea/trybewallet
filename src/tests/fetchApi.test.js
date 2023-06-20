import { fetchCurrencies, fetchCurrenciesObjects } from '../services/economyAPI';
import mockData from './helpers/mockData';

describe('fetchDataFromAPI', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    }));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('deve retornar os dados da API corretamente com a função fetchCurrenciesObjects', async () => {
    const result = await fetchCurrenciesObjects();

    expect(result).toEqual(mockData);
  });

  it('deve retornar os dados da API corretamente com a função fetchCurrencies', async () => {
    const mockArray = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];
    const result = await fetchCurrencies();

    expect(result).toEqual(mockArray);
  });
});
