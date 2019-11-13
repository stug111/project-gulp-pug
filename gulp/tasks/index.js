const { cleanBuild } = require("./clean-build");
const { copyAssets, watchAssets } = require("./copy-assets");
const { svgSprite, watchSvgIcons } = require("./svg-sprite");
const { buildSass, watchSass } = require("./sass");
const { buildJs, watchJs } = require("./js");
const { buildPug, watchPug } = require("./pug");

module.exports = {
  cleanBuild,
  copyAssets,
  watchAssets,
  svgSprite,
  watchSvgIcons,
  buildSass,
  watchSass,
  buildJs,
  watchJs,
  buildPug,
  watchPug
};
