var state = require('../build/state');
var store = state.store;
var actions = state.actions;

describe('State', function() {

  beforeEach(function () {
    actions.reset();
  });

  it('should be empty be default', function() {
    expect(store.getState()).toEqual({ votes: 0, right: [], wrong: [] });
  });

  it('should track correct vote', function() {
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
});
