const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dir",
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      api: path.resolve(__dirname, "./src/api"),
      components: path.resolve(__dirname, "./src/components"),
      context: path.resolve(__dirname, "./src/context"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
