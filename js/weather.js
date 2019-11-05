//swipeup and swipedown
(function () {
    var supportTouch = $.support.touch,
      scrollEvent = "touchmove scroll",
      touchStartEvent = supportTouch ? "touchstart" : "mousedown",
      touchStopEvent = supportTouch ? "touchend" : "mouseup",
      touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
      setup: function () {
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function (event) {
          var data = event.originalEvent.touches ?
            event.originalEvent.touches[0] :
            event,
            start = {
              time: (new Date).getTime(),
              coords: [data.pageX, data.pageY],
              origin: $(event.target)
            },
            stop;
  
          function moveHandler(event) {
            if (!start) {
              return;
            }
            var data = event.originalEvent.touches ?
              event.originalEvent.touches[0] :
              event;
            stop = {
              time: (new Date).getTime(),
              coords: [data.pageX, data.pageY]
            };
  
            // prevent scrolling
            if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
              event.preventDefault();
            }
          }
          $this
            .bind(touchMoveEvent, moveHandler)
            .one(touchStopEvent, function (event) {
              $this.unbind(touchMoveEvent, moveHandler);
              if (start && stop) {
                if (stop.time - start.time < 1000 &&
                  Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                  Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                  start.origin
                    .trigger("swipeupdown")
                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                }
              }
              start = stop = undefined;
            });
        });
      }
    };
    $.each({
      swipedown: "swipeupdown",
      swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
      $.event.special[event] = {
        setup: function () {
          $(this).bind(sourceEvent, $.noop);
        }
      };
    });
  
  })();
  
  //main JS
  (function () {
    $(document).on('pageinit', '#home', function () {
  
      $('#temp-change').on('change', function () {
        $('#city-temp-f,#city-temp-c').addClass('temphide');
        if ($('#tempbtn-f').prop('checked')) {
          $('#city-temp-f').removeClass('temphide');
        }
        if ($('#tempbtn-c').prop('checked')) {
          $('#city-temp-c').removeClass('temphide');
        }
      });
  
      $(document).on('swipeup', _swipeup);
      $(document).on('swipedown', _swipedown);
      $(document).on('swipeleft', _swipeleft);
      $(document).on('swiperight', _swiperight);
  
      $('.sd').hover(function () {
        $(document).off('swiperight', _swiperight);
      }, function () {
        $(document).on('swiperight', _swiperight);
      });
  
      function _swipeup() {
        //temp
        $('#city-name').addClass('city-name-hide-time');
        $('#city-temp').addClass('city-temp-hide-time');
        $('#city-description').addClass('city-description-hide-time');
        $('#city-name').addClass('city-name-hide');
        $('#city-temp').addClass('city-temp-hide');
        $('#city-description').addClass('city-description-hide');
        $('#tempbtn-c').addClass('tempbtn-c-hide');
        $('#tempbtn-f').addClass('tempbtn-f-hide');
        $('#wind1,#moon1').addClass('topturn');
        //week
        $('#week').addClass('week-bg');
        $('#week-title').addClass('weektitle-show-time');
        $('#week-title').addClass('week-show');
        for (var i = 1; i <= 7; i++) {
          $('#week' + i).addClass('week' + i + '-show-time');
          $('#week' + i).addClass('week-show');
        }
  
        setTimeout(function () {
          //temp
          $('#city-name').removeClass('city-name-hide-time');
          $('#city-temp').removeClass('city-temp-hide-time');
          $('#city-description').removeClass('city-description-hide-time');
          $('#city-name').addClass('city-name-show-time');
          $('#city-temp').addClass('city-temp-show-time');
          $('#city-description').addClass('city-description-show-time');
          //week
          $('#week-title').removeClass('weektitle-show-time');
          $('#week-title').addClass('weektitle-hide-time');
          for (var j = 1; j <= 7; j++) {
            $('#week' + j).removeClass('week' + j + '-show-time');
            $('#week' + j).addClass('week' + j + '-hide-time');
          };
        }, 750);
      }
  
      function _swipedown() {
        //temp
        $('#city-name').removeClass('city-name-hide');
        $('#city-temp').removeClass('city-temp-hide');
        $('#city-description').removeClass('city-description-hide');
        //week
        $('.week-temp').removeClass('week-show');
        $('#week').removeClass('week-bg');
        $('#wind1,#moon1').removeClass('topturn');
        setTimeout(function () {
          //temp
          $('#city-name').removeClass('city-name-show-time');
          $('#city-temp').removeClass('city-temp-show-time');
          $('#city-description').removeClass('city-description-show-time');
          $('#tempbtn-c').removeClass('tempbtn-c-hide');
          $('#tempbtn-f').removeClass('tempbtn-f-hide');
          //week
          $('#week-title').removeClass('weektitle-hide-time');
          for (var i = 1; i <= 7; i++) {
            $('#week' + i).removeClass('week' + i + '-hide-time');
          }
        }, 750);
      }
  
      function _swipeleft() {
        $('#menu-panel').addClass('menu-panel-show');
        $(document).off('swipeup', _swipeup);
        $(document).off('swipedown', _swipedown);
        //$('paper-slider').addClass('sd');
      }
  
      function _swiperight() {
        $('#menu-panel').removeClass('menu-panel-show');
        setTimeout(function () {
          $(document).on('swipeup', _swipeup);
          $(document).on('swipedown', _swipedown);
        }, 500)
      }
    });
  })();