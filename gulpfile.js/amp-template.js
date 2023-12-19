/**
 * GULP AMP BANNER BUILDER TOOL
 * AUTHOR: J. Pfeifer (c) 2021-2023
 */
const { watch, series, parallel, src, dest } = require("gulp");
//const gulpif = require('gulp-if');
//const concat = require('gulp-concat');
const data = require("gulp-data");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const flexbugsfixer = require("postcss-flexbugs-fixes");
const htmlReplace = require("gulp-html-replace");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const del = require("del");
const { v4: uuidv4 } = require("uuid");
//config.UID = uuidv4();
const zipper = require("./gulp-zipper");
const capture = require("./gulp-capture-website");
//const { config } = require("./amp/config-unplugged-weeks");
//const { config } = require("./amp/config-ASTARA-RRG-Glattpark");
//const { config } = require("./amp/config-ASTARA-CC-Dealer-ARIYA");
//const { config } = require("./amp/config-ASTARA-CC-Dealer-JUKE");
//const { config } = require("./amp/config-ASTARA-CC-Dealer-QQ");
//const { config } = require("./amp/config-ASTARA-CC-Dealer-XTRAIL");
//const { config } = require("./amp/config-NISSAN-QQ-Dealer-STD");
//const { config } = require("./amp/config-NISSAN-QQ-Dealer-BERLIN");
const { config } = require("./amp/config-ASTARA-Winter-Dealer-ARIYA-XTRAIL");

//config.DEV_FOLDER

//XXXXX FIRMA XXXXX<br>XXXXX MUSTERSTRASSE XXXXX<br>XXXXX MUSTERSTADT XXXXX<br>XXXX TEL.-NR. XXXX
//nissan_united_de_BB_HTML5_flight_2021_07_QQ_Digital_RTU_Update_800x250V01_210730
const enableDevelopment = (cb) => {
  config.DEVELOPMENT = true;
  cb();
};

const enableProduction = (cb) => {
  config.DEVELOPMENT = false;
  cb();
};

const resetIndex = (cb) => {
  config.AD_CURRENT_INSIDE_INDEX = 0;
  config.AD_CURRENT_INDEX = 0;
  cb();
};

const nextIndex = (cb) => {
  const names = config.AD_NAMES;
  const length = names.length;
  const insideLength = config.AD_VERSION_DATE[0].length;
  const nextIndex = config.AD_CURRENT_INDEX + 1;
  const nextInsideIndex = config.AD_CURRENT_INSIDE_INDEX + 1;
  if (nextInsideIndex < insideLength) {
    config.AD_CURRENT_INSIDE_INDEX = nextInsideIndex;
  } else {
    if (nextIndex < length) {
      //we set this inside if to stop looping
      config.AD_CURRENT_INSIDE_INDEX = 0;
      config.AD_CURRENT_INDEX = nextIndex;
    } else {
      //return false;
      cb();
    }
  }
  console.log(config.AD_VERSION_DATE[config.AD_CURRENT_INDEX][0]);
  console.log("length:", length, "insideLength:", insideLength, "nextIndex:", nextIndex, "nextInsideIndex:", nextInsideIndex);
  cb();
};

const setSrcPath = (cb) => {
  const name = config.AD_NAMES[config.AD_CURRENT_INDEX];
  config.SRC_PATH = config.SRC_PATH_MAIN + name + "/amp-template-" + config.AD_SIZES[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX] + "/";
  cb();
};

