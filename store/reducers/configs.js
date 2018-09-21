import { fromJS } from 'immutable';

const init = fromJS({
  'Elastic ball / Event example': {
    friction: 3,
    expandSize: 1.1
  }
});

const configs = (state = init, action = {}) => {
  switch (action.type) {
    case 'SET_CONFIG': {
      return state.setIn([action.section, action.config], action.value);
    }
    default:
      return state;
  }
};

export default configs;
