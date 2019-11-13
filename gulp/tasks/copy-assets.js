const { src, dest, series, watch } = require("gulp");
const plumber = require("gulp-plumber");
const { notify } = require("../utils");
const paths = require("../paths");
const gulpif = require("gulp-if");
const isProduction = process.env.NODE_ENV === "production";

const globs = [
  `${paths.img.src}**/*.{png,jpg,jpeg,webp,svg,ico,xml,webmanifest}`,
  `${paths.fonts.src}**/*.{woff,woff2}`,
  `!${paths.img.src}svg-sprite`,
  `!${paths.img.src}svg-sprite/**`
];

const copyAssets = () =>
  src(globs, {
    base: paths.global.src
  })
    .pipe(
      gulpif(
        !isProduction,
        plumber({
          errorHandler: err => {
            notify("Assets copy error", err);
          }
        })
      )
    )
    .pipe(dest(paths.global.dest));

const watchAssets = reload => {
  watch(globs, series(copyAssets, reload));
};

module.exports = {
  copyAssets,
  watchAssets
};
