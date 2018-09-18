import { fromJS } from 'immutable';

export const init = fromJS({});

const navigationState = (state = init, action = {}) => {
  switch (action.type) {
    case 'UPDATE_NAVIGATION_STATE': {
      return state.set('current', fromJS(action.navEvent.state));
    }
    default:
      return state;
  }
};

export default navigationState;
