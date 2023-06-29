import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';
import handleValidation from '../services/validateForm';
import styles from './Login.module.css';
import TitleContainer from '../components/TitleContainer';

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
      <section className={ styles.container }>
        <TitleContainer />
        <form className={ styles.form }>
          <input
            className={ styles.input }
            type="text"
            data-testid="email-input"
            placeholder="my-email@email.com"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            className={ styles.input }
            type="password"
            data-testid="password-input"
            placeholder="******"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            className={ styles.sendButton }
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
