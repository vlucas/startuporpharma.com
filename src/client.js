const React = require('react');
const ReactDOM = require('react-dom');
const App = require('components/App');

const state = require('./state');
let { store, actions } = state;

let appComponent = ReactDOM.render(<App actions={actions} />, document.getElementById('content'));

store.subscribe(() => {
  console.log(store.getState());
  appComponent.setState(store.getState());
});
actions.reset();
