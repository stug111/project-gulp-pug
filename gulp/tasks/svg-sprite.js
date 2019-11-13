const { src, dest, series, watch } = require("gulp");
const svgstore = require("gulp-svgstore");
const plumber = require("gulp-plumber");
const { notify } = require("../utils");
const paths = require("../paths");
const gulpif = require("gulp-if");
const isProduction = process.env.NODE_ENV === "production";
const globs = [`${paths.img.src}svg-sprite/**/*.svg`];

const svgSprite = () =>
  src(globs, {
    base: "sprite"
  })
    .pipe(
      gulpif(
        !isProduction,
        plumber({
          errorHandler: err => {
            notify("SVG sprite error", err);
          }
        })
      )
    )
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(dest(paths.img.dest));

const watchSvgIcons = reload => {
  watch(globs, series(svgSprite, reload));
};

module.exports = {
  svgSprite,
  watchSvgIcons
};
