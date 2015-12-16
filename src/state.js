import { createStore } from 'redux';

/**
 * Initial state of the application
 */
const initialState = {
  votes: 0,
  startups: [],
  pharmas: []
};


/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 */
function voteReducer(state = initialState, action) {
  switch (action.type) {
  case 'VOTE_STARTUP':
    return Object.assign({}, state, {
      startups: state.startups.slice().concat([action.company]),
      votes: state.votes + 1
    });
  case 'VOTE_PHARMA':
    return Object.assign({}, state, {
      pharmas: state.pharmas.slice().concat([action.company]),
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
  voteStartup(company) {
    store.dispatch({ type: 'VOTE_STARTUP', company });
  },

  // Vote pharma
  votePharma(company) {
    store.dispatch({ type: 'VOTE_PHARMA', company });
  }
};

// You can subscribe to the updates manually, or use bindings to your view layer.
store.subscribe(() => {
  // console.log(store.getState());
});
