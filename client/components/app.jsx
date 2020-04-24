import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.state = {
      view: {
        name: 'catalog',
        params: {},
        cart: []
      }
    };
  }

  setView(name, params) {
    const newView = {
      name: name,
      params: params
    };
    this.setState({
      view: newView
    });
  }

  getView() {
    switch (this.state.view.name) {
      case 'catalog':
        return (
          <ProductList
            onClick={this.setView}/>
        );
      case 'details':
        return (
          <ProductDetails
            onClick={() => this.setView('catalog', {})}
            params={this.state.view.params}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const currentView = this.getView();
    return (
      <div className="container-fluid">
        <Header />
        {currentView}
      </div>
    );
  }
}
