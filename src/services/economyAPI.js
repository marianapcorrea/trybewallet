export const fetchCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const filteredData = Object.keys(data)
    .filter((currency) => currency !== 'USDT');

  return filteredData;
};

export const fetchCurrenciesObjects = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};
