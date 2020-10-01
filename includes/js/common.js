"use strict";

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

var controller = new ScrollMagic.Controller();

// var isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));})(navigator.userAgent||navigator.vendor||window.opera);
var isMobile = ('ontouchstart' in document.documentElement);
var ua = navigator.userAgent;
var isIe = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

var settings = {rollingLinesWidth: [],
                rollingLinesTime: 1000,
                rollingLines: []};

settings.rollingLines = $("*[data-rolling-line]");

var pinScenes = [];

$(window).on("load", function(e){
  $("body").removeClass("loading").removeClass("overflow-dis");
  if ($("body").hasClass("animation")) {
    setTimeout(function(){
      $("body").removeClass("anim-delay");
      var animatedSpans = $(".animated h1 div span, .animated .h1 div span");
      var animatedPs = $(".animated p");
      var animatedIcons = $(".animated .icon");

      for (var i=0; i<animatedSpans.length; i++) {
        new ScrollMagic.Scene({
          triggerElement: animatedSpans[i].parentElement,
          triggerHook: 0.2,
          duration: 200,
          offset: -50
        })
          .setTween(new TweenMax.fromTo(animatedSpans[i], {y: "-0%"}, {y: "-110%", ease: Power2.easeIn}))
          .addTo(controller);
      }

      for (var i=0; i<animatedPs.length; i++) {
        new ScrollMagic.Scene({
          triggerElement: animatedPs[i],
          triggerHook: 0.2,
          duration: 200,
          offset: -100
        })
          .setTween(animatedPs[i], {opacity: 0, ease: Power2.easeIn})
          .addTo(controller);
      }

      for (var i=0; i<animatedIcons.length; i++) {
        new ScrollMagic.Scene({
          triggerElement: animatedIcons[i],
          triggerHook: 0.2,
          duration: 200,
          offset: -200
        })
          .setTween(animatedIcons[i], {opacity: 0, ease: Power2.easeIn})
          .addTo(controller);
      }

      setTimeout(function(){
        $("body").removeClass("animation");
        loadImages();
      }, 1000);
    }, 2000);
  } else {
    loadImages();
  }


  $.each($(".title-big svg"), function(){
    var yCoef = 0.75;
    var parent = $(this).closest(".title-big");
    var spans = $("tspan", this);
    var parentWidth = parent.outerWidth();
    if (spans.length > 0) {
      var rect = spans[0].getClientRects()[0];
      var maxWidth = rect.width;
      var x = rect.width, y = rect.height;
      $(spans[0]).attr("x", 0).attr("y", y*yCoef);
      for (var i=1; i<spans.length; i++) {
        var r = spans[i].getClientRects()[0];
        if (x+r.width > parentWidth) {
          x = 0;
          y += r.height;
        }
        $(spans[i]).attr("x", x).attr("y", y*yCoef);
        x += r.width;
        if (x > maxWidth) { maxWidth = x; }
      }
      $(this).css("width", maxWidth+"px").css("height", (y*yCoef*1.1)+"px");
      if ($(".r", parent).length > 0) {
        $(".r", parent).css({"top": (y-rect.height)*yCoef, "left": x});
      }
    }
  });

  $.each(settings.rollingLines, function(index){
    var div = $(this).children("div:first-child");
    var width = div.outerWidth();
    settings.rollingLinesWidth.push(width);
    var maxWidth = $(window).width();
    if (maxWidth > 2560) { maxWidth = 2560; }

    var shift = 500;
    if ($(window).width() < 601) { shift = 0; }

    for (var i=0; i<Math.ceil((maxWidth+width)/width+shift)-1; i++) {
      div.clone().appendTo(this);
    }

    if ($(window).width() > 600) {
      var rL = new ScrollMagic.Scene({
        triggerElement: settings.rollingLines[index].parentElement,
        triggerHook: 1,
        duration: $(window).height()+$(settings.rollingLines[index].parentElement).outerHeight(),
      })
        .addTo(controller);

      if (isMobile) {
        rL.on("progress", function (e) {
          TweenMax.to(settings.rollingLines[index].parentElement, 0.4, {x: -shift*e.progress*0.4, ease: "none"});
        })
      } else {
        rL.setTween(settings.rollingLines[index].parentElement, {x: -shift, ease: Sine.easeInOut})
      }
    }
  });

  if ($(window).width() > 600) {
    $.each($(".layout-cards.mob-no"), function(){
      var cardsContent = $(".card-content", this);
      var cardsImage = $(".card-image", this);
      var cardsTitle = $(".card-title", this);
      var cardsHeight = $(".card-content-wrap", this).height();

      var cardsTitleOffset = 0, cardsTitleOffsetArray = [], cardsTitleOffsetMax = 0;

      $.each(cardsTitle, function(){
        var h = $(this).outerHeight();
        cardsTitleOffsetMax += h;
        cardsTitleOffsetArray.push(h);
      });

      pinScenes.push(new ScrollMagic.Scene({
            triggerElement: cardsImage[0].parentElement,
            triggerHook: cardTop/$(window).height(),
            duration: cardsHeight*4
          })
          .setPin(cardsImage[0], {pushFollowers: false})
          .addTo(controller));

      for (var i=0; i<cardsContent.length; i++) {
        pinScenes.push(new ScrollMagic.Scene({
          triggerElement: cardsTitle[i].parentElement,
          triggerHook: cardTop/$(window).height(),
          duration: cardsHeight * (cardsContent.length-i) - (cardsTitleOffsetMax-cardsTitleOffset) - (cardsHeight - cardsTitleOffsetMax),
          offset: -cardsTitleOffset
        })
        .setPin(cardsTitle[i], {pushFollowers: false})
        .addTo(controller));

        cardsTitleOffset += cardsTitleOffsetArray[i];

        if (i == cardsContent.length-1) {
          new ScrollMagic.Scene({
            triggerElement: cardsContent[i].parentElement,
            triggerHook: cardTop/$(window).height(),
            duration: cardsHeight/2
          })
          .setTween(cardsContent[i], {opacity: 0, ease: Power1.easeIn})
          .addTo(controller);
        } else {
          pinScenes.push(new ScrollMagic.Scene({
            triggerElement: cardsContent[i].parentElement,
            triggerHook: cardTop/$(window).height(),
            duration: cardsHeight/2
          })
          .setPin(cardsContent[i], {pushFollowers: false})
          .setTween(cardsContent[i], {opacity: 0, ease: Power1.easeIn})
          .addTo(controller));
        }

        if ((i+1) == cardsContent.length) {
          new ScrollMagic.Scene({
            triggerElement: cardsImage[i+1].parentElement,
            triggerHook: cardTop/$(window).height(),
            duration: cardsHeight
          })
          .setTween($(cardsImage[i+1]).children("img"), {y: -(cardsHeight/16)})
          .addTo(controller);
        } else {
          pinScenes.push(new ScrollMagic.Scene({
            triggerElement: cardsImage[i+1].parentElement,
            triggerHook: cardTop/$(window).height(),
            duration: cardsHeight
          })
          .setPin(cardsImage[i+1], {pushFollowers: false})
          .setTween($(cardsImage[i+1]).children("img"), {y: -(cardsHeight/8)})
          .addTo(controller));
        }
      }
    });
  } else {
    $.each($(".layout-cards.mob"), function(){
      var cardsTitle = $(".card-title", this);
      var cardsHeight = $(".card-wrap", this);

      var cardsTitleOffset = 0, cardsHeightOffset = 0, cardsTitleOffsetArray = [], cardsHeightArray = [], cardsTitleOffsetMax = 0, cardsHeightOffsetMax = 0;

      $.each(cardsTitle, function(index){
        var h = $(this).outerHeight();
        if (index != cardsHeight.length-1) {
          cardsTitleOffsetMax += h;
        }
        cardsTitleOffsetArray.push(h);
      });

      $.each(cardsHeight, function(index){
        var h = $(this).outerHeight();
        if (index != cardsHeight.length-1) {
          cardsHeightOffsetMax += h;
        }
        cardsHeightArray.push(h);
      });

      for (var i=0; i<cardsTitle.length-1; i++) {
        pinScenes.push(new ScrollMagic.Scene({
          triggerElement: cardsTitle[i].parentElement,
          triggerHook: 0,
          duration: (cardsHeightOffsetMax - cardsTitleOffsetMax) - cardsHeightOffset + cardsTitleOffset-i,
          offset: -cardsTitleOffset+i
        })
        .setPin(cardsTitle[i], {pushFollowers: false})
        .addTo(controller));

        cardsTitleOffset += cardsTitleOffsetArray[i];
        cardsHeightOffset += cardsHeightArray[i];
      }
    });
  }

  initTabs();
  moveLines(settings.rollingLinesTime);
});

