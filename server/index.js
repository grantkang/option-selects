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

app.get('/api/brands/:brandId', (req, res, next) => {
  const { brandId } = req.params;

  if (!parseInt(brandId, 10)) {
    return next(new ClientError('"brandId" must be a positive integer', 400));
  }

  const sql = `
    SELECT * FROM "brands"
     WHERE "brandId" = $1
  `;
  const params = [brandId];
  db.query(sql, params)
    .then(result => {
      const brand = result.rows[0];
      if (!brand) {
        throw new ClientError(`Cannot find brand with "brandId" ${brandId}`, 404);
      }
      const sql = `
        SELECT "name",
              "price",
              "products"."productId",
              "singleImage"."imagePath"
          FROM "products"
          JOIN (
            SELECT DISTINCT ON ("productId") * FROM "productImages"
          ) AS "singleImage" USING ("productId")
        WHERE "brandId" = $1;
       `;
      const params = [brandId];
      return db.query(sql, params)
        .then(result => {
          brand.products = result.rows;
          res.status(200).json(brand);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/categories/:categoryId', (req, res, next) => {
  const { categoryId } = req.params;

  if (!parseInt(categoryId, 10)) {
    return next(new ClientError('"categoryId" must be a positive integer', 400));
  }

  const sql = `
    SELECT * FROM "categories"
     WHERE "categoryId" = $1
  `;
  const params = [categoryId];
  db.query(sql, params)
    .then(result => {
      const category = result.rows[0];
      if (!category) {
        throw new ClientError(`Cannot find category with "categoryId" ${categoryId}`, 404);
      }
      const sql = `
        SELECT "name",
              "price",
              "products"."productId",
              "singleImage"."imagePath"
          FROM "products"
          JOIN (
            SELECT DISTINCT ON ("productId") * FROM "productImages"
          ) AS "singleImage" USING ("productId")
        WHERE "categoryId" = $1;
       `;
      const params = [categoryId];
      return db.query(sql, params)
        .then(result => {
          category.products = result.rows;
          res.status(200).json(category);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    SELECT "name",
           "price",
           "products"."productId",
           "singleImage"."imagePath"
      FROM "products"
      JOIN (
        SELECT DISTINCT ON ("productId") * FROM "productImages"
      ) AS "singleImage" USING ("productId");
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
    SELECT "p"."productId",
           "p"."name",
           "p"."price",
           "p"."description",
           "p"."categoryId",
           "c"."name" AS "category",
           "b"."name" AS "brand"
      FROM "products" AS "p"
      JOIN "brands" AS "b" USING("brandId")
      JOIN "categories" AS "c" USING("categoryId")
     WHERE "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        throw new ClientError(`Cannot find product with "productId" ${productId}`, 404);
      }
      const sql = `
        SELECT
        COALESCE(json_agg(DISTINCT "colors") FILTER (WHERE "colors"."colorId" IS NOT NULL), '[]') "colors",
        COALESCE(json_agg(DISTINCT "productImages") FILTER (WHERE "productImages"."productImageId" IS NOT NULL), '[]') "images",
        COALESCE(json_agg(DISTINCT "sizes") FILTER (WHERE "sizes"."sizeId" IS NOT NULL), '[]') "sizes"
        FROM "products"
        LEFT JOIN "productsColors" USING("productId")
        LEFT JOIN "colors" USING ("colorId")
        LEFT JOIN "productImages" USING("productId")
        LEFT JOIN "productsSizes" USING("productId")
        LEFT JOIN "sizes" USING ("sizeId")
        GROUP BY "productId"
        HAVING "productId" = $1
      `;
      const params = [productId];
      return db.query(sql, params)
        .then(result => {
          const aggregates = result.rows[0];

          const sql = `
            SELECT "name",
                  "price",
                  "products"."productId",
                  "singleImage"."imagePath"
              FROM "products"
              JOIN (
                SELECT DISTINCT ON ("productId") * FROM "productImages"
              ) AS "singleImage" USING ("productId")
              WHERE "products"."categoryId" = $1 AND "products"."productId" != $2
              LIMIT 3;
          `;
          const params = [product.categoryId, product.productId];
          return db.query(sql, params)
            .then(result => {
              const relatedProducts = result.rows;
              res.status(200).json({ ...product, ...aggregates, relatedProducts });
            });
        });
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/cart', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!cartId) {
    return res.status(200).json([]);
  }
  const sql = `
        SELECT "c"."cartItemId",
               "c"."price",
               "c"."sizeId",
               "s"."abbreviation" AS "sizeAbreviation",
               "c"."colorId",
               "co"."name" AS "colorName",
               "singleImage"."imagePath" AS "imagePath",
               "p"."productId",
               "p"."name",
               "p"."description"
          FROM "cartItems" AS "c"
          JOIN "products" AS "p" USING ("productId")
     LEFT JOIN "colors" AS "co" ON ("c"."colorId" IS NOT NULL AND "c"."colorId" = "co"."colorId")
     LEFT JOIN "sizes" AS "s" ON ("c"."sizeId" IS NOT NULL AND "c"."sizeId" = "s"."sizeId")
          JOIN (
            SELECT DISTINCT ON ("productId") * FROM "productImages"
          ) AS "singleImage" USING ("productId")
       WHERE "c"."cartId" = $1
  `;
  const params = [cartId];
  db.query(sql, params)
    .then(result => {
      const cart = result.rows;
      if (!cart.length === 0) {
        next(new ClientError(`Cannot find cart with "cartId" ${cartId}`, 404));
      } else {
        res.status(200).json(cart);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  const { colorId } = req.body;
  const { sizeId } = req.body;
  if (!parseInt(productId, 10)) {
    return next(new ClientError('"productId" must be a positive integer', 400));
  }
  if (parseInt(sizeId, 10) <= 0 && sizeId !== undefined) {
    return next(new ClientError('"sizeId" must be a positive integer', 400));
  }
  if (parseInt(colorId, 10) <= 0 && !colorId !== undefined) {
    return next(new ClientError('"colorId" must be a positive integer', 400));
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
        throw new ClientError(`Cannot find product with "productId ${productId}`, 404);
      }

      if (!req.session.cartId) {
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
              price: product.price,
              sizeId,
              colorId
            };
            return cartIdAndPrice;
          });
      } else {
        return {
          cartId: req.session.cartId,
          price: product.price,
          sizeId,
          colorId
        };
      }
    })
    .then(cartItemData => {
      const cartId = cartItemData.cartId;
      const price = cartItemData.price;
      const sizeId = cartItemData.sizeId;
      const colorId = cartItemData.colorId;
      req.session.cartId = cartId;
      const sql = `
        INSERT INTO "cartItems" ("cartId", "productId", "price", "sizeId", "colorId")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "cartItemId"
      `;
      const params = [cartId, productId, price, sizeId, colorId];
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
               "c"."sizeId",
               "s"."abbreviation" AS "sizeAbreviation",
               "c"."colorId",
               "co"."name" AS "colorName",
               "p"."productId",
               "singleImage"."imagePath",
               "p"."name",
               "p"."description"
          FROM "cartItems" AS "c"
          JOIN "products" AS "p" USING ("productId")
     LEFT JOIN "colors" AS "co" ON ("c"."colorId" IS NOT NULL AND "c"."colorId" = "co"."colorId")
     LEFT JOIN "sizes" AS "s" ON ("c"."sizeId" IS NOT NULL AND "c"."sizeId" = "s"."sizeId")
     LEFT JOIN (
                SELECT *
                FROM "productImages" AS "pi"
          ) AS "singleImage" ON "c"."productId" = "singleImage"."productId" AND("c"."colorId" IS NULL OR "c"."colorId" = "singleImage"."colorId")
         WHERE "c"."cartItemId" = $1
         LIMIT 1;
      `;
      const params = [cartItemId];
      return db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/orders', (req, res, next) => {
  const { name, creditCard, shippingAddress } = req.body;
  const cartId = req.session.cartId;
  if (!cartId) {
    return next(new ClientError('No cart on current session', 400));
  }
  if (!name.trim() || !creditCard.trim() || !shippingAddress.trim()) {
    return next(new ClientError('"name","creditCard","shippingAddress" are all required', 400));
  }

  const sql = `
    INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
    VALUES ($1, $2, $3, $4)
    RETURNING "createdAt", "creditCard", "name", "orderId", "shippingAddress"
  `;
  const params = [cartId, name, creditCard, shippingAddress];
  db.query(sql, params)
    .then(result => {
      const order = result.rows[0];
      delete req.session.cartId;
      res.status(201).json(order);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/nav', (req, res, next) => {
  const sql = `
    SELECT "categoryId" AS "id", "name" FROM "categories"
  `;
  db.query(sql)
    .then(result => {
      const categories = result.rows;
      if (categories.length === 0) {
        throw new ClientError('No categories available!', 404);
      }
      const sql = `
        SELECT "brandId" AS "id", "name" FROM "brands"
      `;
      return db.query(sql)
        .then(result => {
          const brands = result.rows;
          if (brands.length === 0) {
            throw new ClientError('No brands available!', 404);
          }
          res.status(200).json({ categories, brands });
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
