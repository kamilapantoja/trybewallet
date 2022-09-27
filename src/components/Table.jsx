import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
          {
            expenses.map(({ id, value, currency, tag, description,
              method, exchangeRates,
            }) => {
              const { name, ask } = exchangeRates[currency];
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2).toString() }</td>
                  <td>{ currency }</td>
                  <td>{ name }</td>
                  <td>{ Number(ask).toFixed(2).toString() }</td>
                  <td>{ Number(value * ask).toFixed(2).toString() }</td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
                  </td>
                </tr>
              );
            })
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    value: propTypes.number,
    currency: propTypes.string,
    tag: propTypes.string,
    description: propTypes.string,
    method: propTypes.string,
    exchangeRates: propTypes.objectOf(propTypes.any),
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