function moveLines(duration) {
  var start = performance.now();
  var worldTime = 0;
  function animate() {
    var progress = worldTime / duration;
    if (++worldTime > duration) {
      worldTime = 0;
    }
    
    $.each(settings.rollingLines, function(index){
      if ($(this).isInViewport()) {
        $(this).css({"transform": "translate3d("+(-progress*settings.rollingLinesWidth[index])+"px, 0, 0)"});
      }
    });

    requestFrame(animate);
  }
  animate();
}

var sectionSliders = [];
var cardTop = 100;
if ($(window).width() < 1025) { cardTop = 80; }

if ($(window).width() < 601) {
  var sectionObjects = $("main:not(.no-pin) .section-obj");
  $.each(sectionObjects, function(i){
    $(this).css("z-index", 2+sectionObjects.length-i);
  });
  var sections = $("main:not(.no-pin) .section-point");
  for (var i=0; i<sections.length; i++) {
    pinScenes.push(new ScrollMagic.Scene({
      triggerElement: sections[i],
      duration: window.outerHeight,
      triggerHook: 0
    })
      .setPin(sectionObjects[i+1])
      // .addIndicators()
      .addTo(controller));
  }
}

function loadedScroll () {
   $(window).on("load", function(){
    var hash = document.location.hash.substring(1).split("-");
    if (hash.length > 1) {
      if (hash[0] == "scrollto") {
        let elem = $("*[data-scroll=\""+hash[1]+"\"]");
        if (elem.length > 0) {
          $("body,html").stop().animate({
              scrollTop: elem.offset().top
            }, 1000, "easeInOutQuad", {
              progress: function() {
                controller.update(true);
              }
            } 
          );
        }
      }
    }
  });
}

