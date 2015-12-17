import { createStore } from 'redux';
import pharmas from '../data/pharmas.json';
import startups from '../data/startups.json';

/**
 * Initial state of the application
 */
const initialState = {
  votes: 0,
  right: [],
  wrong: []
};


/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 */
function voteReducer(state = initialState, action) {

  /**
   * Return new state with right/wrong determination
   */
  function voteRightWrongState(state, name, type) {
    let newState =  Object.assign({}, state);
    if (
      (type === 'pharma'  && pharmas.hasOwnProperty(name)) ||
      (type === 'startup' && startups.hasOwnProperty(name))
    ) {
      newState.right = newState.right.concat([name]);
    } else {
      newState.wrong = newState.wrong.concat([name]);
    }
    return newState;
  }

  switch (action.type) {
  case 'VOTE_STARTUP':
    return Object.assign({}, voteRightWrongState(state, action.name, 'startup'), {
      votes: state.votes + 1
    });
  case 'VOTE_PHARMA':
    return Object.assign({}, voteRightWrongState(state, action.name, 'pharma'), {
      votes: state.votes + 1
    });
  case 'INITIAL_STATE':
    return initialState;
  default:
    return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(voteReducer);

/**
 * Actions available
 */
export const actions = {
  // Reset store back to initial state (used in tests)
  reset() {
    store.dispatch({ type: 'INITIAL_STATE' });
  },

  // Vote startup
  voteStartup(name) {
    store.dispatch({ type: 'VOTE_STARTUP', name });
  },

  // Vote pharma
  votePharma(name) {
    store.dispatch({ type: 'VOTE_PHARMA', name });
  }
};

// You can subscribe to the updates manually, or use bindings to your view layer.
store.subscribe(() => {
  // console.log(store.getState());
});
