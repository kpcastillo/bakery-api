const express = require('express');

const { initDb } = require('./db/connection');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const productsRoutes = require('./routes/products');
app.use('/products', productsRoutes);

//app.get('/products', (req, res) => {
  //res.send({ test: 'direct route works' });
//});

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the bakery API. Use /products, /categories, or /users to access the endpoints.'
  });
});

initDb()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error initializing database:', err);
    process.exit(1);
  });