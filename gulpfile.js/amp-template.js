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
const { v4: uuidv4 } = require('uuid');
//config.UID = uuidv4();

//config.DEV_FOLDER
let config = {
  UID: 0,
  DEVELOPMENT: true,
  //PATH_INCLUDES_SASS: ['bower_components/juiced/sass/'],
  PATH_INCLUDES_SASS: [],
  HTDOCS_PATH: "/Applications/MAMP/htdocs/",
  //AD_CLIENT: 'peugeot_de_',
  AD_CLIENT: "nissan_united_at_",
  AD_VERSION_DATE: [
    ["V02_230113", "V01_230113", "V01_230113", "V01_230113"],
    ["V01_230113", "V01_230113", "V01_230113", "V01_230113"],
    ["V01_230113", "V01_230113", "V01_230113", "V01_230113"],
  ],
  AD_SIZES: [
    ["300x250", "160x600", "728x90", "800x250"],
    ["300x250", "160x600", "728x90", "800x250"],
    ["300x250", "160x600", "728x90", "800x250"],
  ],
  //AD_SIZES: ['800x250'],
  AD_CURRENT_INDEX: 0,
  AD_CURRENT_INSIDE_INDEX: 0,
  AD_FORMATS: [
    ["MR", "WS", "SB", "BB"],
    ["MR", "WS", "SB", "BB"],
    ["MR", "WS", "SB", "BB"],
  ],
  //AD_FORMATS: ['BB'],
  AD_FLIGHTS: ["flight_2023_01_", "flight_2023_01_", "flight_2023_01_"],
  AD_NAMES: ["RTU-HB-XTrail", "RTU-HB-QQ", "RTU-HB-JUKE"],
  SRC_PATH_MAIN: "./src/",
  //scr path will be defined inside 'setSrcPath'
  SRC_PATH: "",
  SRC_VENDOR: "./src/vendor/",
  DEV_FOLDER: "./_temp/",
  BUILD_FOLDER: "./_build/",
  BUILD_NAME: "",
  AMP_TEST: "#development=amp4ads",
};
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
  const insideLength = config.AD_SIZES[config.AD_CURRENT_INDEX][config.AD_CURRENT_INDEX].length;
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
  cb();
};

const setSrcPath = (cb) => {
  const name = config.AD_NAMES[config.AD_CURRENT_INDEX];
  config.SRC_PATH = config.SRC_PATH_MAIN + name + "/amp-template-" + config.AD_SIZES[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX] + "/";
  cb();
};

const setBuildName = (cb) => {
  const flight = config.AD_FLIGHTS[config.AD_CURRENT_INDEX];
  const name = config.AD_NAMES[config.AD_CURRENT_INDEX];
  const size = config.AD_SIZES[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  const format = config.AD_FORMATS[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  const version = config.AD_VERSION_DATE[config.AD_CURRENT_INDEX][config.AD_CURRENT_INSIDE_INDEX];
  //"_HTML5_#_AMP_"
  const namePart = "_HTML5_" + flight + name + "_AMP_";
  config.BUILD_NAME = config.AD_CLIENT + format + namePart + size + version;
  cb();
};
// temp
const cleanDirectoryAll = (cb) => {
  del.sync(config.DEVELOPMENT ? [config.DEV_FOLDER + "**"] : [config.BUILD_FOLDER + "**"], {
    force: true,
  });
  cb();
};

const cleanDirectory = (cb) => {
  //del.bind(null, config.DEVELOPMENT ? [config.DEV_FOLDER + '**'] : [config.BUILD_FOLDER + '**']);
  /* del.sync(
    config.DEVELOPMENT
      ? [config.DEV_FOLDER + config.BUILD_NAME + "/**"]
      : [config.BUILD_FOLDER + config.BUILD_NAME + "/**"],
    {
      force: true,
    }
  ); */
  if (!config.DEVELOPMENT) {
    del.sync([config.BUILD_FOLDER + config.BUILD_NAME + "/**"], {
      force: true,
    });
  }
  //clean _temp folder every time!!!
  del.sync([config.DEV_FOLDER + "**"], {
    force: true,
  });
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
  //const output = config.DEVELOPMENT ? 'expanded' : 'compressed';
  const processors = [
    //autoprefixer,
    flexbugsfixer,
  ];
  if (config.DEVELOPMENT) {
    const UID = uuidv4();
    return src(sources)
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
      .pipe(rename("index." + UID + ".css"))
      .pipe(dest(config.SRC_PATH + "scss/"))
      .pipe(
        reload({
          stream: true,
        })
      );
  }
  return src(sources)
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
    .pipe(dest(config.SRC_PATH + "scss/"))
    .pipe(
      reload({
        stream: true,
      })
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
  watch("./src/scss/*.scss", buildHtml);
  watch(config.SRC_PATH + "scss/*.scss", buildHtml);
  watch(config.SRC_PATH + "index.html", buildHtml);
  cb();
};

const combinedTaskDev = series(setSrcPath, setBuildName, enableDevelopment, cleanDirectory, moveAssets, buildHtml);
const combinedTaskBuild = series(setSrcPath, setBuildName, enableProduction, cleanDirectory, moveAssets, buildHtml);

const buildTask = series(
  resetIndex, // 0
  combinedTaskBuild,
  nextIndex, // 1
  combinedTaskBuild
  /* nextIndex, // 2
  combinedTaskBuild,
  nextIndex, // 3
  combinedTaskBuild */
);

exports.default = series(combinedTaskDev, watchDirectory);
exports.build = buildTask;
//exports.clean = series(enableDevelopment, cleanDirectoryAll, enableProduction, cleanDirectoryAll);
