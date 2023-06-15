import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrencies } from '../redux/actions';

const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
class WalletForm extends Component {
/*   state = {
    value: '',
    description: '',
    currency: '',
    method: methods[0],
    tag: tags[0],
  };
 */
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

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <div>
          <label htmlFor="value">Despesa:</label>
          <input
            type="text"
            name="value"
            data-testid="value-input"
            onChange={ this.handleInputChange }
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleInputChange }
          />
        </div>
        <div>
          <label htmlFor="currency">Moeda:</label>
          <select name="currency" data-testid="currency-input">
            {
              currencies
            && currencies.map((currencyItem) => (
              <option
                value={ currencyItem }
                key={ currencyItem }
              >
                {currencyItem}
              </option>))
            }
          </select>
        </div>
        <div>
          <label htmlFor="method">Metodo de pagamento:</label>
          <select name="method" data-testid="method-input">
            { methods.map((method) => (
              <option
                value={ method }
                key={ method }
              >
                {method}
              </option>))}
          </select>
        </div>
        <div>
          <label htmlFor="tag">Categoria:</label>
          <select name="tag" data-testid="tag-input">
            { tags.map((tag) => (
              <option
                value={ tag }
                key={ tag }
              >
                {tag}
              </option>))}
          </select>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  receiveCurrencies: () => dispatch(actionFetchCurrencies()),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  receiveCurrencies: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
