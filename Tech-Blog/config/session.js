const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./connection');

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 3600000 }, 
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db }),
};

module.exports = sess;
