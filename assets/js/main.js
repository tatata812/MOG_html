$(function () {

  // -----------------------
  // ▼ ヘッダーの色変わる
  // -----------------------
  const $header = $('.header');
  // .header-scroll-js が付いている場合だけスクロール処理を適用
  if ($header.hasClass('header-scroll-js')) {
    const threshold = 50;

    $(window).on('scroll', function () {
      if ($(this).scrollTop() > threshold) {
        $header.addClass('scrolled');
      } else {
        $header.removeClass('scrolled');
      }
    });

    // ページを途中から読み込んだ時も反映
    if ($(window).scrollTop() > threshold) {
      $header.addClass('scrolled');
    }
  } else {
    // header-scroll-js がない場合は最初から赤固定
    $header.css('background-color', 'rgba(197, 46, 46, 0.9)');
  }



  // -----------------------
  // ▼ ページ内リンククリック時
  // -----------------------
  $(function () {
    const headerHeight = 120; // ヘッダーの高さ
    const speed = 500;

    $('a[href^="#"]').on('click', function (e) {
      const href = $(this).attr('href');
      const target = href === '#' || href === '' ? 'html' : href;
      const $target = $(target);

      if (!$target.length) return; // ターゲットが存在しないなら何もしない
      e.preventDefault();

      const position = $target.offset().top - headerHeight;

      // スクロール＋メニュー閉じ
      $('html, body').animate({
        scrollTop: position
      }, speed, 'swing');

      // SPメニューを閉じる（クリック時点で閉じてOK）
      $('.header-sp, .black-bg, .header').removeClass('active');
      $('.hamburger-menu').removeClass('hamburger-menu--open');
      $('.navigation').slideUp(300);
      $('body').removeClass('is-fixed');
    });
  });

  // -----------------------
  // ▼ 他ページから #id付きで遷移してきたとき
  // -----------------------
  $(window).on('load', function () {
    const hash = location.hash;
    if (hash) {
      const $target = $(hash);
      if ($target.length) {
        const position = $target.offset().top - headerHeight;
        $('html, body').animate({
          scrollTop: position
        }, speed, 'swing');
      }
    }
  });


  // -----------------------
  // ▼ ハンバーガーボタン開閉
  // -----------------------
  $('#js-hamburger-menu, .header-sp__btn-img').on('click', function (e) {
    e.preventDefault();
    $('.header-sp, .black-bg, .header').toggleClass('active');
    $('.hamburger-menu').toggleClass('hamburger-menu--open');
    $('.navigation').stop(true, true).slideToggle(300);
    $('body').toggleClass('is-fixed');
  });

  // 背景クリックで閉じる
  $('.black-bg').on('click', function () {
    $('.header-sp, .black-bg, .header').removeClass('active');
    $('.hamburger-menu').removeClass('hamburger-menu--open');
    $('.navigation').slideUp(300);
    $('body').removeClass('is-fixed');
  });



  // -----------------------
  // ▼ 追従バー
  // -----------------------
  $(function () {
    const $bar = $('.follow-bar');
    const showPoint = 200; // ← スクロールで表示する基準（px）

    function checkHeight() {
      const windowH = $(window).height();
      const docH = $(document).height();
      const scrollable = docH - windowH; // 実際にスクロールできる高さ

      // ▼ ページが「ほとんどスクロールできない（短い）」なら初期表示
      if (scrollable < 400) { // ← 400px以下なら“短いページ”と判定（調整可）
        $bar.addClass('is-active');
      } else {
        // スクロールイベントで制御
        $(window).on('scroll.followbar', function () {
          if ($(this).scrollTop() > showPoint) {
            $bar.addClass('is-active');
          } else {
            $bar.removeClass('is-active');
          }
        });
      }
    }
    checkHeight();
    $(window).on('resize', checkHeight); // リサイズ時も再判定
  });

  // -----------------------
  // ▼ロード画面
  // -----------------------

  $(function () {
    var $pre = $('#preloader');
    if (!$pre.length) return;

    // すでに表示済みなら即スキップ
    try {
      if (sessionStorage.getItem('preloaderShown') === '1') {
        $pre.remove();
        return;
      }
    } catch (e) {}

    // 表示中はスクロール固定
    $('html, body').addClass('preload-lock');

    // 2秒後にフェードアウト
    setTimeout(function () {
      $pre.addClass('is-hidden');

      // 完全に消す
      setTimeout(function () {
        $pre.remove();
        $('html, body').removeClass('preload-lock');
      }, 450); // CSSのtransitionと合わせる
    }, 2000);

    // このセッションでは“表示済み”にする
    try {
      sessionStorage.setItem('preloaderShown', '1');
    } catch (e) {}
  });


  // -----------------------
  // ▼フィードイン
  // -----------------------
  $(function () {
    function fadeInOnScroll() {
      $('.fade-in-up, .fade-in-right, .fade-in-zoom,.fade-in-left').each(function () {
        var elemPos = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (scroll > elemPos - windowHeight + 100) {
          if ($(this).hasClass('fade-in-zoom')) {
            // zoomだけ遅延
            var el = $(this);
            setTimeout(function () {
              el.addClass('action');
            }, 300); // 0.3秒遅延
          } else {
            $(this).addClass('action');
          }
        }
      });
    }

    fadeInOnScroll();

    $(window).on('scroll', function () {
      fadeInOnScroll();
    });
  });
})