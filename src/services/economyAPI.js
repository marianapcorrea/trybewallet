const fetchCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currenciesArray = Object.keys(data)
    .filter((currency) => currency !== 'USDT');

  return currenciesArray;
};

export default fetchCurrencies;
