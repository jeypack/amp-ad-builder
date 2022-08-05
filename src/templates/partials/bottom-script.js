/*
 * NOT MINIFIED
*/
var clickTAGvalue = null,
    landingpagetarget = null,
    initialize = function () {
        //EB.initExpansionParams(0, 0, 300, 600);
        console.log("initialize");
        EGPlus.initAd();
    };

// + SIZMEK/ADKIT +
EGPlus.on('init', function () {
    if (window.adkit) {
        adkit.onReady(initialize);
    } else {
        initialize();
    }
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough SIZMEK');
        EB.clickthrough();
    });
});
// + DCS STUDIO +
EGPlus.on('init', function () {
    if (Enabler.isInitialized()) {
        initialize();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, initialize);
    }
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough DC STUDIO');
        Enabler.exit('Background Exit');
    });
});
// + FT FLASHTALKING +
EGPlus.on('init', function () {
    // 'myFT' is a special var every adfile is automatically populated with
    // especially important if using richload without api call!!!
    EGPlus.ft = myFT;
    // REGISTER FIRST CLICKTAG - (LAST PARAM)
    EGPlus.ft.applyClickTag(EGPlus.$('#bg-exit'), 1);
    initialize();
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough FLASHTALKING');
    });
});
// + AD FORM +
EGPlus.on('init', function () {
    EGPlus.$('svg *[mask], svg *[fill]').trimSvgUrls();
    clickTAGvalue = dhtml.getVar('clickTAG', 'http://www.example.com');
    landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
    initialize();
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough AD FORM');
        window.open(clickTAGvalue, landingpagetarget);
    });
});
// + AD FORM MRAID +
EGPlus.on('init', function () {
    EGPlus.$('svg *[mask], svg *[fill]').trimSvgUrls();
    initialize();
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough AD FORM MRAID');
        mraid.open(Adform.getClickURL('clickTAG'));
    });
});
// + ADW +
EGPlus.on('init', function () {
    initialize();
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough ADWORDS');
        ExitApi.exit();
    });
});
// + GDN DCM LR +
EGPlus.on('init', function () {
    initialize();
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough GDN DCM LR');
        window.open(window.clickTag, '_blank');
    });
});
// + APPNEXUS +
EGPlus.on('init', function () {
    initialize();
    EGPlus.on('clickThrough', function (e) {
        console.log('EGPlus on clickThrough APPNEXUS');
        window.open(APPNEXUS.getClickTag(), '_blank');
    });
});
// + IAB STANDARD +
EGPlus.on('init', function () {
    console.log("EGPlus on init -> IAB STANDARD GOES VIA URL PARAMS");
    // IAB STANDARD CLICKTAG GOES VIA URL PARAMS
    // HANDLED VIA EGPLUS FRAMEWORK
    // NO NEED FOR EXTRA LISTENER
    initialize();
});