if (!isMobile) {
  if (!isIe) {
    new SmoothScroll($("html")[0],120,12);
  } else {
    loadedScroll();
  }
} else {
  loadedScroll();
  $("section:not(.no-anim) .background-clouds").css("position", "fixed");
  $("a[data-scroll-link]").click(function(e) {
    e.preventDefault();
    var hash = $(this).attr("href").substring(1).split("-");
    if (hash.length > 1) {
      if (hash[0] == "scroll") {
        let elem = $("*[data-scroll=\""+hash[1]+"\"]");
        if (elem.length > 0) {
          let top = elem.offset().top;
          if ($(window).width() > 600) {
            $("body,html").stop().animate({
                scrollTop: top
              }, 1000, "easeInOutQuad", {
                progress: function() {
                  controller.update(true);
                }
              } 
            );
          } else {
            if ($("body").hasClass("menu")) {
              $(".button-menu").click();
              if (elem[0].tagName.toLowerCase() != "section") { top += window.outerHeight; }
              setTimeout(function(){
                $("body,html").stop().animate({
                    scrollTop: top
                  }, 1000, "easeInOutQuad", {
                    progress: function() {
                      controller.update(true);
                    }
                  } 
                );
              }, 525);
            } else {
              $("body,html").stop().animate({
                  scrollTop: top
                }, 1000, "easeInOutQuad", {
                  progress: function() {
                    controller.update(true);
                  }
                } 
              );
            } 
          }
        }
      }
    }
  });
}

if ($("*[data-scroll-link]").length > 0) {
  $(window).on("scroll", function(){
    $.each($("*[data-scroll-link] li a[data-scroll-link]"), function(){
      var link = $(this).attr("data-scroll-link");
      var el = $("*[data-scroll=\""+link+"\"]");
      var top = el.offset().top;
      var val = 0;
      if ($(window).width() < 601 && el[0].tagName.toLowerCase() != "section") { val = window.outerHeight; }
      if ($(window).scrollTop() - top + $(window).height()/2 > val) {
        $("*[data-scroll-link] li").removeClass("active");
        $(this).closest("li").addClass("active");
      } else {
        return false;
      }
    });
  });
}

var mainSliders = [];

