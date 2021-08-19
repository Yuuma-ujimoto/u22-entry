$(function() {
  // お店一覧の画像の比率
  var storeWidth = $('.hpitem').width();
  var storeHeight = storeWidth * 0.55;
  $('.hpLogo').css({'height':storeHeight});
  $('.plus').css({'height':storeHeight});

  $(window).resize(function() {
    //リサイズされたときの処理
    // お店一覧の画像の比率
    var storeWidth = $('.hpitem').width();
    var storeHeight = storeWidth * 0.55;
    $('.hpLogo').css({'height':storeHeight});
    $('.plus').css({'height':storeHeight});
  });

  // ログアウト
  $('.logout').on('click',function(){
    $('.popup').addClass('show').fadeIn();
  });

  $('#close').on('click',function(){
    $('.popup').fadeOut();
  });
});
