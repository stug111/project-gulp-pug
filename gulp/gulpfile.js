const { task, series, parallel } = require("gulp");
const {
  cleanBuild,
  watchSvgIcons,
  watchAssets,
  copyAssets,
  svgSprite,
  watchSass,
  buildSass,
  watchJs,
  buildJs,
  buildPug,
  watchPug
} = require("./tasks");
const server = require("browser-sync");
const paths = require("./paths");

const main = series(
  cleanBuild,
  parallel(copyAssets, svgSprite, buildSass, buildJs, buildPug)
);

const serve = done => {
  server.init({
    server: paths.global.dest,
    port: 3000,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  done();
};

const reload = done => {
  server.reload();
  done();
};

const watch = () => {
  watchSass(reload);
  watchJs(reload);
  watchAssets(reload);
  watchSvgIcons(reload);
  watchPug(reload);
};

task("start", series(main, serve, watch));

task("build", series(main));
