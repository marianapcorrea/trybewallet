import { fetchCurrenciesObjects } from '../services/economyAPI';
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

  it('deve retornar os dados da API corretamente', async () => {
    const result = await fetchCurrenciesObjects();

    expect(result).toEqual(mockData);
  });
});
