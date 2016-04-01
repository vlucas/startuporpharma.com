const React = require('react');
const startups = require('data/startups');
const pharmas = require('data/pharmas');

class App extends React.Component {
  render() {
    return <div>
      {this.props.children}
    </div>;
  }
}

module.exports = App;
