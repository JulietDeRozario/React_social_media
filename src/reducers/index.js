const token = (state = null, action) => {
  switch(action.type) {
    case 'REGISTER':
      state = action.token;
      return state;
    default:
      return state;
  }
  return state;
}

export default token;