'use strict';

const React = require('react');

let App = React.createClass({
  getInitialState() {
    return {
      votes: 0,
      currentCompany: null,
      lastVote: null,
      right: [],
      wrong: []
    };
  },

  _voteStartup(e) {
    e.preventDefault();
    this.props.actions.voteStartup(this.state.currentCompany);
  },

  _votePharma(e) {
    e.preventDefault();
    this.props.actions.votePharma(this.state.currentCompany);
  },

  _nextCompany(e) {
    e.preventDefault();
    this.props.actions.nextCompany();
  },

  _resetGame(e) {
    e.preventDefault();
    this.props.actions.reset();
  },

  _renderVoteResults() {
    let company = this.state.lastVote ? this.state.lastVote.company : {},
      lastVoteResult = this.state.lastVote ? this.state.lastVote.result : null,
      lastVoteText;

    if (lastVoteResult === 'right') {
      lastVoteText = 'Correct!';
    } else if (lastVoteResult === 'wrong') {
      lastVoteText = 'Sorry, that is not correct!'
    } else {
      // print nothing
      return;
    }

    return (
      <div>
        <div id="sop-modal-background"></div>
        <div id="sop-vote-results-modal">
          <div className={"sop-vote-results-" + lastVoteResult}>
            {lastVoteText}
          </div>
          <h3><a href={company.site_url}>{company.name}</a></h3>
          <p>{company.description}</p>
          <p>More Info: <a href={company.more_info_url}>{company.more_info_url}</a></p>
          <button onClick={this._nextCompany}>Next Company</button>
        </div>
      </div>
    );
  },

  _renderEndgame() {
    if (this.state.currentCompany !== false) {
      return;
    }

    return (
      <div>
        <div id="sop-modal-background"></div>
        <div id="sop-vote-results-modal">
          <h3>Game Over!</h3>
          <p>Thanks for playing!</p>
          <button onClick={this._resetGame}>Play Again</button>
        </div>
      </div>
    );
  },

  render() {
    return (
      <div>
        {this.props.children}
        <h3 className="sop-company-name">{this.state.currentCompany}</h3>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <a className="sop-vote-block sop-vote-startup" href="#" onClick={this._voteStartup}>Startup</a>
          </div>
          <div className="pure-u-1-2">
            <a className="sop-vote-block sop-vote-pharma" href="#" onClick={this._votePharma}>Pharma</a>
          </div>
        </div>
        {this._renderVoteResults()}
        {this._renderEndgame()}
      </div>
    );
  }
});

module.exports = App;
