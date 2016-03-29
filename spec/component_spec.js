// NPM
var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

// Local
var testdom = require('./support/testdom');
var Layout = React.createFactory(require('../build/components/Layout').default);

// Setup
testdom('<html><body><div id="content"></div></body></html>');

describe('Component', function() {

  it('should render component on page', function() {
    var component = ReactTestUtils.renderIntoDocument( Layout() );
    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h1');

    expect(h1.textContent).toEqual("Webpage Title");
  });

  it('should render component on page with custom title', function() {
    var component = ReactTestUtils.renderIntoDocument( Layout({ title: 'New Title' }) );
    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h1');

    expect(h1.textContent).toEqual("New Title");
  });

});