$(document).on("ready", function(){

  if (!isMobile) {
    var bC = $("section:not(.no-anim) .background-clouds");

    var cloudScene = new ScrollMagic.Scene({
      triggerElement: document.body,
      triggerHook: 0,
      duration: $(window).height()*1.5
    })
      .setTween(bC[0], {top: $(window).height()*0.75})
      .addTo(controller);
  }

  var slidePrevNext = false;

  $.each($(".slider-main"), function(){
    var elem = $(this);
    mainSliders.push(new Swiper(elem[0], {
      speed: 1000,
      preventInteractionOnTransition: true,
      loopAdditionalSlides: 2,
      simulateTouch: false,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next'
      },
      on: {
        click: function(s,e){
          console.log(e);
        },
        slideChangeTransitionStart: function(){
          $(".swiper-slide", elem).removeClass("dv-active");
          $("+ .slider-backgrounds img.active", elem).removeClass("active");
          $("+ .slider-backgrounds img:nth-child("+(this.realIndex+1)+")", elem).addClass("active");
        },
        slideChangeTransitionEnd: function(){
          elem.find(".swiper-slide-active").addClass("dv-active");
          elem.find(".swiper-slide-duplicate-active").addClass("dv-active");
        }
      }
    }));
  });

  $.each($(".slider-section:not(.no-slider)"), function(index){
    $(this).attr("data-index", index);
    var elem = $(this);
    var slidesCount = $(".swiper-slide", this).length;
    sectionSliders.push(new Swiper(elem[0], {
      speed: 1000,
      preventInteractionOnTransition: true,
      loopAdditionalSlides: 2,
      simulateTouch: false,
      // loop: true,
      on: {
        slideChangeTransitionStart: function(){
          $("+ .slider-backgrounds", elem).addClass("anim-dis");
          $("+ .slider-backgrounds img", elem).removeClass("next").removeClass("prev");

          $(".swiper-slide", elem).removeClass("dv-active");
          $(".slider-section-dots li", elem.closest("section")).removeClass("active");
          var activeLi = $(".slider-section-dots li[data-slide=\""+this.activeIndex+"\"]", elem.closest("section"));
          var activeWindow = activeLi.closest(".window");
          if (!activeWindow.hasClass("active")) {
            $(".tabs li[data-window=\""+(activeWindow.attr("data-window"))+"\"] a", activeLi.closest(".object-tabs")).click();
          }
          activeLi.addClass("active");

          var toRight = true;

          if (this.previousIndex > this.activeIndex) { toRight = false;}

          if (toRight) {
            $("+ .slider-backgrounds img[data-slide=\""+(this.activeIndex)+"\"]", elem).addClass("next");
          } else {
            $("+ .slider-backgrounds img[data-slide=\""+(this.activeIndex)+"\"]", elem).addClass("prev");
          }

          var activeIndex = this.activeIndex, previousIndex = this.previousIndex;

          setTimeout(function(){
            $("+ .slider-backgrounds", elem).removeClass("anim-dis");
            $("+ .slider-backgrounds img", elem).removeClass("active").removeClass("next").removeClass("prev");;
            $("+ .slider-backgrounds img[data-slide=\""+(activeIndex)+"\"]", elem).addClass("active");
            if (toRight) {
              $("+ .slider-backgrounds img[data-slide=\""+(previousIndex)+"\"]", elem).addClass("prev");
            } else {
              $("+ .slider-backgrounds img[data-slide=\""+(previousIndex)+"\"]", elem).addClass("next");
            }
          }, 5);
        },
        slideChangeTransitionEnd: function(){
          elem.find(".swiper-slide-active").addClass("dv-active");
          elem.find(".swiper-slide-duplicate-active").addClass("dv-active");
        }
      }
    }));
  });

  setTimeout(function(){
    $(".slider-main, .slider-section").removeClass("anim-dis");
  }, 5);

  var sliderBackgroundsHeight = $(".slider-backgrounds").outerHeight();

  var scene_mainSlider = new ScrollMagic.Scene({
    triggerElement: $(".trigger-1")[0],
    duration: $("#n-0").outerHeight(),
    triggerHook: 0
  })
    .addTo(controller);

    if (!isMobile) {
      let tween = TweenMax.to(".slider-main + .slider-backgrounds img", 0.5, {scale: 1.3, y: function(index, target){ 
        var way = sliderBackgroundsHeight - $(target).height(); 
        if (way < 0) { way = 0; }
        way += 50;
        return way; 
      }, useFrames: true});
      scene_mainSlider.setTween(tween);
    } else {
      scene_mainSlider.on("progress", function (e) {
        let p = (e.progress*(2-e.progress));
        TweenMax.to(".slider-main + .slider-backgrounds img", 0.4, { y: function(index, target){ 
          var way = sliderBackgroundsHeight - $(target).height(); 
          if (way < 0) { way = 0; }
          way += 100;
          return way*p; 
        }, useFrames: true});
      })
    }
});


var dragSliders = $(".slider-drag");
var dragSlidersSwiper = [];

