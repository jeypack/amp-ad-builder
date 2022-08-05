/**
 * ALZA PRODUCT TEMPLATE
 * Author   : J. Pfeifer @egplusww.com
 * Created  : 06.09.2021
 */
(function () {

  'use strict';

  //
  Function.prototype.bindWithFFX = function (thisArg, ffx) {
    //console.log("");
    //console.log("Function -> bindWithFFX", "this.bind:", this.bind, "thisArg:", thisArg, "ffx:", ffx);
    var that = this;
    //args = (arguments.length > 1 ? [arguments[0]] : Array.apply(null, arguments));
    return function (e) {
      //console.log("");
      //console.log("Function -> bindWithFFX", "e:", e);
      if (e.currentTarget && typeof ffx === 'function') {
        ffx(e.currentTarget);
      }
      return that.call(thisArg, e);
    };
  };

  function buttonFFXClickThrough(target) {
    //console.log();
    //console.log("buttonFFXClickThrough", "target:", target);
    gsap.to(target, {
      scale: 1.05,
      duration: 0.2,
      ease: 'back.inOut',
      onComplete: function () {
        gsap.to(target, {
          scale: 0.9,
          duration: 0.25,
          ease: 'back',
          onComplete: function () {
            gsap.to(target, {
              scale: 1,
              duration: 0.3,
              ease: 'back'
            });
          }
        });
      }
    });
  }

  function InitObj(version, modified) {
    this.version = version;
    this.modified = modified;
    window.addEventListener('load', function () { });
  }

  /**
   * ENTRY POINT *
   */
  window.initEGP = function () {
    //egp.version = version;
    //egp.modified = modified;
    console.log("egp:", egp);
    //console.log("languageData:", languageData);
    //
    /* $('body').removeClass('desktop mobile').addClass(OS_SYSTEM === 'desktop' ? 'desktop' : 'mobile');
    //
    window.addEventListener('load', function () {

    }, false);
    //stop scaling on iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.document.addEventListener('touchmove', function (e) {
        if (e.scale !== 1) {
          e.preventDefault();
        }
      }, {
        passive: false
      });
    }
    if (OS_SYSTEM === 'desktop') {
      window.addEventListener("resize", function () {
        setTimeout(function () {
          //console.log("");
          //console.log("OS_SYSTEM", OS_SYSTEM);
          //console.log("gameModel.state", gameModel.state);
          //console.log("the orientation of the device is now " + window.screen.orientation.angle);
          if (gameModel.state === lib.GameModel.STATE_INTRO || gameModel.state === lib.GameModel.STATE_LOAD) {
            resize();
            game.resizeGame();
          }
        });
      });
    } */
  };

}());
