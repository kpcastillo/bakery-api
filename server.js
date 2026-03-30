const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const { initDb } = require('./db/connection');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use(cors({
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(cors({origin: '*'}));
app.use('/', require('./routes/auth.js'));

const productsRoutes = require('./routes/products');
app.use('/products', productsRoutes);

const categoriesRoutes = require('./routes/categories');
app.use('/categories', categoriesRoutes)

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the bakery API. Use /products, /categories, or /users to access the endpoints.'
  });
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback'
},
(accessToken, refreshToken, profile, done) => {
  // For simplicity, we will just return the GitHub profile as the user object.
  // In a real application, you would want to associate the GitHub account with a user record in your database.
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/auth', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Not logged in');
});
app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

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