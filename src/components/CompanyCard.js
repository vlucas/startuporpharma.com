'use strict';

const React = require('react');

let CompanyCard = React.createClass({
  propTypes: {
    company: React.PropTypes.shape({
      name: React.PropTypes.string,
      site_url: React.PropTypes.string,
      description: React.PropTypes.string,
      more_info_url: React.PropTypes.string
    }),
  },

  render() {
    let company = this.props.company;

    return <div className="sop-company-card>
      <h1 className="title">{ company.title }</h1>
      Something here?
      {this.props.children}
    </div>;
  }
})

module.exports = CompanyCard;

