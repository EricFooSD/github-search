import express from 'express';
import methodOverride from 'method-override';
import bindRoutes from './routes.mjs';
import dotenv from 'dotenv';

// Initialise Express instance
const app = express();
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));
// Expose the files stored in the distribution folder
app.use(express.static('dist'));

// Set up Webpack in dev env 
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  const { default: webpack } = await import('webpack')
  const { default: webpackDevMiddleware } =  await import('webpack-dev-middleware');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackConfig } = await import('./webpack_conf/webpack.dev.js');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // html only
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

// Bind route definitions to the Express application
bindRoutes(app);

// Expose keys in .env file
dotenv.config();

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);
