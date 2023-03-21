let config = {
  UID: 0,
  DEVELOPMENT: true,
  //PATH_INCLUDES_SASS: ['bower_components/juiced/sass/'],
  PATH_INCLUDES_SASS: [],
  HTDOCS_PATH: "/Applications/MAMP/htdocs/",
  //AD_CLIENT: 'peugeot_de_',
  AD_CLIENT: "nissan_united_at_",
  AD_CAMPAIGN: "RTU-HB",
  //config.AD_CURRENT_INSIDE_INDEX
  AD_VERSION_DATE: [
    ["V03_230113", "V01_230113", "V01_230113"],
    ["V02_230113", "V01_230113", "V02_230113"],
    ["V02_230113", "V01_230113", "V02_230113"],
  ],
  AD_SIZES: [
    ["300x250", "160x600", "728x90", "800x250"],
    ["300x250", "160x600", "728x90", "800x250"],
    ["300x250", "160x600", "728x90", "800x250"],
  ],
  //used for AD_FLIGHTS && AD_NAMES
  AD_CURRENT_INDEX: 1,
  AD_CURRENT_INSIDE_INDEX: 2,
  AD_FORMATS: [
    ["MR", "WS", "SB", "BB"],
    ["MR", "WS", "SB", "BB"],
    ["MR", "WS", "SB", "BB"],
  ],
  //AD_CURRENT_INDEX
  AD_FLIGHTS: ["flight_2023_01_", "flight_2023_01_", "flight_2023_01_"],
  AD_NAMES: ["RTU-HB-XTrail", "RTU-HB-QQ", "RTU-HB-JUKE"],
  AD_PREFIX: ["NAT_AMP_", "NAT_AMP_", "NAT_AMP_"],
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
//NEW
config = {
  UID: 0,
  DEVELOPMENT: true,
  //PATH_INCLUDES_SASS: ['bower_components/juiced/sass/'],
  PATH_INCLUDES_SASS: [],
  HTDOCS_PATH: "/Applications/MAMP/htdocs/",
  //AD_CLIENT: 'peugeot_de_',
  AD_CLIENT: "nissan_united_ch_",
  AD_CAMPAIGN: "Unplugged-Weeks",
  //config.AD_CURRENT_INSIDE_INDEX
  AD_VERSION_DATE: [
    ["V01_230217", "V01_230217", "V01_230217"],
    ["V01_230217", "V01_230217", "V01_230217"],
    ["V01_230217", "V01_230217", "V01_230217"],
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
  AD_NAMES: ["CH-DE", "CH-FR", "CH-IT"],
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