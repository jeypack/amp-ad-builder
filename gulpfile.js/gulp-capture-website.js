/**
 * GULP CAPTURE WEBSITE
 * AUTHOR: J. Pfeifer (c) 2019-2023
 */
const fs = require("fs");
const filesize = require("filesize");
const PluginError = require("plugin-error");
const through = require("through2");
//path.join('a', 'b') === 'a/b'
const path = require("path");
const puppeteer = require("puppeteer");

const createDirectory = (dir, cb) => {
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) {
      // ignore the error if the folder already exists
      if (err.code == "EEXIST") {
        cb(null);
      } else {
        // something else went wrong
        cb(err);
      }
    } else {
      // successfully created folder
      cb(null);
    }
  });
};

// through2 capture-website based on puppeteer
exports.make = (opt) => {
  if (!opt) {
    opt = {};
  }

  opt.p = opt.p || 9500;
  opt.streamType = opt.streamType || "jpeg";

  if (!opt.screenSize) {
    opt.screenSize = {
      width: 1440,
      height: 900,
    };
  }
  //console.log('gulp-webshot-egp opt.dest:', opt.dest));
  if (!opt.dest) {
    opt.dest = "./output/fallbacks/";
  }
  //console.log('gulp-webshot-egp opt.dest:', opt.dest));

  if (!opt.basePathNames) {
    opt.basePathNames = false;
  }

  if (!opt.insideFolder) {
    opt.insideFolder = false;
  }

  //
  let counter = 0;

  const getSizeFromName = (name) => {
    const regex = /([0-9]+)x([0-9]+)/;
    let size = regex.exec(name);
    try {
      return {
        index: size.index,
        raw: size[0],
        name: size.input,
        width: parseInt(size[1], 10),
        height: parseInt(size[2], 10),
      };
    } catch (e) {}
    return {
      index: -1,
      raw: "1440x900",
      name: name,
      width: 1440,
      height: 900,
    };
  };

  const getDynQuality = (size) => {
    if (opt.autoQuality) {
      if (size.width <= 320 && size.height <= 250) {
        return 95;
      } else if (size.width <= 160 && size.height <= 600) {
        return 90;
      } else if (size.width <= 728 && size.height <= 90) {
        return 95;
      } else if (size.width > 728 && size.height > 90) {
        return 48;
      } else if (size.width >= 300 && size.height === 600) {
        return 64;
      } else {
        return 59;
      }
    }
    return opt.quality;
  };

  const handleFile = function (file, enc, next) {
    const that = this;
    let size;
    counter++;

    if (!opt.root) {
      this.emit("error", new PluginError("gulp-capture-website", "Please root directory"));
      console.log('Please root directory root: "build"');
      return next();
    }

    if (!opt.shotSize) {
      opt.shotSize = {
        width: 1440,
        height: 900,
      };
    }

    if (file.isNull()) {
      this.push(file);
      return next();
    }

    if (file.isStream()) {
      this.emit("error", new PluginError("gulp-capture-website", "Streaming not supported"));
      return next();
    }

    if (!opt.root) {
      this.emit("error", new PluginError("gulp-capture-website", "Missing root..."));
      return next();
    }

    //const pathArr = path.dirname(file.path).split(path.sep);
    const basepath = path.relative(opt.root, path.dirname(file.path));
    const destPath = opt.dest + basepath + "." + opt.streamType;
    //file.relative e.g. FY21_SEP_NewQQ_DIS_H5_300x600_BAT_AT/index.html
    //path.basename(file.relative, '.html') e.g. index
    //get destination for file
    //destination = 'file:///' + pathArr.slice(0, -1).join('/') + '/fallbacks/';
    //urlPath = url.resolve('http://localhost:' + opt.p, file.relative.slice(1));

    //console.log('FALLBACK', 'file.relative:', file.relative);

    if (opt.filename) {
      if (opt.basePathNames) {
        opt.filename = basepath;
      }
    }

    if (opt.getSizeFromFolderName) {
      size = getSizeFromName(basepath);
      //console.log('FALLBACK', 'size:', size.raw, 'width:', size.width, 'height:', size.height);
      opt.screenSize.width = opt.shotSize.width = size.width;
      opt.screenSize.height = opt.shotSize.height = size.height;
      //console.log('FALLBACK', 'opt.screenSize:', opt.screenSize, 'opt.shotSize:', opt.shotSize);
    }

    // full size or simple keeping fallbacks small
    opt.quality = getDynQuality(size);

    //console.log('FALLBACK', 'opt.dest:', opt.dest);
    /* console.log('FALLBACK', 'root:', opt.root);
        console.log('FALLBACK', 'filename:', filename);
        console.log('FALLBACK', 'pathArr:', pathArr);
        console.log('FALLBACK', 'basepath:', basepath);
        console.log('FALLBACK', 'destination:', destination);
        console.log('FALLBACK', 'file.path:', file.path);
        console.log('FALLBACK', 'filename:', grey.bold(filename)); */

    //this.emit('error', new PluginError('gulp-capture-website', err));
    const capture = async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width: opt.screenSize.width,
        height: opt.screenSize.height,
        deviceScaleFactor: 1,
      });
      //await page.waitForTimeout(500);
      await page.goto("file:///" + file.path + "?egpfallback=1", {
        //load"|"domcontentloaded"|"networkidle0"|"networkidle2
        //waitUntil: 'domcontentloaded',
        waitUntil: "load",
      });

      //await page.waitForTimeout(500);

      //await page.click('#bg-exit');
      //const divCount = await page.$$eval('div', divs => divs.length);
      //await page.waitForFunction(selector => !!document.querySelector(selector), {}, '#anim');
      //await page.waitForFunction((selector) => !!document.querySelector(selector), {}, '#anim');

      /* await page.waitForTimeout(12000).then(() => {
        console.log('Before Screenshot!')
      }); */
      await page.waitForTimeout(20000);

      await page.screenshot({
        path: destPath,
        type: opt.streamType,
        quality: opt.quality,
        clip: {
          x: 0,
          y: 0,
          width: opt.screenSize.width,
          height: opt.screenSize.height,
        },
        captureBeyondViewport: true,
      });

      //await page.waitForTimeout(150).then(() => console.log('Waited 150 ms before browser close!'));
      await page.waitForTimeout(150);

      await browser.close();

      const stats = fs.statSync(destPath);
      const fileSizeInKb = filesize(stats.size, {
        round: 0,
      });
      console.log("FALLBACK ✔ ", counter, basepath, " (", fileSizeInKb, "- quality:", opt.quality, ") ");
      //console.log('FALLBACK', (filename.split('.')[0] + 'fallback.jpg'));
      next();
    };
    // create directory even if it does not exists
    createDirectory(opt.dest, (err) => {
      if (!err) {
        capture();
        that.push(file);
      } else {
        that.emit("error", new PluginError("gulp-zipper", { message: err }));
        return next();
      }
    });
    //this.push(file);
  };
  //console.log('Quality: ', opt.quality);

  return through.obj(handleFile, function (done) {
    console.log("FALLBACK", "==== DONE FALLBACKS :)");
    //console.log('FALLBACK', JSON.stringify(opt.data, null, '\t'));
    done();
  });
};
