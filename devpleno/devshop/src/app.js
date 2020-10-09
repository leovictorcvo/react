const init = db => {
  const express = require('express');
  const path = require('path');
  const session = require('express-session');

  const app = express();
  const middlewares = require('./middlewares');
  const router = require('./routes');

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      name: process.env.SESSION_NAME,
      resave: false,
      saveUninitialized: true
    })
  );

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(middlewares(db));
  app.use(router(db));

  return app;
};

module.exports = init;
