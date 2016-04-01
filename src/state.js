'use strict';

const createStore = require('redux').createStore;
const pharmas = require('./data/pharmas.json');
const startups = require('./data/startups.json');

// Merge startups and pharmas to single 'companies' array
const companies = Object.assign({}, pharmas, startups);
const companyNames = [...Object.keys(startups), ...Object.keys(pharmas)].sort();

/**
 * Initial state of the application
 */
const initialState = {
  votes: 0,
  currentCompany: companyNames[0],
  lastVote: null,
  right: [],
  wrong: []
};

/**
 * Return difference of two arrays
 */
function arrayDiff(arr1, arr2) {
  return arr1.filter(function(i) {return arr2.indexOf(i) < 0;});
}


/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 */
function voteReducer(state, action) {
  if (!state) {
    state = initialState;
  }

  /**
   * Return new state with right/wrong determination
   */
  function voteRightWrongState(state, name, type) {
    let newState =  Object.assign({}, state);
    if (
      (type === 'pharma'  && pharmas.hasOwnProperty(name)) ||
      (type === 'startup' && startups.hasOwnProperty(name))
    ) {
      // Ensure vote isn't already present
      if (newState.right.indexOf(name) === -1) {
        newState.right = newState.right.concat([name]);
        newState.lastVote = {
          result: 'right',
          company: Object.assign({ name }, companies[name])
        };
      }

      // Change vote if exists in opposite array
      let delIndex = newState.wrong.indexOf(name);
      if (delIndex !== -1) {
        newState.wrong.splice(delIndex, 1);
      }
    } else {
      // Ensure vote isn't already present
      if (newState.wrong.indexOf(name) === -1) {
        newState.wrong = newState.wrong.concat([name]);
        newState.lastVote = {
          result: 'wrong',
          company: Object.assign({ name }, companies[name])
        };
      }

      // Change vote if exists in opposite array
      let delIndex = newState.right.indexOf(name);
      if (delIndex !== -1) {
        newState.right.splice(delIndex, 1);
      }
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
    case 'NEXT_COMPANY':
      let usedCompanies = [...state.right, ...state.wrong];
      let availableCompanies = arrayDiff(companyNames, usedCompanies);
      let currentCompany;

      // If we have used all company names, company name is false
      if (availableCompanies.length === 0) {
        currentCompany = false;
      } else {
        currentCompany = availableCompanies[Math.floor(Math.random()*availableCompanies.length)];
      }

      // Clear last vote result
      state.lastVote = null;

      return Object.assign({}, state, { currentCompany });
    case 'INITIAL_STATE':
      return initialState;
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(voteReducer);

/**
 * Actions available
 */
const actions = {
  // Reset store back to initial state (used in tests)
  reset() {
    store.dispatch({ type: 'INITIAL_STATE' });
  },

  // Select next company
  nextCompany() {
    store.dispatch({ type: 'NEXT_COMPANY' });
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
// store.subscribe(() => {
//   console.log(store.getState());
// });

module.exports = { store, actions };
