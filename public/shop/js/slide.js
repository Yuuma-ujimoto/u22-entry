var  upSpeed=15;  //メッセージのスライド速度
var  delay =3000; // 次のメッセージに切り替わるまでの静止時間
var  tickerH=30;  // 表示ボックスの高さ
 window.onload =function divScroller(){
  scroller = document.getElementById("ticKer"); // div 表示ボックス
  scroller.style.height= tickerH+"px"; // 表示ボックスの高さ
  scroller.style.lineHeight= tickerH+"px"; // 行の高さ
	  slide = document.getElementById("ulArea"); // スライドさせる ul要素
	  slide.style.position = "absolute"; // 絶対配置
	  slide.style.top = tickerH+"px" ;  // slide のtop(上辺)の位置
	innScroll(tickerH, upSpeed, delay)
		  }
  function innScroll(tickerH, upSpeed, delay){
   msec = upSpeed; // スクロール時間
   numTop = parseInt(slide.style.top) // 数値文字列を整数に変換
if (numTop > -tickerH){ // top位置が -30にならない間は
slide.style.top = (numTop-1)+"px"; // top位置を -1px 上へ
	}
else{ slide.style.top = 0+"px";
               cngLi(); // 次のメッセージと交代
	}
   if(numTop==0){msec = delay;// 静止時間 現在のメッセージを待機
	   }
    setTimeout("innScroll("+ tickerH +","+ upSpeed +"," + delay +")", msec);
		}
function cngLi(){ // メッセージの移動
   base= document.getElementById("ulArea");
    liList = base.getElementsByTagName("li");// 与えられたタグ名を持つ要素のリスト
     elm = liList[0];// 最上部の "li"要素
    base.appendChild(elm); // elm を子ノードとして末尾に移動する。
      }
