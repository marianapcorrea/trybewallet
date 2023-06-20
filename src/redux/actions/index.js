import { fetchCurrencies } from '../../services/economyAPI';

// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_TOTAL = 'GET_TOTAL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITION = 'SAVE_EDITION';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const actionFetchCurrencies = () => async (dispatch) => {
  const currencies = await fetchCurrencies();
  dispatch(receiveCurrencies(currencies));
};

export const actionAddExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const actionGetTotal = (totalExpenses) => ({
  type: GET_TOTAL,
  totalExpenses,
});

export const actionDeleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const actionEditExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const actionSaveEditions = (expense) => ({
  type: SAVE_EDITION,
  expense,
});
