const path = require('path');
const express = require('express');
const morganDebug = require('morgan-debug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const VError = require('verror');

// const log = require('@tools/log')();
const errLog = require('@tools/log')('error');

const config = require('@app/config');
const Routes = require('@app/server/routes');

const webpackConfig = require(`@app/config/webpack.${config.env ||
  'development'}`);

/**
 * Variables and Constants
 */

const isProd = config.env === 'production';
const app = (module.exports = express());

/**
 * Express/Passport Configuration
 */

app.use(express.static(path.join(__dirname, 'dist')));
app.use(
  '/.well-known',
  express.static(path.join(__dirname, '.well-known'), { dotfiles: 'allow' })
);
app.use(morganDebug(`${config.pkg.name}-morgan`, isProd ? 'combined' : 'dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(helmet());

// Load Dev Middleware if in dev mode, serve compiled assets otherwise
if (!isProd) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
} else {
  app.get('/', landing);
}

// Load API Routes
app.use('/api', Routes.Posts);
app.use('/api', Routes.Users);

/**
 * Error Handling Routes
 */

app.use('/fail', forceFailure);
app.use(pageNotFound);
app.use(serverError);

function landing(req, res) {
  return res.sendFile(__dirname + '/dist/index.html');
}

function forceFailure(req, res, next) {
  const err = new VError('Intentionally Triggered Error');
  next(err);
}

/* eslint-disable no-unused-vars */

function pageNotFound(req, res, next) {
  const err = new VError('Not Found');
  err.status = 404;
  next(err);
}

function serverError(err, req, res, next) {
  const error = new VError(err, 'Unhandled Server Error');
  errLog(error.stack);
  return res.sendStatus(500);
}
/* eslint-enable no-unused-vars */
