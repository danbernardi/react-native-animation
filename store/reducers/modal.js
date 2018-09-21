const modal = (state = null, action = {}) => {
  switch (action.type) {
    case 'SET_MODAL': {
      return action.name;
    }
    default:
      return state;
  }
};

export default modal;
