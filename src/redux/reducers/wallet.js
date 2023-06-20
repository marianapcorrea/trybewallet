import {
  ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, GET_TOTAL,
  RECEIVE_CURRENCIES,
  SAVE_EDITION } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExpenses: 0,
  inEdition: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      loading: false,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case GET_TOTAL:
    return {
      ...state,
      totalExpenses: action.totalExpenses,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      inEdition: true,
      idToEdit: action.id,
    };

  case SAVE_EDITION:
    return {
      ...state,
      inEdition: false,
      expenses: [
        ...state.expenses.filter((expenseItem) => (expenseItem.id === action.expense.id
          ? action.expense : expenseItem)).sort((a, b) => a.id - b.id),
      ],

    };

  default:
    return state;
  }
};

export default wallet;
