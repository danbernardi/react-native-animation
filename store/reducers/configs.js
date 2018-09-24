import { fromJS } from 'immutable';

const springInit = {
  stiffness: 120,
  damping: 17,
  velocity: 1000,
  boxCount: 30
};

export const init = fromJS({
  'Elastic ball / Event example': {
    friction: 3,
    expandSize: 1.1
  },
  'Stagger / Spring example': springInit
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
