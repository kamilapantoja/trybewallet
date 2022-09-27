import React from 'react';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, valores } = this.props;
    const totalValores = valores.reduce((acc, curr) => acc + curr, 0);
    return (
      <header>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">
          { totalValores.toFixed(2) }
        </h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </header>
    );
  }
}

Header.propTypes = {
  valores: propTypes.arrayOf(propTypes.number).isRequired,
  email: propTypes.string.isRequired,
};

export default Header;
