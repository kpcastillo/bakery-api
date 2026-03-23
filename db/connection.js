const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const _db = new MongoClient(uri);
const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(uri)
    .then((client) => {
      _db = client.db(dbName);
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  return _db;
};

module.exports = {
  initDb,
  getDb
};
