/**
 * GULP ZIPPER PLUGIN
 * AUTHOR: J. Pfeifer (c) 2020-2023
 * LICENSE: GNU GENERAL PUBLIC LICENSE
 */
const log = require("fancy-log");
const fs = require("fs");
const PluginError = require("plugin-error");
const through = require("through2");
const path = require("path");
const zipper = require("zip-local");

const createDirectory = (dir, cb) => {
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) {
      // ignore the error if the folder already exists
      if (err.code === "EEXIST") {
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

//nissan_united_at_MR_HTML5_flight_2023_01_RTU-HB-JUKE_AMP_300x250V02_230113
const getChunks = (basename) => {
  const chunk1 = basename.split("")
};
const getName = (basename) => {};
const getSize = (basename) => {};

// see 'Writing a plugin'
// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
module.exports = (opts, callback) => {
  let destination = opts.destination;
  //console.log('gulp-zipper module.exports destination:', destination);

  //
  let countFiles = 0,
    // encoding could be e.g. utf8
    handleFile = function (file, encoding, next) {
      let that = this,
        //isDirectory = file.isNull(),
        parseObj = path.parse(file.path),
        handle = function (f, p) {
          //console.log('gulp-zipper handle:', p.base);
          if (f) {
            that.push(f);
          }
          if (callback) {
            callback(f, destination, p ? " saved successfully !" : "save failed !");
          }
          next();
        };
      //console.log('gulp-zipper file', 'dir:', isDirectory, 'root:', parseObj.root, 'base:', parseObj.base, 'name:', parseObj.name, 'ext:', parseObj.ext);
      if (file.isStream()) {
        that.emit("error", new PluginError("gulp-zipper", { message: "Streaming not supported" }));
        //console.log('gulp-zipper' + 'file.isStream');
        return next();
      }

      console.log('gulp-zipper handleFile', 'file:', file, 'countFiles:', countFiles);
      // create directory even if it does not exists
      createDirectory(destination, (err) => {
        if (!err) {
          // try zipping a file
          try {
            zipper.zip(file.path, function (error, zipped) {
              if (!error) {
                // compress before exporting
                zipped.compress();
                // get the zipped file as a Buffer
                //let buff = zipped.memory();
                console.log("zip", "parseObj:", parseObj);
                // or save the zipped file to disk
                zipped.save(destination + parseObj.base + ".zip", function (error) {
                  if (!error) {
                    countFiles++;
                    handle(file, parseObj);
                  } else {
                    handle(null, parseObj);
                  }
                });
              }
            });
          } catch (err) {
            console.log("Unable to zip file/directory:", parseObj.base);
            handle(null, parseObj);
          }
        } else {
          that.emit("error", new PluginError("gulp-zipper", { message: err }));
          return next();
        }
      });
    };

  // processing non-binary streams
  return through.obj(handleFile, (cb) => {
    //after all files have benn zipped we finally zip all .zip files that were created
    zipper.zip(destination, function (error, zipped) {
      if (!error) {
        // compress before exporting
        zipped.compress();
        // get the zipped file as a Buffer
        // let buff = zipped.memory();
        let jsonStr = JSON.stringify([{ date: new Date() }]),
          json = JSON.parse(jsonStr),
          stamp = json[0].date.substr(2, 8);
        // or save the zipped file to disk
        zipped.save(destination + opts.name + "-AD-BUNDLE-" + stamp + ".zip", function (error) {
          if (!callback) {
            console.log("ZIPPER  ✔", countFiles, "files/directories successfully zipped :)");
          }
          cb();
        });
      }
    });
  });
};