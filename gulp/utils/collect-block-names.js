const fs = require("fs-extra");

const collectFileNames = filesPath =>
  fs.readdirSync(filesPath, "utf8").reduce((acc, block) => {
    const stat = fs.statSync(`${filesPath}/${block}`);

    if (stat.isDirectory()) {
      collectFileNames(`${filesPath}/${block}`).forEach(subBlock =>
        acc.push(`${block}/${subBlock}`)
      );
    } else {
      acc.push(block);
    }

    return acc;
  }, []);

const collectBlockNames = (blocksPath, extension) => {
  extension = new RegExp(`\.(${extension})$`, "i");

  return collectFileNames(blocksPath).filter(block => extension.test(block));
};

module.exports = collectBlockNames;
