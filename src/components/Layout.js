const React = require('react');

class Layout extends React.Component {
  render() {
    return <div>
      {this.props.children}
    </div>;
  }
}

module.exports = Layout;
