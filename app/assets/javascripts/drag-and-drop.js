// １行の高さ 60(px)
var row_height = 60;

//要素内のクリックされた位置を取得するグローバル（のような）変数
var x;
var y;

var mouse_x;
var mouse_y;

// 空いている行のoffsetTopを記録しておく
var drag_row_top;

// ドラッグ&ドロップイベントを付与するための配列
var elemtents;

// 移動が終了したあとのモーションが終わるためのフラグ
var is_finish_motion = false;

// 親のカード情報を保存するための変数
var parent_card;

// materializeのブロックは12個に分かれているが、その前提として
// 画面幅の85%に縮小したものを分割している
var block = innerWidth * 0.85 / 12;

var is_event_vert = true;
var is_event_decide = false;

// 左に行をずらすときの最大値
var left_limit = -100;

$(document).on('turbolinks:load', function () {

  //要素の取得
  elements = $('.card-button');

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, { passive: false });
    elements[i].addEventListener("touchstart", mdown, { passive: false });
  }
})

//マウスが押された際の関数
function mdown(e) {
  e.preventDefault();

  //要素の取得
  elements = $('.drag-and-drop');

  // ボタンを押した時に、もし左に開いている行があれば右に戻す
  $.each(elements, function () {
    if ($(this)[0].style.left == (left_limit + 'px')) {
      $(this).animate({ left: 0 + "px" }, 'fast');
    }
  });

  // 親のカード情報を取得
  parent_card = $(this).parent().parent().parent().parent();
  console.log("parent_left= ", parent_card[0].style.left);

  if (!is_finish_motion && parent_card[0].style.left != (left_limit + "px")) {

    // ドラッグ情報を更新
    parent_card.removeClass("drag-off");
    parent_card.addClass("drag-on");

    // 空いている行の初期値を設定
    // drag_row_top = this.offsetTop;
    drag_row_top = parent_card[0].offsetTop;

    // 一番正面に持ってくる
    parent_card.css('z-index', 100);

    //タッチイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - parent_card[0].offsetLeft
    y = event.pageY - parent_card[0].offsetTop

    mouse_x = event.pageX;
    mouse_y = event.pageY;

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

  if ($('body').width() <= 600) {
    block = 0;
  } else {
    block = innerWidth * 0.85 / 12;
  }

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

  // 上下移動か、左右移動かのフラグを判断
  if (!is_event_decide) {
    var y_diff = Math.abs(event.pageY - mouse_y)
    var x_diff = Math.abs(event.pageX - mouse_x)
    if (y_diff >= 1 || x_diff >= 1) {
      if (y_diff > x_diff) {
        is_event_vert = true;
      } else {
        is_event_vert = false;
      }
      is_event_decide = true;
    }
  }

  if (is_event_vert) {                        //　上下移動の時
    //マウスが動いた場所に要素を動かす（縦移動のみ）
    drag.style.top = event.pageY - y + "px";
    // 上限設定を設ける
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
          drag_row_top += row_height;
        }
      } else if ($(this).hasClass(".drag_under")) {
        if (drag.offsetTop <= this.offsetTop) {
          $(this).animate({ top: this.offsetTop + row_height + "px" }, 'fast');
          $(this).removeClass(".drag_under");
          $(this).addClass(".drag_over");
          drag_row_top -= row_height;
        }
      }
    });
  } else {                                     // 水平移動の時
    left_limit = -100
    var slide_amount = Math.max(left_limit, Math.min(0, event.pageX - x - block));
    drag.style.left = slide_amount + "px";
  }
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

  // 一番下の行の位置を取得
  var last_list_y = 0;
  var top_list_y = 100;
  $.each(drag_off_list, function () {
    last_list_y = Math.max(last_list_y, this.offsetTop);
    top_list_y = Math.min(top_list_y, this.offsetTop);
  });

  if (is_event_vert) {          //垂直移動が終了した時
    if (drag.offsetTop > last_list_y) {                                       // ドラッグした行が一番下の行よりも下に移動していた場合、一番下に来るように修正
      $(drag).animate({ top: last_list_y + row_height + "px" }, 'fast');
    } else if (drag.offsetTop < (row_height * 2) && top_list_y == 100) {      // ドラッグした行が一番上（offsetTop < 60)に移動していた場合、一番上に来るように修正
      $(drag).animate({ top: row_height + "px" }, 'fast');
    } else {                                                                  // 行と行の間で止まった時、間に綺麗に収める
      $(drag).animate({ top: drag_row_top + "px" }, 'fast');
    }
  } else {                      //水平移動が終了した時
    finished_x = event.pageX - x - block;
    if (finished_x <= (left_limit * 0.4)) {     // limitの4割以上左にスライドしていれば、リミットまで、そうでなければ初期いちに戻す
      $(drag).animate({ left: left_limit + "px" }, 'fast');
    } else {
      $(drag).animate({ left: 0 + "px" }, 'fast');
    }
  }
  // 縦移動or横移動の決定フラグをfalseにする
  is_event_decide = false;
  // z-indexを0まで下げていく
  $(drag).animate({ zIndex: 0 }, 'fast');

  //ムーブベントハンドラの消去
  document.body.removeEventListener("mousemove", mmove, false);
  drag.removeEventListener("mouseup", mup, false);
  document.body.removeEventListener("touchmove", mmove, false);
  drag.removeEventListener("touchend", mup, false);

  prevent_click_and_touch();
  reset_classes();
}

function prevent_click_and_touch() {
  is_finish_motion = true;
  setTimeout(function () {
    is_finish_motion = false;
  }, 500);
}

// クラス名のリセットを行う
function reset_classes() {
  //要素の取得
  elements = $('.drag-and-drop');
  $.each(elements, function () {
    $(this).removeClass(".drag_under");
    $(this).removeClass(".drag_over");
    $(this).removeClass("drag-on");
    $(this).addClass("drag-off");
  });
}
// このコードはhttps://q-az.net/elements-drag-and-drop/
// を元に開発されています