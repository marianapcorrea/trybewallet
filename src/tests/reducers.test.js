import { actionAddExpense, receiveCurrencies } from '../redux/actions';
import wallet from '../redux/reducers/wallet';
import mockData from './helpers/mockData';

describe('reducers', () => {
  const initialState = {
    currencies: [],
    editor: false,
    expenses: [],
    idToEdit: 0,
    loading: false,
    totalExpenses: 0,
  };

  it('should return the correct initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = wallet(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return the updated state', () => {
    const newState = {
      currencies: [],
      editor: false,
      expenses: [100],
      idToEdit: 0,
      loading: false,
      totalExpenses: 0,
    };

    const state = wallet(initialState, actionAddExpense(100));

    expect(state).toEqual(newState);
  });

  it('should return the currencies', () => {
    const currencies = mockData;
    const state = wallet(initialState, receiveCurrencies(currencies));

    expect(state.currencies).toEqual(currencies);
  });
});
