import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteExpense, actionEditExpense } from '../redux/actions';
import WalletForm from './WalletForm';

class Table extends Component {
  getCurrencyData = ({ currency = 1, exchangeRates = [] }) => Object.values(exchangeRates)
    .find((rate) => rate.code === currency);

  render() {
    const { expenses, deleteExpense, editExpense, inEdition } = this.props;
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
            .map(
              ({ id, value, description, currency, method, tag, exchangeRates }) => (
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
                  <td>
                    <button
                      data-testid="edit-btn"
                      onClick={ () => editExpense(id) }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => deleteExpense(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ),
              inEdition && <WalletForm />,
            )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (({ wallet: { expenses, inEdition } }) => ({
  expenses,
  inEdition,
}));

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(actionDeleteExpense(id)),
  editExpense: (id) => dispatch(actionEditExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()),
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  inEdition: PropTypes.bool.isRequired,
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
