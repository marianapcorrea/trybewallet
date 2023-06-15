import fetchCurrencies from '../../services/economyAPI';

// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

const requestCurrenciesFailure = () => ({
  type: REQUEST_CURRENCIES_FAILURE,
});

export const actionFetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const currencies = await fetchCurrencies();
    dispatch(receiveCurrencies(currencies));
  } catch (error) {
    dispatch(requestCurrenciesFailure());
  }
};