for (var i = 0; i<dragSliders.length; i++) {
  var images = $(dragSliders[i]).find(".img");
  dragSlidersSwiper.push(new Swiper(dragSliders[i], {
    slidesPerView: "auto",
    freeMode: true,
    spaceBetween: 10,
    touchRatio: 0.5,
    // loop: true,
    loopAdditionalSlides: 4,
    on: {
      touchMove: function(s, e) {
        if (sliderCursor != null) {
          sliderCursor.addClass("click");
        }
        sliderCursorController(e.clientX, e.clientY);
      },
      touchMoveOpposite: function(s, e) {
        if (sliderCursor != null) {
          sliderCursor.addClass("click");
        }
        sliderCursorController(e.clientX, e.clientY);
      },
      setTranslate: function(swiper, translate){
        var offsetDelta = translate - swiper.getTranslate();
        for (var j = 0; j < swiper.slides.length; j++) {
          var img = $(".image", $(swiper.slides[j]));
          if (img.length > 0) {
            var imgOffsetLeft = img.offset().left + img.width() + offsetDelta;
            if (imgOffsetLeft >= 0 && imgOffsetLeft < $(window).width() + img.width()) {
              var progress = imgOffsetLeft/($(window).width() + img.width());
              img.find(".img").css({"transform": "translateX("+(-progress*30)+"%)",
                                   "-o-transform": "translateX("+(-progress*30)+"%)",
                                   "-ms-transform": "translateX("+(-progress*30)+"%)",
                                   "-moz-transform": "translateX("+(-progress*30)+"%)",
                                   "-webkit-transform": "translateX("+(-progress*30)+"%)"});
            }
          }
        }
      },
      setTransition: function(swiper, transition){
        for (var j = 0; j < swiper.slides.length; j++) {
          var img = $(".image", $(swiper.slides[j]));
          if (img.length > 0) {
            img.find(".img").css({"transition": "transform "+transition+"ms ease",
                                 "-o-transition": "-o-transform "+transition+"ms ease",
                                 "-ms-transition": "-ms-transform "+transition+"ms ease",
                                 "-moz-transition": "-moz-transform "+transition+"ms ease",
                                 "-webkit-transition": "-webkit-transform "+transition+"ms ease"});
          }
        }
      }
    }
  }));
}

var bodyOverflow;
var menuClosed = true;

$(".button-menu").click(function(){
  if ($("body").hasClass("menu")) {
    $("body").removeClass("menu");
    bodyOverflow = setTimeout(function(){
      if(!$("body").hasClass("menu")) { 
        $("body").removeClass("overflow-dis");
        menuClosed = true;
        fixedElements();
        for (var i=0; i<dragSlidersSwiper.length; i++) {
          dragSlidersSwiper[i].allowTouchMove = true;
        }
      }
    }, 1000);
  } else {
    if (menuClosed) {
      fixedElements();
      menuClosed = false;
      for (var i=0; i<dragSlidersSwiper.length; i++) {
        dragSlidersSwiper[i].allowTouchMove = false;
      }
    }
    setTimeout(function(){
      $("body").addClass("menu");
      $("body").addClass("overflow-dis");
    }, 2);
    clearTimeout(bodyOverflow);
  }
});

function fixedElements () {
  if (menuClosed) {
    $.each($("*[data-save-height]"), function(){
      $(this).height($("this").height());
    });
    $.each($(".scrollmagic-pin-spacer"), function(){
      if ($("> div, > section, > footer", this).css("position") == "fixed") {
        var top = $("> div, > section, > footer", this).offset().top - $(this).offset().top;
        var left = $("> div, > section, > footer", this).offset().left - $(this).offset().left;
        $("> div, > section, > footer", this).css({"position": "absolute", "top": top+"px", "left": left+"px"});
      }
    });
  } else {
    $.each($("*[data-save-height]"), function(){
      $(this).css("height", "auto");
    });
    for (var i=0; i<pinScenes.length; i++) {
      pinScenes[i].update(true);
    }
  }
}

function initTabs () {
  $.each($(".object-tabs:not(.no-tabs)"), function(){
    var li = $(".tabs", this).find("li.active");
    var pointer = $(".tabs", this).find(".pointer");
    setTabPointer(li, pointer);
    setTabWindow($(".windows", this).find(".window.active").attr("data-window"), $(".windows-wrap", this));
  });
}

function setTabPointer (li, pointer) {
  var width = li.outerWidth();
  var offset = li.position();
  pointer.css({"width": width+"px", "left": offset.left, "top": offset.top});
}

function setTabWindow (index, container) {
  $(".window", container).removeClass("active").removeClass("next");
  $.each($(".window", container), function(){
    var i = $(this).attr("data-window");
    if (i > index) {
      $(this).addClass("next");
    } else if (i == index) {
      var height = $(this).outerHeight();
      container.height(height);
      $(this).addClass("active");
    }
  });
}

$(".object-tabs:not(.no-tabs) .tabs a").click(function(e){
  e.preventDefault();
  var container = $(this).closest(".object-tabs");
  var li = $(this).closest("li");
  $(".tabs li", container).removeClass("active");
  setTabPointer(li, $(".pointer", container));
  var index = li.attr("data-window");
  setTabWindow(index, $(".windows-wrap", container));
});

$(".slider-section-dots:not(.no-slider) a").click(function(e){
  e.preventDefault();
  var container = $(this).closest(".slider-section-dots");
  var section = $(this).closest("section");
  var sliderIndex = $(".slider-section", section).attr("data-index");
  var index = $(this).closest("li").attr("data-slide");
  
  sectionSliders[sliderIndex].slideTo(index);
});

