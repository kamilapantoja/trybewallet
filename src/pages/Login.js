import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLoginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // Link utilizado para pesquisa sobre validacao de email em JS
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  emailValidate = (email) => {
    const emailValidateRegex = /\S+@\S+\.\S+/;
    return emailValidateRegex.test(email);
  }
  // O método test() executa uma busca por uma correspondência
  // entre uma expressão regular e uma string. Retorna true ou false .

  passwordValidate = (password) => {
    const maxPasswordValidate = 6;
    return password.length >= maxPasswordValidate;
  }

  activateButton = (email, password) => {
    const disableButton = this.emailValidate(email) && this.passwordValidate(password);
    return !disableButton;
  }

  handleClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, login } = this.props;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { handleChange, activateButton, handleClick } = this;
    const { email, password } = this.state;
    // const { login, history } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div>
            <label htmlFor="email">
              Email:
              <input
                data-testid="email-input"
                type="text"
                name="email"
                value={ email }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                onChange={ handleChange }
              />
            </label>
          </div>
          <button
            type="button"
            disabled={ activateButton(email, password) }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLoginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
