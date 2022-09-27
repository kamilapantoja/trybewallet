// Coloque aqui suas actions
export const userLoginAction = (email) => ({
  type: 'USER_LOGIN',
  email,
});

export const recebeCurrencies = (currencies) => ({
  type: 'RECEBE_CURRENCIES',
  currencies,
});

const exchangeRates = (expenses, rates) => ({
  type: 'ADICIONA_EXPENSES',
  expenses: {
    ...expenses,
    exchangeRates: rates,
  },
});

export const requisicaoCurrencies = () => (
  (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(recebeCurrencies(currencies)));
  }
);

export const adicionaExpensesAPI = (expenses) => (
  (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((rates) => dispatch(exchangeRates(expenses, rates)));
  });

// ================ ok
