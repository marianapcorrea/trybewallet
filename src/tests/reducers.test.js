import { actionAddExpense, actionDeleteExpense, actionEditExpense, actionSaveEditions, receiveCurrencies } from '../redux/actions';
import wallet from '../redux/reducers/wallet';
import mockData from './helpers/mockData';

describe('reducers - actions none, receiveCurrencies,  actionAddExpense', () => {
  const initialState = {
    currencies: [],
    expenses: [],
    idToEdit: 0,
    totalExpenses: 0,
    inEdition: false,
  };

  it('should return the correct initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = wallet(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return the updated state', () => {
    const newState = {
      currencies: [],
      expenses: [100],
      idToEdit: 0,
      inEdition: false,
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

describe('reducers - actions actionDeleteExpense, actionEditExpense and actionSaveEditions', () => {
  const initialState = {
    currencies: [],
    expenses: [{ id: 0, value: 100 }, { id: 1, value: 200 }, { id: 2, value: 300 }],
    idToEdit: 0,
    inEdition: false,
    totalExpenses: 0,
  };
  it('should return the updated state after delete expense.', () => {
    const newState = {
      currencies: [],
      expenses: [{ id: 0, value: 100 }, { id: 2, value: 300 }],
      idToEdit: 0,
      inEdition: false,
      totalExpenses: 0,
    };
    const state = wallet(initialState, actionDeleteExpense(1));

    expect(state).toEqual(newState);
  });
  it('should return inEdition === true', () => {
    const state = wallet(initialState, actionEditExpense(1));

    expect(state.inEdition).toBe(true);
  });
  it('should save the edited state after click.', () => {
    const editedExpense = { id: 1, value: 200 };

    const state = wallet(initialState, actionSaveEditions(editedExpense));

    const expenses = [
      { id: 0, value: 100 },
      { id: 1, value: 200 },
      { id: 2, value: 300 },
    ];

    expect(state.inEdition).toBe(false);
    expect(state.expenses).toEqual(expenses);
  });
});
