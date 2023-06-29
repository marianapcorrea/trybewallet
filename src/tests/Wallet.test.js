import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import App from '../App';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import { actionAddExpense } from '../redux/actions';
import mockData from './helpers/mockData';

describe('Header', () => {
  const emailId = 'email-field';
  const totalId = 'total-field';
  const currencyId = 'header-currency-field';

  const initialEntries = ['/carteira'];
  const initialState = {
    user: {
      email: 'email@example.com',
    },
    wallet: {
      totalExpenses: 100,
    },
  };
  it('tests if the email field is in the component.', () => {
    renderWithRouterAndRedux(<Header />, { initialEntries, initialState });

    const emailField = screen.getByTestId(emailId);

    expect(emailField).toBeInTheDocument();
    expect(emailField.innerHTML).toBe('email@example.com');
  });

  it('tests if the total field is in the component.', () => {
    renderWithRouterAndRedux(<Header />, { initialEntries, initialState });

    const totalField = screen.getByTestId(totalId);
    expect(totalField).toBeInTheDocument();
    expect(totalField.innerHTML).toBe('100');
  });

  it('tests if the currency field is in the component.', () => {
    renderWithRouterAndRedux(<Header />);

    const currencyField = screen.getByTestId(currencyId);
    expect(currencyField).toBeInTheDocument();
    expect(currencyField.innerHTML).toBe('Câmbio: BRL');
  });
});

describe('WalletForm', () => {
  const valueId = 'value-input';
  const descriptionId = 'description-input';
  const currencyId = 'currency-input';
  const methodId = 'method-input';
  const tagId = 'tag-input';
  it('expect the component to have inputfields for value, description, currency, method and tag', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByTestId(valueId);
    const descriptionInput = screen.getByTestId(descriptionId);
    const currencyInput = screen.getByTestId(currencyId);
    const methodInput = screen.getByTestId(methodId);
    const tagInput = screen.getByTestId(tagId);

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('test if the value of value input field is \'30\'', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByTestId(valueId);

    act(() => {
      userEvent.type(valueInput, '30');
    });

    expect(valueInput.value).toBe('30');
  });

  it('expects to dispatch the action "actionAddExpense" when the addExpense button is called', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });

    await waitFor(() => {
      expect(screen.getByTestId(currencyId)).toHaveTextContent('USD');
    });

    const valueInput = screen.getByTestId(valueId);
    const descriptionInput = screen.getByTestId(descriptionId);
    const currencyInput = screen.getByTestId(currencyId);
    const methodInput = screen.getByTestId(methodId);
    const tagInput = screen.getByTestId(tagId);
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.type(valueInput, '100');
      userEvent.type(descriptionInput, 'One hundred');
      userEvent.click(addExpenseButton);
      userEvent.selectOptions(currencyInput, 'ARS');
      userEvent.selectOptions(methodInput, 'Dinheiro');
      userEvent.selectOptions(tagInput, 'Lazer');
    });

    expect(screen.getByRole('option', { name: 'ARS' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Cartão de crédito' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Lazer' }).selected).toBe(true);
  });
});
