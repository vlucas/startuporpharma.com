var state = require('../src/state');
var store = state.store;
var actions = state.actions;

describe('State', function() {

  beforeEach(function () {
    actions.reset();
  });

  it('should be empty be default', function() {
    expect(store.getState()).toEqual({ votes: 0, right: [], wrong: [] });
  });

  it('should track right vote', function() {
    actions.voteStartup('Wix');
    expect(store.getState()).toEqual({ votes: 1, right: ['Wix'], wrong: [] });
  });

  it('should track wrong vote', function() {
    actions.voteStartup('Belviq');
    expect(store.getState()).toEqual({ votes: 1, right: [], wrong: ['Belviq'] });
  });

  it('should track multiple votes', function() {
    actions.voteStartup('Wix');
    actions.voteStartup('Pramata');
    actions.voteStartup('Mazlo');
    actions.voteStartup('Belviq');
    expect(store.getState()).toEqual({ votes: 4, right: ['Wix', 'Pramata', 'Mazlo'], wrong: ['Belviq'] });
  });

  it('should ensure multiple votes for the same name will not be in the array multiple times', function() {
    actions.voteStartup('Wix');
    actions.voteStartup('Wix');
    expect(store.getState()).toEqual({ votes: 2, right: ['Wix'], wrong: [] });
  });

  it('should change vote if vote exists in opposite array', function() {
    actions.votePharma('Wix');
    expect(store.getState()).toEqual({ votes: 1, right: [], wrong: ['Wix'] });
    actions.voteStartup('Wix');
    expect(store.getState()).toEqual({ votes: 2, right: ['Wix'], wrong: [] });
  });
});
