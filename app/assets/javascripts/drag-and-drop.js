$(document).on('turbolinks:load', function () {
  // １行の高さ 60(px)
  var col_height = 60;

  //要素の取得
  var elements = document.getElementsByClassName("drag-and-drop");

  //要素内のクリックされた位置を取得するグローバル（のような）変数
  var x;
  var y;

  // materializeのブロックは12個に分かれているが、その前提として
  // 画面幅の85%に縮小したものを分割している
  var block = innerWidth * 0.85 / 12;

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, false);
    elements[i].addEventListener("touchstart", mdown, false);
  }

  //マウスが押された際の関数
  function mdown(e) {

    //クラス名に .drag-on を追加し、.drag-offを削除
    $(this).removeClass("drag-off");
    $(this).addClass("drag-on");

    //タッチイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft
    y = event.pageY - this.offsetTop

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
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

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    // ドラッグした行を動かす前に、他の行の上下の定義づけをする
    // 移動アニメーション中の時は定義づけをスキップする
    $.each(drag_off_list, function () {
      // console.log(this.offsetTop);
      if (drag.offsetTop <= this.offsetTop && this.offsetTop % col_height == 0) {
        $(this).addClass(".drag_over");
      } else {
        $(this).addClass(".drag_under");
      }
    });
    // console.log(drag.style.top);
    //マウスが動いた場所に要素を動かす（縦移動のみ）
    drag.style.top = event.pageY - y + "px";
    if (drag.offsetTop < col_height / 2) {
      drag.style.top = col_height / 2 + "px";
    }
    // 本アプリは縦移動のみだが、materializeのコンテンツを自由に移動させる時は
    // offsetの分だけblock（＝１ブロックの横幅が入っている）を引いてやれば
    // 正しい位置に移動させることができる
    // 例）offset-s1が入っているカードを移動させる時
    // drag.style.left = event.pageX - x - block + "px";

    // ドラッグしている行が移動した時、他の行も連動させる
    $.each(drag_off_list, function () {
      if ($(this).hasClass(".drag_over")) {
        if (drag.offsetTop > this.offsetTop) {
          $(this).animate({ top: this.offsetTop - col_height + "px" }, 'fast');
          $(this).removeClass(".drag_over");
          $(this).addClass(".drag_under");
        }
      } else if ($(this).hasClass(".drag_under")) {
        if (drag.offsetTop <= this.offsetTop) {
          $(this).animate({ top: this.offsetTop + col_height + "px" }, 'fast');
          $(this).removeClass(".drag_under");
          $(this).addClass(".drag_over");
        }
      }
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
    $.each(drag_off_list, function () {
      last_list_y = Math.max(last_list_y, this.offsetTop);
      $(this).removeClass(".drag_under");
      $(this).removeClass(".drag_over");
    });

    // ドラッグした行が一番下の行よりも下に移動していた場合、一番下に来るように修正
    if (drag.offsetTop >= (last_list_y + 57)) {
      $(".drag-on").animate({ top: last_list_y + col_height + "px" }, 'fast');
    }
    // ドラッグした行が一番上（offsetTop < 60)に移動していた場合、一番上に来るように修正
    if (drag.offsetTop < col_height) {
      $(".drag-on").animate({ top: col_height + "px" }, 'fast');
    }

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);

    //クラス名 .drag-onを消して.drag-offを追加
    drag.classList.remove("drag-on");
    drag.classList.add("drag-off");
  }
})
// このコードはhttps://q-az.net/elements-drag-and-drop/
// を元に開発されています