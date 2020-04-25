import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleChange(e) {
    const input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  }

  handleSubmit(e) {
    e.preventDefault();
    const orderInfo = Object.assign({}, this.state);
    this.props.placeOrder(orderInfo);
    e.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <h1>Checkout</h1>
        <span>{`Order Total: $${(this.props.params.orderTotal / 100).toFixed(2)}`}</span>
        <div className="form-group">
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="nameInput"
            value={this.state.name}/>
        </div>
        <div className="form-group">
          <label htmlFor="creditCardInput">Credit Card</label>
          <input
            type="text"
            name="creditCard"
            className="form-control"
            id="creditCardInput"
            value={this.state.creditCard}/>
        </div>
        <div className="form-group">
          <label htmlFor="addressInput">Shipping Address</label>
          <textarea
            name="shippingAddress"
            className="form-control"
            id="addressInput"
            rows="4"
            value={this.state.shippingAddress}></textarea>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span className="pointer" onClick={() => this.props.setView('catalog', {})}>&#60; Continue Shopping</span>
          <button type="submit" className="btn btn-primary">Place Order</button>
        </div>
      </form>
    );
  }
}
