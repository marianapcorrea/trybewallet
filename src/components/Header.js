import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionGetTotal } from '../redux/actions';
import TitleContainer from './TitleContainer';
import styles from './Header.module.css';

class Header extends Component {
  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    return prevProps.expenses !== expenses && this.getTotal();
  }

  getTotal = () => {
    const { getTotalExpenses, expenses = [] } = this.props;
    const total = expenses ? expenses
      .reduce((acc, curr) => {
        const currencyValue = this.getCurrencyValue(curr);
        return acc + (currencyValue.ask * curr.value);
      }, 0).toFixed(2)
      : 0;
    getTotalExpenses(total);
  };

  getCurrencyValue = ({ currency, exchangeRates }) => Object.values(exchangeRates)
    .find((rate) => rate.code === currency);

  render() {
    const { email, totalExpenses } = this.props;

    return (
      <header className={ styles.headerContainer }>
        <TitleContainer />
        <div className={ styles.totalContainer }>
          <p>
            Despesas Totais:
            <span className={ styles.totalField }>R$</span>
            <span data-testid="total-field" className={ styles.totalField }>
              {totalExpenses}
            </span>
            <span
              data-testid="header-currency-field"
              className={ styles.totalField }
            >
              {' '}
              BRL
            </span>
          </p>
        </div>
        <span data-testid="email-field" className={ styles.emailField }>{email}</span>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  totalExpenses: wallet.totalExpenses,
  cambio: wallet.currencies,
  expenses: wallet.expenses,
  exchangeRate: wallet.exchangeRate,
});

const mapDispatchToProps = (dispatch) => ({
  getTotalExpenses: (totalExpenses) => dispatch(actionGetTotal(totalExpenses)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getTotalExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
