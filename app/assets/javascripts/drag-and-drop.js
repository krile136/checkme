// １行の高さ 60(px)
var row_height = 60;

//要素内のクリックされた位置を取得するグローバル（のような）変数
var x;
var y;

// 空いている行のoffsetTopを記録しておく
var drag_row_top;

// ドラッグ&ドロップイベントを付与するための配列
var elemtents;

// 移動が終了したあとのモーションが終わるためのフラグ
var is_finish_motion = false;

var is_button_click = false;

var parent_card;

$(document).on('turbolinks:load', function () {

  //要素の取得
  // elements = $('.drag-and-drop');
  elements = $('.card-button');
  console.log(elements.length);
  // $('body').on('mousedown', function () {
  //   if (is_button_click) {
  //     console.log("trueの状態だね");
  //     is_button_click = false;
  //     console.log("falseにしたよ");
  //   } else {
  //     console.log("falseの状態だね");
  //   }
  // })


  // $('.card-button').on("mousedown", function () {
  //   is_button_click = true;
  //   console.log("重なってるよ(mousedown");
  //   instances.dropdown('open');
  // });



  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, { passive: false });
    elements[i].addEventListener("touchstart", mdown, { passive: false });
  }

})
//マウスが押された際の関数
function mdown(e) {
  e.preventDefault();
  if (!is_finish_motion) {

    parent_card = $(this).parent().parent().parent().parent();
    // console.log($(this).parent().parent().parent().parent());

    //クラス名に .drag-on を追加し、.drag-offを削除
    // $(this).removeClass("drag-off");
    // $(this).addClass("drag-on");
    parent_card.removeClass("drag-off");
    parent_card.addClass("drag-on");

    // 空いている行の初期値を設定
    // drag_row_top = this.offsetTop;
    drag_row_top = parent_card[0].offsetTop;

    // 一番正面に持ってくる
    // $(this).css('z-index', 100);
    parent_card.css('z-index', 100);

    //タッチイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    // console.log("parent_card= ", parent_card);
    // console.log("left= ", parent_card[0].offsetLeft);
    // console.log("top=", parent_card[0].offsetTop);
    //要素内の相対座標を取得
    // x = event.pageX - this.offsetLeft
    // y = event.pageY - this.offsetTop
    x = event.pageX - parent_card[0].offsetLeft
    y = event.pageY - parent_card[0].offsetTop
    // console.log("x=", x);
    // console.log("y=", y);


    // ドラッグされていない他の要素を取得
    var drag_off_list = $(".drag-off");

    // var drag = $(this)[0];
    var drag = parent_card[0];

    // ドラッグした行を動かす前に、他の行の上下の定義づけをする
    // 移動アニメーション中の時は定義づけをスキップする
    $.each(drag_off_list, function () {
      if (drag.offsetTop <= this.offsetTop && this.offsetTop % row_height == 0) {
        $(this).addClass(".drag_over");
      } else {
        $(this).addClass(".drag_under");
      }
    });

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
  }
}

//マウスカーソルが動いたときに発火
function mmove(e) {

  // ドラッグされている要素を取得
  var drag = $('.drag-on')[0]

  // ドラッグされていない他の要素を取得
  var drag_off_list = $(".drag-off");

  //同様にマウスとタッチの差異を吸収
  if (e.type === "mousemove") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  //マウスが動いた場所に要素を動かす（縦移動のみ）
  drag.style.top = event.pageY - y + "px";
  if (drag.offsetTop < row_height / 2) {
    drag.style.top = row_height / 2 + "px";
  }

  // ドラッグしている行が移動した時、他の行も連動させる
  $.each(drag_off_list, function () {
    if ($(this).hasClass(".drag_over")) {
      if (drag.offsetTop > this.offsetTop) {
        $(this).animate({ top: this.offsetTop - row_height + "px" }, 'fast');
        $(this).removeClass(".drag_over");
        $(this).addClass(".drag_under");
        console.log(drag_row_top);
        console.log(row_height);
        drag_row_top += row_height;
        console.log(drag_row_top);
      }
    } else if ($(this).hasClass(".drag_under")) {
      if (drag.offsetTop <= this.offsetTop) {
        $(this).animate({ top: this.offsetTop + row_height + "px" }, 'fast');
        $(this).removeClass(".drag_under");
        $(this).addClass(".drag_over");
        drag_row_top -= row_height;
        console.log(drag_row_top);
      }
    }
    // $.each(drag_off_list, function () {
    //   if (parent_card.hasClass(".drag_over")) {
    //     if (drag.offsetTop > parent_card[0].offsetTop) {
    //       parent_card[0].animate({ top: parent_card[0].offsetTop - row_height + "px" }, 'fast');
    //       parent_card[0].removeClass(".drag_over");
    //       parent_card[0].addClass(".drag_under");
    //       drag_row_top += row_height;
    //       console.log(drag_row_top);
    //     }
    //   } else if (parent_card.hasClass(".drag_under")) {
    //     if (drag.offsetTop <= parent_card[0].offsetTop) {
    //       parent_card[0].animate({ top: parent_card[0].offsetTop + row_height + "px" }, 'fast');
    //       parent_card[0].removeClass(".drag_under");
    //       parent_card[0].addClass(".drag_over");
    //       drag_row_top -= row_height;
    //       console.log(drag_row_top);
    //     }
    //   }
  });

  //マウスボタンが離されたときに発火
  drag.addEventListener("mouseup", mup, false);
  drag.addEventListener("touchend", mup, false);
}

//マウスボタンが上がったら発火
function mup(e) {
  // ドラッグされている要素を取得
  var drag = $('.drag-on')[0]

  // ドラッグされていない他の要素を取得
  var drag_off_list = $(".drag-off");

  // 一番下の行の位置を取得しつつ、.drag_underと.drag_overを削除
  var last_list_y = 0;
  var top_list_y = 100;
  $.each(drag_off_list, function () {
    last_list_y = Math.max(last_list_y, this.offsetTop);
    top_list_y = Math.min(top_list_y, this.offsetTop);
    $(this).removeClass(".drag_under");
    $(this).removeClass(".drag_over");
  });

  if (drag.offsetTop > last_list_y) {                                       // ドラッグした行が一番下の行よりも下に移動していた場合、一番下に来るように修正
    $(drag).animate({ top: last_list_y + row_height + "px" }, 'fast');
  } else if (drag.offsetTop < (row_height * 2) && top_list_y == 100) {      // ドラッグした行が一番上（offsetTop < 60)に移動していた場合、一番上に来るように修正
    $(drag).animate({ top: row_height + "px" }, 'fast');
  } else {                                                                  // 行と行の間で止まった時、間に綺麗に収める
    $(drag).animate({ top: drag_row_top + "px" }, 'fast');
  }

  // z-indexを1まで下げていく
  $(drag).animate({ zIndex: 0 }, 'fast');

  //ムーブベントハンドラの消去
  document.body.removeEventListener("mousemove", mmove, false);
  drag.removeEventListener("mouseup", mup, false);
  document.body.removeEventListener("touchmove", mmove, false);
  drag.removeEventListener("touchend", mup, false);

  //クラス名 .drag-onを消して.drag-offを追加
  drag.classList.remove("drag-on");
  drag.classList.add("drag-off");

  prevent_click_and_touch()
}

function prevent_click_and_touch() {
  is_finish_motion = true;
  setTimeout(function () {
    is_finish_motion = false;
  }, 500);
}
// このコードはhttps://q-az.net/elements-drag-and-drop/
// を元に開発されています