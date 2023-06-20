import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import { actionAddExpense } from '../redux/actions';

describe('Header', () => {
  const emailId = 'email-field';
  const totalId = 'total-field';
  const currencyId = 'header-currency-field';

  it('tests if the email field is in the component.', () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      user: {
        email: 'email@example.com',
      },
    };

    renderWithRouterAndRedux(<Header />, { initialEntries, initialState });

    const emailField = screen.getByTestId(emailId);

    expect(emailField).toBeInTheDocument();
    expect(emailField.innerHTML).toBe('email@example.com');
  });

  it('tests if the total field is in the component.', () => {
    renderWithRouterAndRedux(<Header />);

    const totalField = screen.getByTestId(totalId);
    expect(totalField).toBeInTheDocument();
  });

  it('tests if the currency field is in the component.', () => {
    renderWithRouterAndRedux(<Header />);

    const currencyField = screen.getByTestId(currencyId);
    expect(currencyField).toBeInTheDocument();
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

  it.skip('expects to dispatch the action "actionAddExpense" when the addExpense button is called', () => {
    const mockDispatch = jest.fn();
    jest.spyOn(useDispatch).mockReturnValue(mockDispatch);

    renderWithRouterAndRedux(<WalletForm />);

    act(() => {
      userEvent.click(screen.getByText('Adicionar despesa'));
    });

    expect(mockDispatch).toHaveBeenCalledWith(actionAddExpense());
  });
});