$(".slider-section .swiper-button-next").click(function(e){
  e.preventDefault();
  var section = $(this).closest("section");
  var sliderIndex = $(".slider-section", section).attr("data-index");
  if (sectionSliders[sliderIndex].slides.length-1 > sectionSliders[sliderIndex].activeIndex) {
    sectionSliders[sliderIndex].slideNext();
  } else {
    sectionSliders[sliderIndex].slideTo(0);
  }
});

$("input").focus(function(){
  $(this).removeClass("error");
});

if (!isMobile) {
  $.each($(".hover-circle, .hover-circle-button"), function(){
    var width = $(this).outerWidth();
    var inside = $(this).html();
    $(this).html("<div style=\"width:"+(2*width*1.2)+"px;height:"+(2*width*1.2)+"px;margin-left:"+(-width*1.2)+"px;margin-top:"+(-width*1.2)+"px;\" class=\"c\"></div><div class=\"i\">"+inside+"</div>");
  });

  $(".hover-circle, .hover-circle-button").on("mouseenter", function(e){
    var top = e.offsetY;
    var left = e.offsetX;
    $(this).find("> div:first-child").css({"top": top+"px", "left": left+"px"});
  });

  $.each($(".hover-double"), function(){
    var width = $(this).outerWidth();
    var inside = $(this).html();
    $(this).html("<span class=\"h-r\"><span class=\"h-f\">"+inside+"</span><span class=\"h-s\">"+inside+"</span></span>");
  }); 
}

$("main").click(function(e){
  if ($("body").hasClass("menu")) {
    e.preventDefault();
    $(".button-menu").click();
  }
});

if ($(window).width ()> 600) {
  $.each($(".scroll-from-right"), function(){
    new ScrollMagic.Scene({
      triggerElement: $(this)[0],
          triggerHook: 0.8,
          duration: $(window).outerHeight()/4,
    })
      .setTween(new TweenMax.fromTo($(this)[0], {x: "40%", opacity: 0}, {x: "0%", opacity: 1, ease: Power2.easeInOut}))
      .addTo(controller);
  });
}

var requestFrame = function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(func) {
      window.setTimeout(func, 1000 / 50);
    }
  );
}()

var loadImgs = $("*[src]");
var loadCount = loadImgs.length+1;
var loadProgress = 0;

if ($("#mainBackVideo").length > 0 && $(window).width() > 600) {
  $(window).on("load", function(){
    document.getElementById("mainBackVideo").play();
    loadUpdate();
  })
}

for (var i=0; i<loadCount-1; i++) {
  var img = new Image();
  img.src = loadImgs[i].src;
  img.onload = function(){
    loadUpdate();
  }
}

function loadUpdate () {
  loadProgress += 1;
  var p = (loadProgress/(loadCount)*100);
  $(".loader .progress div").css("width", p+"%");
}

var sliderCursor = null;
var sliderCursorMap = null;

function sliderCursorController(x, y) {
  if (sliderCursor != null) {
    sliderCursor.css({"top": y, "left": x});  
  }
}
function sliderCursorMapController(x, y) {
  if (sliderCursorMap != null) {
    sliderCursorMap.css({"top": y, "left": x});  
  }
}


$(window).on("mousemove", function(e){
  sliderCursorController(e.clientX, e.clientY);
  sliderCursorMapController(e.clientX, e.clientY);
  if (sliderCursor != null) {
    sliderCursor.removeClass("click");
  } else if (sliderCursorMap != null) {
    sliderCursorMap.removeClass("click");
  }
});

$(".slider-drag").hover(
  function(e) {
    sliderCursor = $(".slider-cursor",this);
    sliderCursor.addClass("active");
    sliderCursorController(e.clientX, e.clientY);
  },
  function() {
    sliderCursor = null;
    $(".slider-cursor",this).removeClass("active");
  });

$(".cursor-map").hover(
  function(e) {
    sliderCursorMap = $(".slider-cursor",this);
    sliderCursorMap.addClass("active");
    sliderCursorMapController(e.clientX, e.clientY);
  },
  function() {
    sliderCursorMap = null;
    $(".slider-cursor",this).removeClass("active");
  });

function loadImages() {
  $.each($("img[lazy-src]"), function(){
    let src = $(this).attr("lazy-src");
    $(this).attr("src", src);
  });

  if ($(".class-menu").length > 0 && $(window).width() > 600) {
    setTimeout(function(){
        pinScenes.push(new ScrollMagic.Scene({
          triggerElement: $(".class-menu")[0].parentElement,
          triggerHook: 0,
          duration: $(".class-menu").closest(".sidebar").outerHeight() - $(".class-menu").outerHeight()
        })
        .setPin($(".class-menu")[0])
        .addTo(controller));
    }, 50);
  }
}

