import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#"><i className="fas fa-dollar-sign"></i>Wicked Sales</a>
      </nav>
    );
  }
}
