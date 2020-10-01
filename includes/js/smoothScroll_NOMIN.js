"use strict";
function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body)
      
  var moving = false
  target.scrollTop = 0;
  var pos = 100;
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target

  var mousewheelActive = false, mouseDown = false;
  
  target.addEventListener('mousewheel', scrolled, { passive: false })
  target.addEventListener('DOMMouseScroll', scrolled, { passive: false })
  window.addEventListener("mousedown", function(e){
    if (e.target == $("html")[0])
      mouseDown = true;
  });
  window.addEventListener("mouseup", function(){
    mouseDown = false;
  });

  var autoScrolling = false;
  var start = true;

  window.addEventListener('scroll', function(e){
    if (autoScrolling && ((mousewheelActive || mouseDown))) {
      autoScrolling = false;
      $("body,html").stop();
    }
    if (!mousewheelActive || (mousewheelActive && mouseDown)) {
      if (start) {
        target.scrollTop = 0;
        pos = 0;
      } else {
        target.scrollTop = target.scrollTop;
        pos = target.scrollTop;
      }
    }
  });

  $("a[data-scroll-link]").click(function(e) {
    e.preventDefault();
    var hash = $(this).attr("href").substring(1).split("-");
    if (hash.length > 1) {
      if (hash[0] == "scroll") {
        start = false;
        autoScrolling = true;
        let elem = $("*[data-scroll=\""+hash[1]+"\"]");
        if (elem.length > 0) {
          moving = false;
          autoScrolling = true;
          pos = elem.offset().top;

          // mousewheelActive = true;
          // if (!moving) update()

          $(target).stop().animate({
              scrollTop: elem.offset().top
            }, 1000, "easeInOutQuad", {
                progress: function() {
                    controller.update(true);
                },
                complete: function(){
                  target.scrollTop = target.scrollTop;
                  pos = target.scrollTop;
                  autoScrolling = false;
                }
            } 
          );
        }
      }
    }
  });

  $(window).on("load", function(){
    var hash = document.location.hash.substring(1).split("-");
    if (hash.length > 1) {
      if (hash[0] == "scrollto") {
        start = false;
        autoScrolling = true;
        let elem = $("*[data-scroll=\""+hash[1]+"\"]");
        if (elem.length > 0) {
          moving = false;
          autoScrolling = true;
          pos = elem.offset().top;

          $(target).stop().animate({
              scrollTop: elem.offset().top
            }, 1000, "easeInOutQuad", {
                progress: function() {
                    controller.update(true);
                },
                complete: function(){
                  target.scrollTop = target.scrollTop;
                  pos = target.scrollTop;
                  autoScrolling = false;
                }
            } 
          );
        }
      }
    }
  });

  function scrolled(e) {
    start = false;
    if (!$("body").hasClass("overflow-dis")) {
      mousewheelActive = true;
      e.preventDefault();
      
      var delta = normalizeWheelDelta(e)

      pos += -delta * speed
      pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight))
      
      if (!moving) update()
    } else if (!$("body").hasClass("menu") && !$("body").hasClass("overflow-dis-y")) {
      e.preventDefault();
    }
  }

  function normalizeWheelDelta(e){
    if(e.detail){
      if(e.wheelDelta)
        return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1)
      else
        return -e.detail/3
    }else
      return e.wheelDelta/120
  }

  function update() {
    moving = true
    
    var delta = (pos - target.scrollTop) / smooth
    
    target.scrollTop += delta

    if (!mousewheelActive || (mousewheelActive && mouseDown)) {
      moving = false;
    }
    
    if (Math.abs(delta) >= 1 && moving) {
      requestFrame(update)
    } else {
      moving = false;
      mousewheelActive = false;
    }
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
}