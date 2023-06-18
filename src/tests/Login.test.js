import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import Login from '../pages/Login';
import App from '../App';

describe('Login', () => {
  const validEmail = 'my-email@example.com';
  const invalidEmail = 'my-email.example.com';
  const validPassword = '123456';
  const invalidPassword = '12345';
  const emailId = 'email-input';
  const passwordId = 'password-input';

  it('tests if there are an input field type text.', () => {
    renderWithRouterAndRedux(<Login />);

    const textInput = screen.getByTestId(emailId);

    expect(textInput).toBeInTheDocument();
  });

  it('tests if there are an input field type password.', () => {
    renderWithRouterAndRedux(<Login />);

    const passwordInput = screen.getByTestId(passwordId);

    expect(passwordInput).toBeInTheDocument();
  });

  it('tests if there are a button in the Login page and if the button is disabled.', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('expect the button to be enabled when the email is valid and the password have lenght > 6', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button');
    const textInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);

    act(() => {
      userEvent.type(textInput, validEmail);
      userEvent.type(passwordInput, validPassword);
    });

    expect(button).not.toBeDisabled();
  });

  it('expect the button to be disabled with an invalid email', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button');
    const textInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);

    act(() => {
      userEvent.type(textInput, invalidEmail);
      userEvent.type(passwordInput, validPassword);
    });

    expect(button).toBeDisabled();
  });

  it('expect the button to be disabled with a password with a lenght smaller then 6', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button');
    const textInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);

    act(() => {
      userEvent.type(textInput, validEmail);
      userEvent.type(passwordInput, invalidPassword);
    });

    expect(button).toBeDisabled();
  });

  it('tests if the path "/carteira" is rendered when the button is clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');
    const textInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);

    act(() => {
      userEvent.type(textInput, validEmail);
      userEvent.type(passwordInput, validPassword);
      userEvent.click(button);
    });

    expect(history.location.pathname).toBe('/carteira');
  });
});
