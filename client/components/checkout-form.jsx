import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      creditCardError: false
    };
  }

  handleChange(e) {
    const input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.creditCardIsValid()) {
      this.setState({ creditCardError: true });
      return;
    }
    const orderInfo = Object.assign({}, this.state);
    this.props.placeOrder(orderInfo);
  }

  creditCardIsValid() {
    return this.state.creditCard.match(/\d{4}-?\d{4}-?\d{4}-?\d{4}/);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Checkout</h1>
        <span>{`Order Total: $${(this.props.params.orderTotal / 100).toFixed(2)}`}</span>
        <div className="form-group">
          <label htmlFor="nameInput">Name</label>
          <input
            required
            type="text"
            name="name"
            className="form-control"
            id="nameInput"
            value={this.state.name}
            onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="creditCardInput">Credit Card</label>
          <input
            required
            type="text"
            name="creditCard"
            className={this.state.creditCardError ? 'form-control is-invalid' : 'form-control'}
            id="creditCardInput"
            value={this.state.creditCard}
            onChange={this.handleChange}></input>
          {this.state.creditCardError ? <small className="text-danger">Please input a valid credit card number</small> : null }
        </div>
        <div className="form-group">
          <label htmlFor="addressInput">Shipping Address</label>
          <textarea
            required
            name="shippingAddress"
            className="form-control"
            id="addressInput"
            rows="4"
            value={this.state.shippingAddress}
            onChange={this.handleChange}></textarea>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span className="pointer" onClick={() => this.props.setView('catalog', {})}>&#60; Continue Shopping</span>
          <button type="submit" className="btn btn-primary">Place Order</button>
        </div>
      </form>
    );
  }
}
