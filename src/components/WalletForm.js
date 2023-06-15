import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddExpense, actionFetchCurrencies } from '../redux/actions';
import { fetchCurrenciesObjects } from '../services/economyAPI';

const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const resetState = {
  value: '',
  description: '',
  currency: 'USD',
  method: methods[0],
  tag: tags[0],
};

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: methods[0],
    tag: tags[0],
    exchangeRates: [],
  };

  componentDidMount() {
    const { receiveCurrencies } = this.props;
    receiveCurrencies();
  }

  handleInputChange = ({ target }) => {
    const { name, value: valueName } = target;
    this.setState({
      [name]: valueName,
    });
  };

  handleClick = async () => {
    let { expenses } = this.props;
    const { addExpense } = this.props;
    const { id } = this.state;
    const exchangeRates = await fetchCurrenciesObjects();

    expenses = {
      ...this.state,
      exchangeRates,
      id,
    };
    addExpense(expenses);
    this.setState((prevState) => ({
      ...resetState,
      id: prevState.id + 1,
      exchangeRates,
    }));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <main>
        <h2>Adicionar</h2>
        <form>
          <div>
            <label htmlFor="value">Despesa:</label>
            <input
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleInputChange }
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleInputChange }
            />
          </div>
          <div>
            <label htmlFor="currency">Moeda:</label>
            <select
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleInputChange }
            >
              currencyItem
              {
                currencies
            && currencies.map((currencyItem) => (
              <option
                value={ currencyItem }
                key={ currencyItem }
              >
                {currencyItem }
              </option>))
              }
            </select>
          </div>
          <div>
            <label htmlFor="method">Metodo de pagamento:</label>
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleInputChange }
            >
              { methods.map((methodItem) => (
                <option
                  value={ methodItem }
                  key={ methodItem }
                >
                  {methodItem}
                </option>))}
            </select>
          </div>
          <div>
            <label htmlFor="tag">Categoria:</label>
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleInputChange }
            >
              { tags.map((tagItem) => (
                <option
                  value={ tagItem }
                  key={ tagItem }
                >
                  {tagItem}
                </option>))}
            </select>
          </div>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (({ wallet: { currencies, expenses, totalExpenses } }) => (
  {
    currencies,
    expenses,
    totalExpenses,
  }));

const mapDispatchToProps = (dispatch) => ({
  receiveCurrencies: () => dispatch(actionFetchCurrencies()),
  addExpense: (expenses) => dispatch(actionAddExpense(expenses)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape()),
  expenses: PropTypes.arrayOf(PropTypes.shape()),
  receiveCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
