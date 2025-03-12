const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Dynamically generate entry points for all JS files in src/js/
const jsEntries = Object.fromEntries(
  glob.sync('./src/js/**/*.js').map((file) => [
    // Remove 'src/js/' and '.js' to create the output name
    path.relative('./src/js', file).replace(/\.js$/, ''),
    path.resolve(__dirname, file),
  ])
);
console.log('JavaScript Entries:', jsEntries);

// Dynamically generate entry points for all SCSS files in src/scss/
const cssEntries = Object.fromEntries(
  glob.sync('./src/scss/**/*.scss').map((file) => [
    // Remove 'src/scss/' and '.scss' to create the output name
    path.relative('./src/scss', file).replace(/\.scss$/, ''),
    path.resolve(__dirname, file),
  ])
);

module.exports = {
    mode: 'production',
    entry: {
      ...jsEntries,
      ...cssEntries,
    },
    //devtool: 'eval-source-map',
    module: {
      rules: [
        { 
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Use Babel for transpiling (if needed)
            options: {
              presets: ['@babel/preset-env'], // Preset for modern JavaScript
            },
          },
        },
        {
           test: /\.(s(a|c)ss)$/,
           use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css', //Output CSS
      })
    ],
    output: {
      path: path.resolve(__dirname, './assets'),
      filename: 'js/[name].js', //Output JavaScript
    },
};
