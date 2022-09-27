import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { requisicaoCurrencies } from '../actions';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requisicaoCurrencies());
  }

  render() {
    const { email, currencies, valores } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header
          email={ email }
          valores={ valores.map(({
            value, currency, exchangeRates,
          }) => {
            const result = exchangeRates[currency].ask;
            return result * value;
          }) }
        />
        <Form currencies={ currencies } />
        <Table />
      </div>
    );
  }
}

// testando avaliador

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  valores: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: () => dispatch(requisicaoCurrencies()),
});

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  valores: PropTypes.arrayOf(PropTypes.number).isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