$(".feedback .close").click(function(){
  $(".feedback").removeClass("active");
  setTimeout(function(){
    $.each($("form"), function(){
      if ($(this).hasClass("ok")) {
        $("input[type=\"text\"], input[type=\"phone\"]", this).val("");
        $("form").removeClass("ok");
      }
    })
  }, 500);
  $("body").removeClass("overflow-dis");
  $("body").removeClass("overflow-dis-y");
})
function openFeedback(i = 0) {
  var inputs = $("form .group-checkbox input[type=\"radio\"]");
  inputs.prop('checked', false);
  if (i < 0 || i > inputs.length-1) { i = 0; }
  $($("form .group-checkbox input[type=\"radio\"]")[i]).prop('checked', true);
  $(".feedback").addClass("active");
  $("body").addClass("overflow-dis");
  $("body").addClass("overflow-dis-y");
}

$(".main-back").click(function(){
  setTimeout(function(){
    $.each($("form"), function(){
      if ($(this).hasClass("ok")) {
        $("input[type=\"text\"], input[type=\"phone\"]", this).val("");
        $("form").removeClass("ok");
      }
    })
  }, 500);
  $(".feedback").removeClass("active");
  $("body").removeClass("overflow-dis");
  $("body").removeClass("overflow-dis-y");
});

// $(window).on('beforeunload', function() {
//     $(window).scrollTop(0);
// });

new ScrollMagic.Scene({
  triggerElement: document.body,
  triggerHook: 0,
  offset: 200
})
  .setClassToggle(".feedback-button-wrap", "active")
  .addTo(controller)

if ($(".background-image:not(.top)").length > 0) {
  var mobDev = 1;
  if ($(window).width() >= 769) {
  
    // var offsetY = $(".background-image:not(.top) > img").offset().top;
    // var shift = $(window).outerHeight() - offsetY - $(".background-image:not(.top) > img").outerHeight();
    // if (shift > 0) {
    //   $(".background-image:not(.top)").css("margin-top", (shift+5)+"px");
    //   var mobDev = 2;
    // }
    new ScrollMagic.Scene({
      triggerElement: document.body,
      triggerHook: 0,
      duration: $(".background-image:not(.top)").parent().outerHeight()/mobDev
    })
      .setTween(".background-image:not(.top) > img", {scale: 1.3, y: 300})
      .addTo(controller);

  } else {
    var offsetY = $(".background-image:not(.top) > img").offset().top;
    new ScrollMagic.Scene({
      triggerElement: document.body,
      triggerHook: 0,
      duration: $(".background-image:not(.top)").parent().outerHeight()/2
    })
      .setTween(".background-image:not(.top) > img", {scale: 1.3, y: 50})
      .addTo(controller);
  }
}

var mobOffset = 0;
if ($(window).width() < 669) { mobOffset = $(window).outerHeight()/2;}

if ($(".bg-img").length > 0) {
  $.each($(".bg-img"), function(){
    new ScrollMagic.Scene({
      triggerElement: this.parentElement,
      triggerHook: 0.5,
      duration: $(window).outerHeight(),
      offset: mobOffset
    })
      .setTween(this, {scale: 1.2, ease: "sine.in"})
      .addTo(controller);
  });
}

if ($(".bg-cloud.left").length > 0) {
  new ScrollMagic.Scene({
    triggerElement: $(".bg-cloud.left")[0].parentElement,
    triggerHook: 0.5,
    duration: $(window).outerHeight(),
    offset: mobOffset
  })
    .setTween(".bg-cloud.left", {scale: 1.1, x: "-50%", ease: "sine.in"})
    .addTo(controller);
}

if ($(".bg-cloud.right").length > 0) {
  new ScrollMagic.Scene({
    triggerElement: $(".bg-cloud.right")[0].parentElement,
    triggerHook: 0.5,
    duration: $(window).outerHeight(),
    offset: mobOffset
  })
    .setTween(".bg-cloud.right", {scale: 1.1, x: "50%", ease: "sine.in"})
    .addTo(controller);
}

if ($(".bg-cloud.top").length > 0) {
  new ScrollMagic.Scene({
    triggerElement: $(".bg-cloud.top")[0].parentElement,
    triggerHook: 0.5,
    duration: $(window).outerHeight()
  })
    .setTween(".bg-cloud.top", {scale: 1.1, y: "-50%", ease: "sine.in"})
    .addTo(controller);
}

if ($(".gallery-slider").length > 0) {
  $.each($(".gallery-slider"), function(){
    var info = $(".slider-info", $(this).closest("section"));
    var a = $(".a", info);
    var b = $(".b", info);
    new Swiper(this, {
      speed: 1000,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function(s) {
          b.text(s.slides.length);
        },
        slideChange: function(s) {
          a.text(s.activeIndex+1);
        }
      }
    });
  });
}

