
//config.DEV_FOLDER
const config = {
  UID: 0,
  DEVELOPMENT: true,
  //PATH_INCLUDES_SASS: ['bower_components/juiced/sass/'],
  PATH_INCLUDES_SASS: [],
  HTDOCS_PATH: "/Applications/MAMP/htdocs/",
  //AD_CLIENT: 'peugeot_de_',
  AD_CLIENT: "nissan_united_ch_",
  AD_CAMPAIGN: "Unplugged-Weeks",
  //config.AD_CURRENT_INSIDE_INDEX
  /// Used for build (inside length)
  AD_VERSION_DATE: [
    ["V05_230217", "V04_230217"],
    ["V04_230217", "V04_230217"],
    ["V04_230217", "V04_230217"],
  ],
  AD_SIZES: [
    ["300x250", "728x90", "160x600", "800x250"],
    ["300x250", "728x90", "160x600", "800x250"],
    ["300x250", "728x90", "160x600", "800x250"],
  ],
  //used for AD_FLIGHTS && AD_NAMES
  AD_CURRENT_INDEX: 0,
  AD_CURRENT_INSIDE_INDEX: 0,
  AD_FORMATS: [
    ["MR", "SB", "WS", "BB"],
    ["MR", "SB", "WS", "BB"],
    ["MR", "SB", "WS", "BB"],
  ],
  //AD_CURRENT_INDEX
  AD_FLIGHTS: ["flight_2023_02_", "flight_2023_02_", "flight_2023_02_"],
  AD_NAMES: ["Unplugged-Weeks-DE", "Unplugged-Weeks-FR", "Unplugged-Weeks-IT"],
  AD_PREFIX: ["NCH_AMP_", "NCH_AMP_", "NCH_AMP_"],
  AD_SUFFIX: ["", "", ""],
  SRC_PATH_MAIN: "./src/",
  //scr path will be defined inside 'setSrcPath'
  SRC_PATH: "",
  SRC_VENDOR: "./src/vendor/",
  DEV_FOLDER: "./_temp/",
  BUILD_FOLDER: "./_build/",
  BUILD_NAME: "",
  AMP_TEST: "#development=amp4ads",
};

module.exports.config = config;