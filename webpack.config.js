const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy files", function () {
      fse.copySync("./app/css/reset.css", "./dist/css/reset.css");
      fse.copySync("./app/css/styles.css", "./dist/css/styles.css");
      fse.copySync("./app/img/BeOS_person.png", "./dist/img/BeOS_person.png");
      fse.copySync("./app/img/BeOS_people.png", "./dist/img/BeOS_people.png");
      fse.copySync("./app/img/logo.png", "./dist/img/logo.png");
      fse.copySync("./app/img/bg.gif", "./dist/img/bg.gif");
      fse.copySync("./app/img/alicia_silverstone.jpg", "./dist/img/alicia_silverstone.jpg");
      fse.copySync("./app/img/alyson_hannigan.jpg", "./dist/img/alyson_hannigan.jpg");
      fse.copySync("./app/img/elizabeth_berkley.jpg", "./dist/img/elizabeth_berkley.jpg");
      fse.copySync("./app/img/jaleel_white.jpg", "./dist/img/jaleel_white.jpg");
      fse.copySync("./app/img/jessica_biel.jpg", "./dist/img/jessica_biel.jpg");
      fse.copySync("./app/img/leo_dicaprio.jpg", "./dist/img/leo_dicaprio.jpg");
      fse.copySync("./app/img/paul_rudd.jpg", "./dist/img/paul_rudd.jpg");
      fse.copySync("./app/img/tiffani_thiessen.jpg", "./dist/img/tiffani_thiessen.jpg");
      fse.copySync("./app/img/tom_cruise.jpeg", "./dist/img/tom_cruise.jpeg");
      fse.copySync("./app/img/main_profile.jpg", "./dist/img/main_profile.jpg");
    });
  }
}
config = {
  entry: "./app/Main.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "app"),
    filename: "bundled.js"
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "app/index-template.html",
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ]
  }
};
if (currentTask == "webpackDev" || currentTask == "dev") {
  config.devtool = "source-map";
  config.devServer = {
    port: 3000,
    contentBase: path.join(__dirname, "app"),
    hot: true,
    historyApiFallback: { index: "index.html" }
  };
}
if (currentTask == "webpackBuild") {
  config.plugins.push(new CleanWebpackPlugin(), new RunAfterCompile());
  config.mode = "production";
  config.output = {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  };
}
module.exports = config;
