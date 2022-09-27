// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const CURRENCIES_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = CURRENCIES_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEBE_CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((moeda) => moeda !== 'USDT') };
  case 'ADICIONA_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
