import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  getCurrencyData = ({ currency, exchangeRates }) => Object.values(exchangeRates)
    .find((rate) => rate.code === currency);

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, value, description, currency, method, tag, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>
                  {(Number(value).toFixed(2))}
                </td>
                <td>
                  {this.getCurrencyData({ currency, exchangeRates }).name}
                </td>
                <td>
                  {(Number(this.getCurrencyData({ currency, exchangeRates })
                    .ask).toFixed(2))}
                </td>
                <td>
                  {(this.getCurrencyData({ currency, exchangeRates }).ask * value)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td><button data-testid="delete-btn">Excluir</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (({ wallet: { expenses } }) => ({
  expenses,
}));

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()),
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(Table);
