import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;

    return (
      <header>
        <h1>Wallet</h1>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">Despesas Totais: 0</span>
        <span data-testid="header-currency-field">Câmbio: BRL</span>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  totalExpenses: wallet.totalExpenses,
  cambio: wallet.currencies,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
