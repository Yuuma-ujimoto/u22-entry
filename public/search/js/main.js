$(window).on('load', function() {
  // ロゴ
  ScrollReveal().reveal('.rogo', {
  duration: 3000, // アニメーションの完了にかかる時間
  opacity: 0,
  scale: 2
  });

  // メインタイトル
  ScrollReveal().reveal('.maintitle', {
  duration: 2000,
  delay: 1500,
  scale: .98
  });

  // ボタン周り
  ScrollReveal().reveal('.mainbtn', {
  duration: 2000,
  delay: 1500,
  scale: .98
  });
});

// ヘッダーを一定の位置から表示させる
$(function () {
  // スクロール位置を取得
  var offset = $( ".mainbtn" ).offset();
  /*警告パネルにhead3のx座標とy座標を表示*/
  var location = offset.top;

  // scrollイベントを取得した際の処理を定義
  $(window).on("scroll", function () {
    // scrollTop()が0より大きい場合
    if ($(this).scrollTop() > location) {
      // ヘッダーバーをslideDownして表示
      $(".cb-header").slideDown();
    // scrollTop()が0の場合
    } else {
      // ヘッダーバーをslideUpして非表示
      $(".cb-header").slideUp();
    }
  });

  ScrollReveal().reveal('.appeal1_right', {
  duration: 800, // アニメーションの完了にかかる時間
  viewFactor: 0.2, // 0~1,どれくらい見えたら実行するか
  reset: true,   // 何回もアニメーション表示するか
  distance: '50px', //動かす距離
  origin: 'left' //向き
  });

});

//
// function showElementAnimation() {
//
//   var element = document.getElementsByClassName('js-animation');
//   if(!element) return; // 要素がなかったら処理をキャンセル
//
//   var showTiming = window.innerHeight > 768 ? 200 : 40; // 要素が出てくるタイミングはここで調整
//   var scrollY = window.pageYOffset;
//   var windowH = window.innerHeight;
//
//   for(var i=0;i<element.length;i++) { var elemClientRect = element[i].getBoundingClientRect(); var elemY = scrollY + elemClientRect.top; if(scrollY + windowH - showTiming > elemY) {
//       element[i].classList.add('is-show');
//     } else if(scrollY + windowH < elemY) {
//       // 上にスクロールして再度非表示にする場合はこちらを記述
//       element[i].classList.remove('is-show');
//     }
//   }
// }
// showElementAnimation();
// window.addEventListener('scroll', showElementAnimation);
