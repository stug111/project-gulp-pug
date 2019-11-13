const { src, dest, series, watch } = require("gulp");
const webpack = require("webpack-stream");
const plumber = require("gulp-plumber");
const { notify } = require("../utils");
const paths = require("../paths");
const gulpif = require("gulp-if");
const isProduction = process.env.NODE_ENV === "production";

const webpackOpts = {
  // mode: process.env.NODE_ENV || "development",
  mode: "development",
  devtool: isProduction ? false : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  watch: false
};

const buildScripts = () =>
  src(`${paths.js.src}index.js`)
    .pipe(
      gulpif(
        !isProduction,
        plumber({
          errorHandler: err => {
            notify("JS build error", err);
          }
        })
      )
    )
    .pipe(
      webpack({
        ...webpackOpts,
        output: {
          filename: "script.js"
        }
      })
    )
    .pipe(dest(paths.js.dest));

const buildJs = series(buildScripts);

const watchJs = reload => {
  watch([`${paths.js.src}**/*.js`], series(buildJs, reload));
};

module.exports = {
  buildJs,
  watchJs
};
