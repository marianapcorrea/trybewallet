import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionGetTotal } from '../redux/actions';
import TitleContainer from './TitleContainer';

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
      <header>
        <TitleContainer />
        <span data-testid="email-field">{email}</span>

        <p>
          Despesas Totais:
          R$
          <span data-testid="total-field">
            {totalExpenses}
          </span>
        </p>
        <span data-testid="header-currency-field">Câmbio: BRL</span>
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
