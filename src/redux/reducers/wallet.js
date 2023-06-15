import { RECEIVE_CURRENCIES, REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_FAILURE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    totalExpenses: 10,
    loading: false,
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      loading: true,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      loading: false,
      currencies: action.currencies,
    };
  case REQUEST_CURRENCIES_FAILURE:
    return {
      ...state,
      loading: false,
    };

  default:
    return state;
  }
};

export default wallet;
