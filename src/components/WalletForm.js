import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddExpense, actionFetchCurrencies,
  actionSaveEditions } from '../redux/actions';
import { fetchCurrenciesObjects } from '../services/economyAPI';

const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const resetedState = {
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

  findValuesToEdit = () => {
    const { expenses, idToEdit } = this.props;
    return expenses.find((expense) => expense.id === idToEdit);
  };

  handleEditClick = () => {
    const { saveEditions } = this.props;
    const expense = this.findValuesToEdit();
    const { value, description, currency, method, tag } = this.state;

    expense.value = value;
    expense.description = description;
    expense.currency = currency;
    expense.method = method;
    expense.tag = tag;
    saveEditions(expense);

    this.setState({ ...resetedState });
  };

  handleInputChange = ({ target }) => {
    const { name, value: valueName } = target;
    this.setState({
      [name]: valueName,
    });
  };

  handleAddClick = async () => {
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
      ...resetedState,
      id: prevState.id + 1,
      exchangeRates,
    }));
  };

  render() {
    const { currencies, inEdition } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <main>
        <h2>{!inEdition ? 'Adicionar' : 'Editar'}</h2>
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
          <button
            type="button"
            onClick={ !inEdition ? this.handleAddClick : this.handleEditClick }
          >
            {!inEdition ? 'Adicionar despesa' : 'Editar Despesa'}

          </button>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (({ wallet: {
  currencies, expenses, totalExpenses, inEdition, idToEdit } }) => (
  {
    currencies,
    expenses,
    totalExpenses,
    inEdition,
    idToEdit,
  }));

const mapDispatchToProps = (dispatch) => ({
  receiveCurrencies: () => dispatch(actionFetchCurrencies()),
  addExpense: (expenses) => dispatch(actionAddExpense(expenses)),
  saveEditions: (expenses) => dispatch(actionSaveEditions(expenses)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.shape()),
  receiveCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  saveEditions: PropTypes.func.isRequired,
  inEdition: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
