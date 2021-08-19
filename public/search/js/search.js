$(function() {
  // 背景の高さ設定
  const location = $('.mainSearch').offset();
  var msHeight = $('.mainSearch').height();
  var sum = location.top + msHeight;
  $(".background").css({'height':sum});

  // お店一覧の画像の比率
  var storeWidth = $('.restaurant').width();
  var storeHeight = storeWidth * 0.55;
  $('.restaurant_top').css({'height':storeHeight});

  $(window).resize(function() {
    //リサイズされたときの処理
    // 背景の高さ設定
    const location = $('.mainSearch').offset();
    var msHeight = $('.mainSearch').height();
    var sum = location.top + msHeight;
    $(".background").css({'height':sum});

    // お店一覧の画像の比率
    var storeWidth = $('.restaurant').width();
    var storeHeight = storeWidth * 0.55;
    $('.restaurant_top').css({'height':storeHeight});
  });



  // スクロール位置を取得
  var offset = $( ".mainSearch" ).offset();
  /*警告パネルにhead3のx座標とy座標を表示*/
  var scrlocation = offset.top;

  // scrollイベントを取得した際の処理を定義
  $(window).on("scroll", function () {
    // scrollTop()が0より大きい場合
    if ($(this).scrollTop() > scrlocation) {
      // ヘッダーバーをslideDownして表示
      $(".cb-header").slideDown();
    // scrollTop()が0の場合
    } else {
      // ヘッダーバーをslideUpして非表示
      $(".cb-header").slideUp();
    }
  });
});
// $(window).on('load', function() {
//   // ヘッダーを一定の位置から表示させる
//   $(function () {
//     // スクロール位置を取得
//     var offset = $( ".mainbtn" ).offset();
//     /*警告パネルにhead3のx座標とy座標を表示*/
//     var location = offset.top;
//
//     // scrollイベントを取得した際の処理を定義
//     $(window).on("scroll", function () {
//       // scrollTop()が0より大きい場合
//       if ($(this).scrollTop() > location) {
//         // ヘッダーバーをslideDownして表示
//         $(".cb-header").slideDown();
//       // scrollTop()が0の場合
//       } else {
//         // ヘッダーバーをslideUpして非表示
//         $(".cb-header").slideUp();
//       }
//     });
//   });
// });
