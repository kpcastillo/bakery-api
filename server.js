const express = require('express');
const app = express();

const mongodb = require('./db/connection');
 
const port= process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', require('./routes')
);
 

mongodb.initDb((err) => {
  if (err) {
    console.error('Error initializing database:', err);
    return;
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
}
});