$("*[data-image]").click(function(e){
  e.preventDefault();
  var src = $(this).attr("data-image");
  var image = $("> img", $(this).closest(".image-wrap"))
  var offset = image.offset();
  offset = {top: offset.top - $(window).scrollTop(), left: offset.left};
  $(".image-viewer img").attr("src", src);
  $(".image-viewer").addClass("active");
  $(".image-viewer").removeClass("vertical");
  var scale = 1;
  if (image.height()*$(window).width()/image.width() > $(window).outerHeight()) {
    $(".image-viewer").addClass("vertical");
    scale = image.height()/$(window).outerHeight();
    offset.left -= ($(window).width() - image.width()*$(window).outerHeight()/image.height())/2
  } else {
    scale = image.width()/$(window).width();
    offset.top -= ($(window).outerHeight() - image.height()*$(window).width()/image.width())/2
  }
  $(".image-viewer").addClass("no-trans");
  $(".image-viewer img").css({"transform": "translateY("+offset.top+"px) translateX("+offset.left+"px) scale("+scale+")",
                              "-o-transform": "translateY("+offset.top+"px) translateX("+offset.left+"px) scale("+scale+")",
                              "-ms-transform": "translateY("+offset.top+"px) translateX("+offset.left+"px) scale("+scale+")",
                              "-moz-transform": "translateY("+offset.top+"px) translateX("+offset.left+"px) scale("+scale+")",
                              "-webkit-transform": "translateY("+offset.top+"px) translateX("+offset.left+"px) scale("+scale+")"})
  setTimeout(function(){
    $(".image-viewer").removeClass("no-trans");
    $(".image-viewer").addClass("opened");
    $("body").addClass("overflow-dis");
    $("body").addClass("overflow-dis-y");
  }, 10);
});

$(".image-viewer .close").click(function(){
  $(".image-viewer").removeClass("active");
  $(".image-viewer").removeClass("opened");
  $("body").removeClass("overflow-dis");
  $("body").removeClass("overflow-dis-y");
});

if ($(".text-animated").length > 0) {
  let shift = 25;
  $.each($(".text-animated h1, .text-animated .h1"), function(){
    new ScrollMagic.Scene({
      triggerElement: this.parentElement,
      triggerHook: 1,
      duration: $(window).outerHeight()+$(this.parentElement).outerHeight()
    })
      .setTween(new TweenMax.fromTo(this, {x: (-shift)+"%"}, {x: (shift*0.8)+"%", ease: "sine.in"}))
      .addTo(controller);

    shift *= -1;
  })
}

if ($(".line-partners-wrap").length > 0) {
  $.each($(".line-partners-wrap"), function(){
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1,
      duration: ($(window).outerHeight()+$(this).outerHeight())
    })
      .setTween(this, {x: -($("div", this).outerWidth() - $(this).closest(".layout-main").outerWidth()), ease: "sine.in"})
      .addTo(controller);
  })
}

$(".slider-button-hidden").click(function(e){
  var index = parseInt($(this).attr("data-slider"));
  if ($(this).closest(".slider-section-wrap").length > 0) {
    sectionSliders[index].slideNext();
  } else {
    mainSliders[index].slideNext();
  }
});

$.each($(".gallery:not(.g-video)"), function(){
  var thumbs = $(".slider-thumbs .swiper-container", this);
  var top = $(".slider-g-view .swiper-container", this);

  var info = $(".slider-info", this);
  var a = $(".a", info);
  var b = $(".b", info);

  var galleryThumbs = new Swiper(thumbs[0], {
    speed: 750,
    spaceBetween: 36,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  });
  var galleryTop = new Swiper(top[0], {
    speed: 750,
    spaceBetween: 44,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs
    },
    on: {
      init: function(s) {
        b.text(s.slides.length);
      },
      slideChange: function(s) {
        a.text(s.activeIndex+1);
      }
    }
  });
})

function openGallery (index) {
  $(".gallery").removeClass("active");
  $(".gallery[data-gallery=\""+index+"\"]").addClass("active");
}

$(".gallery .close").click(function(){
  $(".gallery").removeClass("active");
  $.each($("iframe", $(this).closest(".gallery")), function(){
    $(this).attr('src', $(this).attr('src'));
  });
});

$.each($("input[data-type=\"phone\"]"), function(){
  $(this).mask("+7 (999) 999 9999", {autoclear: false});
});

$(window).on('beforeunload', function() { $("video").each( function() {   $(this).get(0).pause(); }); });

$(".feedback .done-button").click(function(e){
  e.preventDefault();
  $(".feedback .close").click();
})