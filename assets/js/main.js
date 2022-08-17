$(function () {
  $(document).ready(function () {
    initDOM();
    bindingEvent();
  });

  /*----------------------------함수선언부----------------------------*/

  //DOM 초기화
  function initDOM() {
  }

  //이벤트 바인딩
  function bindingEvent() {
    datepicker();
    wow();
    htmlInclude();
    goTop();
    slides();
    myScroll();
    gnb();
    // subPanel();
    // cdPopup();
    comTab();
  }

  // datepicker
  function datepicker() {
    // �좎쭨
    $(".datePicker").each(function () {
      $(this).datepicker({
        autoHide: true,
        format:"yyyy-mm-dd",
      });
    });
  }

  // wow.js
  function wow() {
    new WOW().init();
    $(".open-mb-nav").on("click", function () {
      $("body, html").css({ "overflow-y": "hidden" });
    });
    $(".mobile-menu .close").on("click",function(){
      $("body, html").css({ "overflow-y": "auto" });
    });
  }

  //html include
  function htmlInclude() {
    window.addEventListener('load', function () {
      var allElements = document.getElementsByTagName('*');
      Array.prototype.forEach.call(allElements, function (el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              el.outerHTML = this.responseText;
            }
          };
          xhttp.open('GET', includePath, true);
          xhttp.send();
        }
      });
    });
  }

  //GO TOP
  function goTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $('.go-top').addClass("is-show");
      } else {
        $('.go-top').removeClass("is-show");
      }
    });
    $('.go-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 400);
      return false;
    });
  }

  //slides
  function slides() {
    speed = 1500;
    // visualSlider
    $(function () {

      const visualImgSlide = $("#visual-slide .swiper-slide");
      const visualNum = $(".num");
      const visualPlay = $(".visual-start");
      const visualStop = $(".visual-stop");
      let visualImgSlideNum = visualImgSlide.length;

      // visual-slide
      const visualSlide = new Swiper("#visual-slide", {
        effect: "fade",
        loop: true,
        fadeEffect: {
          crossFade: true
        },
        speed: speed,
        autoplay: {
          delay: 2000,
        },
        on: {
          slideChangeTransitionStart: function () {
            $(".num-current").html(this.realIndex + 1);
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".visual-next",
          prevEl: ".visual-prev"
        },
      });

      visualNum.html(visualImgSlideNum);

      visualStop.on("click", function () {
        visualSlide.autoplay.stop();
        visualPlay.css({ "display": "inline-block" });
        visualStop.hide();
      });

      visualPlay.on("click", function () {
        visualSlide.autoplay.start();
        visualPlay.hide();
        visualStop.show();
      });

    });


  }

  //myScroll
  function myScroll() {
    $(document).ready(function () {
      $('.myScroll').myScroll({
        btns: '#navi>li',
        speed: 1000,
        base: -300,
        active: 'on'
      });
    });
  }

  // GNB메뉴
  function gnb() {

    var isOpen = true;
    var activeName = "on";
    var sub_height = [];
    var max_height = 0;
    var $headerWrap, $gnb, $gnb_li, $gnb_ul;

    $headerWrap = $(".headerWrap");
    $headerTop = $(".headerTop");
    $gnb = $("#gnb");
    $gnb_li = $gnb.children("li");
    $gnb_ul = $gnb.find("ul");

    max_height = gnb_max_height();

    $gnb_li.on("mouseenter focusin", function () {
      var $this = $(this);
      openSub($this);
      if (isOpen) {
        createSubPanel();
      }
      $gnb_ul.height(max_height);
    });

    $headerWrap.on("mouseleave ", function () {
      closeSub();
    });

    $headerTop.on("mouseenter ", function () {
      closeSub();
    });

    $gnb_li.on("mouseleave focusout", function () {
      $(this).children("a").removeClass(activeName);
    });

    //제일 높은값의 gnb ul 값 반환하는 함수
    function gnb_max_height() {
      $gnb_li.each(function (index) {
        var ul_height = $(this).find("ul").height();
        sub_height.push(ul_height);
        max_height = Math.max(max_height, sub_height[index]);
      });
      return max_height;
    }

    //서브패널 동적으로 생성후 열어주는 함수
    function createSubPanel() {
      // $subPanel = '<div class="bgSub">';
      // $headerWrap.prepend($subPanel);
      // $subPanel = $(".bgSub");
      $(".bgSub").height(max_height);
      // $(".bgSub").stop(true, true).slideDown(dur);
      $(".bgSub").show();
    }

    //gnb ul 열어주는 함수
    function openSub($this) {
      $gnb_ul.show();
      $this.children("a").addClass(activeName);

    }

    //gnb_ul 닫고 sub_panel 닫은뒤 제거하는 함수
    function closeSub() {
      $gnb_ul.hide();
      // $(".bgSub").stop(true, true).slideUp(dur);
      $(".bgSub").hide();
    }
  }

  //sub panel
  function subPanel() {
    $(".location > .inner > ul > li").on("click", function () {

      const $this = $(this);
      const sitePanel = $(".site_panel");
      const sitePanelValue = $(this).hasClass("is-active");

      if (!sitePanelValue) {
        active($this);
      } else {
        thisClick($this);
      }

      function active($this) {
        $this.addClass("is-active");
        $this.find(".site_panel").stop(true, true).slideDown(200);
      }

      function thisClick($this) {
        $this.removeClass("is-active");
        $this.find(".site_panel").stop(true, true).slideUp(200);
      }

    });
  }

  // cd-popup
  function cdPopup() {
    jQuery(document).ready(function ($) {
      //open popup
      $('.cd-popup-trigger').on('click', function (event) {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
      });

      //close popup
      $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('.cd-close')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function (event) {
        if (event.which == '27') {
          $('.cd-popup').removeClass('is-visible');
        }
      });
    });
  }

  function comTab() {
    const tabLi = $(".com-tab li");
    const tabBox = $(".tab-box");

    tabLi.on("click", function (e) {
      e.preventDefault();

      const target = $(this).find('a').attr("href");

      // tabmenu 클릭
      tabLi.removeClass("on");
      $(this).addClass('on');

      // tab content 변경
      tabBox.removeClass("on");
      $(target).addClass("on");

    });
  }


});
