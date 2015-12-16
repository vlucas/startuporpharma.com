var state = require('../build/state');
var store = state.store;
var actions = state.actions;

describe('State', function() {

  beforeEach(function () {
    actions.reset();
  });

  it('should be empty be default', function() {
    expect(store.getState()).toEqual({ votes: 0, startups: [], pharmas: [] });
  });

  it('should allow vote for startup', function() {
    actions.voteStartup('Wix');
    expect(store.getState()).toEqual({ votes: 1, startups: ['Wix'], pharmas: [] });
  });

  it('should allow vote for pharma', function() {
    actions.votePharma('Vigra');
    expect(store.getState()).toEqual({ votes: 1, startups: [], pharmas: ['Vigra'] });
  });

  it('should allow multiple votes', function() {
    actions.voteStartup('Wix');
    actions.voteStartup('Pramada');
    actions.voteStartup('Navvis');
    actions.votePharma('Viagra');
    expect(store.getState()).toEqual({ votes: 4, startups: ['Wix', 'Pramada', 'Navvis'], pharmas: ['Viagra'] });
  });
});
