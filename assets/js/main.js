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
    faq();
    datepicker();
    wow();
    htmlInclude();
    // goTop();
    slides();
    // myScroll();
    // gnb();
    // subPanel();
    cdPopup();
    comTab();
    comFile();
  }

  //faq
  function faq() {
    /* faq 220726 */
    var faqDl = $(".faq-section");
    var faqDt = $(".faq-section dt");
    var faqDd = $(".faq-section dd");

    // 첫번째 활성화
    // faqDl.eq(0).children("dd").slideDown(500);
    // faqDl.eq(0).addClass("is-active");

    // 활성화 되었을때 클릭
    function dlCheck($this) {
      $this.parent("dl").removeClass("is-active");
      $this.siblings("dd").slideUp(500);
    }

    // 활성화 안되었을때 클릭
    function dlCheckOff($this) {
      faqDl.children("dd").slideUp(500);
      faqDl.removeClass("is-active");
      $this.siblings("dd").slideDown(500);
      $this.parent("dl").addClass("is-active");
    }

    faqDt.on("click", function () {

      var $this = $(this);
      var checkOn = $this.parent("dl").hasClass("is-active");


      if (checkOn) {
        dlCheck($this);
      } else {
        dlCheckOff($this);
      }

    });
    /*// faq 220726  */
  }

  function comFile() {
    $(".add-btn").on("click", function (e) {
      e.preventDefault();
      $(this).parents(".file-upload-wrap").append(
        `<div class="file-upload">
          <div class="file-box flex gap5">
            <div class="file-select">
              <div class="file-select-name" id="noFile">파일 없음</div>
              <input type="file" name="chooseFile" id="chooseFile" class="chooseFile">
              <div class="file-select-button" id="fileName">파일 찾기</div>
            </div>
            <!-- 첨부파일 삭제 -->
            <button type="button" class="remove-file btn size-mid bg-red">- 삭제</button>
        </div>
      </div>`
      );
    });

    $(document).on("click", ".remove-file", function (e) {
      e.preventDefault();
      $(this).parents(".file-upload").remove();
    });

    $(function () {
      $(document).on("click", '.file-upload', function () {
        $(this).find(".chooseFile").on('change', function () {
          var filename = $(this).val();
          if (/^\s*$/.test(filename)) {
            $(this).parents(".file-upload").removeClass('active');
            $(this).siblings("#noFile").text("파일 없음");
          }
          else {
            $(this).parents(".file-upload").addClass('active');
            $(this).siblings("#noFile").text(filename.replace("C:\\fakepath\\", ""));
          }
        });
      });
    });
  }

  // datepicker
  function datepicker() {
    // �좎쭨
    $(".datePicker").each(function () {
      $(this).datepicker({
        autoHide: true,
        format: "yyyy-mm-dd",
      });
    });
  }

  // wow.js
  function wow() {
    wow = new WOW({
      mobile: false,
    });
    wow.init();
    $(".open-mb-nav").on("click", function () {
      $("body, html").css({ "overflow-y": "hidden" });
    });
    $(".mobile-menu .close").on("click", function () {
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

    // 20221226 noticeSlides 슬라이드 js 수정
    $(function () {
      const noticeSlides = document.querySelector("#noticeSlide");
      const $$swiperAll = noticeSlides.querySelectorAll(".swiper-slide");
      const noticeBtnNext = noticeSlides.querySelector(".notice__btn-next")
      const noticeBtnPrev = noticeSlides.querySelector(".notice__btn-prev")

      noticeBtnNext.style.display = "none";
      noticeBtnPrev.style.display = "none";

      // 슬라이드 한개 이상일시 실행
      if ($$swiperAll.length > 1) {
        var noticeSlide = new Swiper("#noticeSlide", {
          spaceBetween: 0,
          slidesPerView: 'auto',
          grabCursor: true,
          loop: true,
          speed: 2000,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            //페이징 버튼
            el: ".notice__pagenation",
            clickable: true, //클릭이 가능하도록 조정
            type: "fraction",
          },
          navigation: {
            //좌우 버튼 옵션
            nextEl: ".notice__btn-next",
            prevEl: ".notice__btn-prev",
          },
          // mousewheel: true,
          keyboard: {
            enabled: true,
          }
        });

        noticeBtnNext.style.display = "block";
        noticeBtnPrev.style.display = "block";

        //롤링시작, 롤링정지 버튼을 변수로 저장한다.
        const btnStart = $(".btn-start");
        const btnStop = $('.btn-stop');

        //페이지 로딩시 자동롤리이 정지되게 코딩
        // noticeSlide.autoplay.stop();
        //롤링시작버튼 클릭에만 롤링이 시작되게

        btnStart.on("click", function () {
          noticeSlide.autoplay.start();
        });
        //롤링정지버튼을 클릭시에만 롤링이 정지되게
        btnStop.on("click", function () {
          noticeSlide.autoplay.stop();
        });
      }
    });



  }

  //myScroll
  // function myScroll() {
  //   $(document).ready(function () {
  //     $('.myScroll').myScroll({
  //       btns: '#navi>li',
  //       speed: 1000,
  //       base: -300,
  //       active: 'on'
  //     });
  //   });
  // }

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
        $("html, body").css({ overflow: "hidden" });
      });

      //close popup
      $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('.cd-close')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
          $("html, body").css({ overflow: "auto" });
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
