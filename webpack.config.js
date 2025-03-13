const path = require('path');
const glob = require('glob');
const entry = require('webpack-glob-entry');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

// Dynamically generate entry points for all JS files in src/js/
const entryObject = entry('./src/js/*');
Object.keys(entryObject).forEach(entryKey => entryObject[entryKey] = `${entryObject[entryKey]}/index.js`);
//console.log('Js Entries:', entryObject);

// Dynamically generate entry points for all SCSS files in src/scss/ AND adding a suffix to their name
const getEntries = (pattern, suffix = '') => {
  return glob.sync(pattern).reduce((entries, file) => {
    const name = path.basename(file, path.extname(file)); // Get filename without extension
    entries[`${name}${suffix}`] = path.resolve(__dirname, file);
    return entries;
  }, {});
};
const cssEntries = getEntries('./src/scss/**/*.scss', '-style'); // Add suffix to SCSS
//console.log('cssEntries WITH suffix:', cssEntries);

const entries = { ...entryObject, ...cssEntries };
//console.log('Merged Entries:', entries);

module.exports = {
    mode: 'production',
    entry: entries,
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new FixStyleOnlyEntriesPlugin({ extensions: ['scss'] }),
    ],
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: '[name].js', //Output JavaScript
    },
};