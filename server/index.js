require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    SELECT "image",
           "name",
           "price",
           "productId",
           "shortDescription"
      FROM "products"
  `;
  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.status(200).json(products);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!parseInt(productId, 10)) {
    return next(new ClientError('"productId" must be a positive integer', 400));
  }

  const sql = `
    SELECT "image",
           "longDescription",
           "name",
           "price",
           "productId",
           "shortDescription"
      FROM "products"
     WHERE "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        next(new ClientError(`Cannot find product with "productId" ${productId}`, 404));
      } else {
        res.status(200).json(product);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/cart', (req, res, next) => {
  res.status(200).json([]);
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  if (!parseInt(productId, 10)) {
    return next(new ClientError('"productId" must be a positive integer', 400));
  }

  const sql = `
    SELECT "price"
      FROM "products"
     WHERE "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        return next(new ClientError(`Cannot find product with "productId ${productId}`, 404));
      }

      if (!req.session.cardId) {
        const sql = `
          INSERT INTO "carts" ("cartId", "createdAt")
          VALUES (default, default)
          returning "cartId"
        `;
        return db.query(sql)
          .then(result => {
            const cart = result.rows[0];
            const cartIdAndPrice = {
              cartId: cart.cartId,
              price: product.price
            };
            return cartIdAndPrice;
          });
      } else {
        return {
          cartId: req.session.cardId,
          price: product.price
        };
      }
    })
    .then(cartIdAndPrice => {
      const cartId = cartIdAndPrice.cartId;
      const price = cartIdAndPrice.price;
      req.session.cartId = cartId;
      const sql = `
        INSERT INTO "cartItems" ("cartId", "productId", "price")
        VALUES ($1, $2, $3)
        RETURNING "cartItemId"
      `;
      const params = [cartId, productId, price];
      return db.query(sql, params)
        .then(result => {
          const cartItem = result.rows[0];
          return cartItem.cartItemId;
        });

    })
    .then(cartItemId => {
      const sql = `
        SELECT "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          FROM "cartItems" AS "c"
          JOIN "products" AS "p" USING ("productId")
         WHERE "c"."cartItemId" = $1
      `;
      const params = [cartItemId];
      db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
