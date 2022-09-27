import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adicionaExpensesAPI } from '../actions';

const estadoInicial = {
  value: 0,
  currency: 'USD',
  tag: 'Alimentação',
  description: '',
  method: 'Dinheiro',
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      ...estadoInicial,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (name === 'select' ? target.selected : target.value);
    this.setState({
      [name]: value,
    });
  }

  incrementaDespesas = (event) => {
    event.preventDefault();
    const { adicionaDespesas } = this.props;
    const { id } = this.state;
    adicionaDespesas(this.state);
    this.setState({
      ...estadoInicial,
      id: id + 1,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, tag,
      description, method } = this.state;
    return (
      <div>
        <form onSubmit={ (event) => event.preventDefault() }>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              data-testid="value-input"
              type="number"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              onChange={ this.handleChange }
            >
              {currencies?.map((moeda) => (
                // Estava tendo um erro persistente com esse map, que foi resolvido com a solução encontrada no link abaixo
                // https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map
                <option
                  key={ moeda }
                  value={ moeda }
                  selected={ moeda === currency }
                >
                  {moeda}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito"> Cartão de débito </option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação"> Alimentação </option>
              <option value="Lazer"> Lazer </option>
              <option value="Trabalho"> Trabalho </option>
              <option value="Transporte"> Transporte </option>
              <option value="Saúde"> Saúde </option>
            </select>
          </label>
          <label htmlFor="descriptionInput">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <button
            type="submit"
            onClick={ this.incrementaDespesas }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

// testando avaliador

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  adicionaDespesas: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  adicionaDespesas: (value) => dispatch(adicionaExpensesAPI(value)),
});

export default connect(null, mapDispatchToProps)(Form);
