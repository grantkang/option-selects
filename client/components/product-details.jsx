import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ApplicationContext from '../lib/context';

export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const context = useContext(ApplicationContext);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(response => {
        return response.json();
      })
      .then(product => setProduct(product));
  }, []);

  if (product) {
    return (
      <div className="card m-4">
        <div className="card-body">
          <span className="pointer" onClick={() => { history.push('/'); }}>&#60; back to catalog</span>
          <div className="row">
            <div className="col-5">
              <img className="card-img-top card-img my-3" src={product.image} alt=""/>
            </div>
            <div className="col-7">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-text text-muted">{`$${(product.price / 100).toFixed(2)}`}</p>
              <p className="card-text">{product.shortDescription}</p>
              <button className="btn btn-primary" onClick={() => context.addToCart(product)}>Add to Cart</button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="card-text">{product.longDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
