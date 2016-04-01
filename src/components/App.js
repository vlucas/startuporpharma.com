'use strict';

const React = require('react');
const startups = require('data/startups');
const pharmas = require('data/pharmas');
const companies = [...Object.keys(startups), ...Object.keys(pharmas)];
console.log(companies);

class App extends React.Component {
  render() {
    return <div>
      {this.props.children}

      <div className="pure-g">
        <div className="pure-u-1-2">
          <img className="pure-img-responsive" src="http://farm3.staticflickr.com/2875/9069037713_1752f5daeb.jpg" alt="Peyto Lake" />
        </div>
        <div className="pure-u-1-2">
          <img className="pure-img-responsive" src="http://farm3.staticflickr.com/2813/9069585985_80da8db54f.jpg" alt="Train" />
        </div>
      </div>
    </div>;
  }
}

module.exports = App;
