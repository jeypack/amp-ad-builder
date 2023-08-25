
//config.DEV_FOLDER
const config = {
  UID: 0,
  DEVELOPMENT: true,
  //PATH_INCLUDES_SASS: ['bower_components/juiced/sass/'],
  PATH_INCLUDES_SASS: [],
  HTDOCS_PATH: "/Applications/MAMP/htdocs/",
  //AD_CLIENT: 'peugeot_de_',
  //AD_CLIENT: "nissan_united_ch_",
  AD_CLIENT: "astara_nissan_ch_",
  AD_CAMPAIGN: "ASTARA-Crosscarline-QQ",
  //config.AD_CURRENT_INSIDE_INDEX
  /// Used for build (inside length)
  AD_VERSION_DATE: [
    ["V05_230502", "V02_230502", "V02_230502"],
    ["V01_230502", "V01_230502", "V01_230502"],
    ["V01_230502", "V01_230502", "V01_230502"],
  ],
  AD_SIZES: [
    ["300x250", "728x90", "160x600"],
    ["300x250", "728x90", "160x600"],
    ["300x250", "728x90", "160x600"],
  ],
  //used for AD_FLIGHTS && AD_NAMES
  AD_CURRENT_INDEX: 0,
  // next format
  AD_CURRENT_INSIDE_INDEX: 0,
  AD_FORMATS: [
    ["MR", "SB", "WS"],
    ["MR", "SB", "WS"],
    ["MR", "SB", "WS"],
  ],
  //AD_CURRENT_INDEX
  //AD_FLIGHTS: ["flight_2023_05_", "flight_2023_05_", "flight_2023_05_"],
  AD_FLIGHTS: ["web_2023_05_", "web_2023_05_", "web_2023_05_"],
  AD_NAMES: ["ASTARA-CC_Dealer_QQ_DE", "ASTARA-CC_Dealer_QQ_FR", "ASTARA-CC_Dealer_QQ_IT"],
  AD_PREFIX: ["NCH_AMP_CC_", "NCH_AMP_CC_", "NCH_AMP_CC_"],
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