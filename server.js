const express = require('express');
const app = express();
const initDb = require('./db/connection').initDb;
require('dotenv').config();
const bodyParser =  require('body-parser');
 
const port= process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Welcome to the bakery API. Use /products, /orders, or /users to access the endpoints.')
}
);

initDb((err) => {
  if (err) {
    console.error('Error initializing database:', err);
    return;
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
}
});