import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';
import handleValidation from '../services/validateForm';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { email, password } = this.state;
    this.setState({
      [name]: value,
    });
    const disabled = !handleValidation(email, password);
    this.setState({ disabled });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <form>
          <input
            type="text"
            data-testid="email-input"
            placeholder="my-email@email.com"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="******"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