const setDevName = (cb) => {
  const flight = config.AD_FLIGHTS[config.AD_CURRENT_INDEX];
  const name = config.AD_NAMES[config.AD_CURRENT_INDEX];
  const size = config.AD_SIZES[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  const format = config.AD_FORMATS[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  const version = config.AD_VERSION_DATE[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  //"_HTML5_#_AMP_"
  const namePart = "_HTML5_" + flight + name + "_";
  config.BUILD_NAME = config.AD_CLIENT + format + namePart + size + version;
  /* const prefix = config.AD_PREFIX[config.AD_CURRENT_INDEX];
  const suffix = config.AD_SUFFIX[config.AD_CURRENT_INDEX];
  config.BUILD_NAME = prefix + name + suffix + "_" + size; */
  console.log("BUILD_NAME:", config.BUILD_NAME);
  cb();
};

const setBuildName = (cb) => {
  //const flight = config.AD_FLIGHTS[config.AD_CURRENT_INDEX];
  const name = config.AD_NAMES[config.AD_CURRENT_INDEX];
  const size = config.AD_SIZES[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  //const format = config.AD_FORMATS[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  //const version = config.AD_VERSION_DATE[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  const prefix = config.AD_PREFIX[config.AD_CURRENT_INDEX];
  const suffix = config.AD_SUFFIX[config.AD_CURRENT_INDEX];
  config.BUILD_NAME = prefix + name + suffix + "_" + size;
  console.log("BUILD_NAME:", config.BUILD_NAME);
  cb();
};

// ++++++
const captureAd = () => {
  return capture.make({
    defaultWhiteBackground: true,
    dest: config.BUILD_FOLDER + "fallbacks/",
    root: config.BUILD_FOLDER,
    delay: 5000,
    streamType: "jpeg",
    // takes ads folder name as filename
    basePathNames: true,
    insideFallbackFolder: true,
    // write image to ad folder or if false inside fallbacks folder
    insideFolder: false,
    getSizeFromFolderName: true,
    filename: "fallback", // is only used if 'basePathNames' is false or undefined
    autoQuality: true,
    quality: 80,
  });
};

const fallbacksFromDest = (cb) => {
  return src(config.BUILD_FOLDER + "*/index.html").pipe(captureAd());
};

const zip = (cb) => {
  const prefix = config.AD_PREFIX[config.AD_CURRENT_INDEX];
  const suffix = config.AD_SUFFIX[config.AD_CURRENT_INDEX];
  //let stream = src([config.BUILD_FOLDER + "*", "!" + config.BUILD_FOLDER + "zip"]);
  return src([config.BUILD_FOLDER + "*", "!" + config.BUILD_FOLDER + "zip"]).pipe(
    zipper({ destination: config.BUILD_FOLDER + "zip/", campaign: config.AD_CAMPAIGN, prefix: prefix, suffix: suffix })
  );
};

const cleanDirectoryAll = (cb) => {
  del.sync(config.DEVELOPMENT ? [config.DEV_FOLDER + "**"] : [config.BUILD_FOLDER + "**"], {
    force: true,
  });
  cb();
};

const cleanDirectoryBuild = (cb) => {
  del.sync([config.BUILD_FOLDER + "**"], {
    force: true,
  });
  cb();
};

const cleanDirectory = (cb) => {
  //del.bind(null, config.DEVELOPMENT ? [config.DEV_FOLDER + '**'] : [config.BUILD_FOLDER + '**']);
  if (!config.DEVELOPMENT) {
    del.sync([config.BUILD_FOLDER + config.BUILD_NAME + "/**"], {
      force: true,
    });
  }
  //clean _temp folder every time!!!
  del.sync([config.DEV_FOLDER + "**"], {
    force: true,
  });
  //remove .css files out of src files!
  del.sync([config.SRC_PATH_MAIN + "**/*.css"], {
    force: true,
  });
  cb();
};

const moveAssets = (cb) => {
  const destination = config.DEVELOPMENT ? config.DEV_FOLDER + config.BUILD_NAME : config.BUILD_FOLDER + config.BUILD_NAME;
  return src(config.SRC_PATH + "img/**/*").pipe(dest(destination + "/img/"));
};

//Helper
const createSassCss = (sources) => {
  const destination = config.DEV_FOLDER + config.BUILD_NAME;
  //const output = config.DEVELOPMENT ? 'expanded' : 'compressed';
  const processors = [
    //autoprefixer,
    flexbugsfixer,
  ];
  if (config.DEVELOPMENT) {
    const UID = uuidv4();
    return (
      src(sources)
        .pipe(
          sass
            .sync({
              outputStyle: "expanded",
              precision: 10,
              includePaths: [],
            })
            .on("error", sass.logError)
        )
        .pipe(postcss(processors))
        //.pipe(rename("index." + UID + ".css"))
        .pipe(rename("index.min.css"))
        .pipe(dest(destination + "/"))
        .pipe(
          reload({
            stream: true,
          })
        )
    );
  }
  return (
    src(sources)
      .pipe(
        sass
          .sync({
            outputStyle: "expanded",
            precision: 10,
            includePaths: [],
          })
          .on("error", sass.logError)
      )
      .pipe(postcss(processors))
      //.pipe(rename("index.css"))
      //.pipe(dest(config.SRC_PATH + "scss/"))
      .pipe(cssnano({ safe: true }))
      .pipe(rename("index.min.css"))
      .pipe(dest(destination + "/"))
      .pipe(
        reload({
          stream: true,
        })
      )
  );
};

//ACTIVATE THIS FOR INLINE BUILD
const buildHtml = (cb) => {
  const sourcesScss = [config.SRC_PATH + "scss/index.scss"];
  const destination = config.DEVELOPMENT ? config.DEV_FOLDER + config.BUILD_NAME : config.BUILD_FOLDER + config.BUILD_NAME;
  const scssStream = createSassCss(sourcesScss);
  return src(config.SRC_PATH + "index.html")
    .pipe(
      htmlReplace({
        css: {
          src: scssStream,
          tpl: "<style amp-custom>%s</style>",
        },
      })
    )
    .pipe(rename("index.html"))
    .pipe(dest(destination))
    .pipe(
      reload({
        stream: true,
      })
    );
};

// Watch Files For Changes
const watchDirectory = (cb) => {
  // proxy for MAMP htdocs
  /*browserSync.init({
  	proxy: "http://localhost/banner/bankcler/index-dev.php"
  });*/
  browserSync.init({
    // Open the site in Chrome & Firefox
    //browser: ["google chrome", "firefox"],
    // Wait for 0.15 seconds before any browsers should try to inject/reload a file.
    reloadDelay: 150,
    // Don't show any notifications in the browser.
    notify: false,
    port: 9000,
    //server: "temp"
    server: {
      //directory: true,
      index: "index.html",
      baseDir: config.DEVELOPMENT ? config.DEV_FOLDER + config.BUILD_NAME : config.BUILD_FOLDER + config.BUILD_NAME,
    },
  });
  /* function handleChange(event) {
  	console.log('File ' + event.path + ' was changed');
  	reload();
  } */
  //gulp.watch("./build/**/*.html").on("change", handleChange);
  //watch([config.SRC_PATH + 'js/*.js', '!' + config.SRC_PATH + 'js/*.min.js'], buildHtml);
  watch(config.SRC_PATH + "img/**", series(moveAssets, buildHtml));
  watch("./src/**", buildHtml);
  //watch("./src/scss/*.scss", buildHtml);
  //watch(config.SRC_PATH + "scss/*.scss", buildHtml);
  //watch(config.SRC_PATH + "index.html", buildHtml);
  cb();
};

const combinedTaskDev = series(setSrcPath, setDevName, enableDevelopment, cleanDirectory, moveAssets, buildHtml);
const combinedTaskBuild = series(setSrcPath, setBuildName, enableProduction, cleanDirectory, moveAssets, buildHtml);
const combinedTask = series(combinedTaskBuild, nextIndex);

const buildTask = series(
  cleanDirectoryBuild,
  resetIndex, // 0-0
  //Model
  combinedTask, // DE-1
  combinedTask, // DE-2
  combinedTask, // DE-3
  combinedTask, // FR-1
  combinedTask, // FR-2
  combinedTask, // FR-3
  combinedTask, // IT-1
  combinedTask, // IT-2
  combinedTask, // IT-3
  fallbacksFromDest,
  zip
);

exports.default = series(combinedTaskBuild, combinedTaskDev, watchDirectory);
exports.zip = series(zip);
exports.build = buildTask;
//exports.clean = series(enableDevelopment, cleanDirectoryAll, enableProduction, cleanDirectoryAll);
