$(document).on('turbolinks:load', function () {
  console.log("画面幅=", innerWidth);
  console.log("85%縮小=", innerWidth * 0.85);
  console.log("１ブロック=", innerWidth * 0.85 / 12);

  //要素の取得
  var elements = document.getElementsByClassName("drag-and-drop");

  //要素内のクリックされた位置を取得するグローバル（のような）変数
  var x;
  var y;

  // materializeにおける１ブロックの幅
  var block = innerWidth * 0.85 / 12;

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, false);
    elements[i].addEventListener("touchstart", mdown, false);
  }

  //マウスが押された際の関数
  function mdown(e) {

    //クラス名に .drag を追加
    this.classList.add("drag");

    //タッチデイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft
    y = event.pageY - this.offsetTop

    console.log("pageX=", event.pageX, "  pageY=", event.pageY)
    console.log("offsetLeft=", this.offsetLeft, "  offsetTop=", this.offsetTop);
    console.log("x=", x, "  y=", y);


    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
  }

  //マウスカーソルが動いたときに発火
  function mmove(e) {

    //ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if (e.type === "mousemove") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす（縦移動のみ）
    drag.style.top = event.pageY - y + "px";

    // 今回は縦移動のみだが、materializeのコンテンツを自由に移動させる時は
    // offsetの分だけblock（＝１ブロックの横幅が入っている）を引いてやれば
    // 正しい位置に移動させることができる
    // drag.style.left = event.pageX - x - block + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);

  }

  //マウスボタンが上がったら発火
  function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
  }
})

