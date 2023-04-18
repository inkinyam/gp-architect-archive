const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: true,
    })
  })
}
const htmlPlugins = generateHtmlPlugins('./src/pages/');

module.exports = {
  entry: path.join(__dirname, 'src/scripts', 'index.js'),
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'index.js',
    assetModuleFilename: path.join('images', '[name][ext]').replace(/\\/g, '/'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('images', '[name][ext]').replace(/\\/g, '/'),
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('images/icons', '[name][ext]').replace(/\\/g, '/'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('fonts', '[name][ext]').replace(/\\/g, '/'),
        },
      },
      
    ],
  },

  plugins: [
      new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),

    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['docs'],
        },
        onEnd: {
          copy: [
            {
              source: path.join('src', 'favicons'),
              destination: 'docs/favicons',    
            },
            {
              source: path.join('src', 'utils'),
              destination: 'docs/utils',    
            }
          ]
        }
      },
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ].concat(htmlPlugins),


  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080
  },
};