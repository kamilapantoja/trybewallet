// Esse reducer será responsável por tratar as informações da pessoa usuária
const USER_INITIAL_STATE = {
  email: '',
};

const user = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return {
      ...state,
      email: action.email };
  default:
    return state;
  }
};

export default user;
