modal_num = 5;

$(document).on('turbolinks:load', function () {
  // 見出しの組み立て
  function build_head(added_height) {
    var html = `<div class="row">
                  <div class="col s12 m10 offset-m1 drag-and-drop drag-off" style="top:${added_height}px">
                    <div class="show_circle_btn btn back-btn back-btn--right red modal-trigger" href="#modal${modal_num}">
                      <i class="material-icons small card-icon-vert">delete</i>
                    </div>
                    <div class="modal" id="modal${modal_num}" tabindex="0">
                      <div class="modal-content">
                        <h6>このカードを削除しますか？</h6>
                      </div>
                      <div class="modal-footer">
                        <a class="modal-cancel modal-close waves-effect waves-green btn-flat" href="#!">キャンセル</a>
                        <a class="modal-delete modal-close waves-effect waves-green btn-flat" href="#!">削除する</a>
                      </div>
                    </div>
                    <div class="show_circle_btn btn back-btn back-btn--left blue darken-1 modal-trigger" href="#modal${modal_num + 1}">
                      <i class="material-icons small card-icon-vert">edit</i>
                    </div>
                    <div class="modal" id="modal${modal_num + 1}" tabindex="0">
                      <div class="modal-content">
                        <div class="row">
                          <div class="input-field col s12">
                            <i class="material-icons prefix">edit</i>
                            <input class="autocomplete" id="autocomplete-input" type="text">
                            <label for="autocomplete-input"></label>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <a class="modal-cancel modal-close waves-effect waves-green btn-flat" href="#!">キャンセル</a>
                        <a class="modal-change modal-close waves-effect waves-green btn-flat" href="#!">変更する</a>
                      </div>
                    </div>
                    <div class="card green lighten-5">
                      <div class="card-content black-text">
                        <div class="card-text">
                          <div id="text-content">見出し</div>
                          <a class="card-button btn-flat show_circle_btn mouse_on_cursor_move">
                            <i class="material-icons small card-icon-vert">sort</i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`
    return html;
  }

  // チェック内容の組み立て
  function build_check(added_height) {
    var html = `<div class="row">
                  <div class="col s11 offset-s1 m9 offset-m2 drag-and-drop drag-off" style="top:${added_height}px">
                    <div class="show_circle_btn btn back-btn back-btn--right red modal-trigger" href="#modal${modal_num}">
                      <i class="material-icons small card-icon-vert">delete</i>
                    </div>
                    <div class="modal" id="modal${modal_num}" tabindex="0">
                      <div class="modal-content">
                        <h6>このカードを削除しますか？</h6>
                      </div>
                      <div class="modal-footer">
                        <a class="modal-cancel modal-close waves-effect waves-green btn-flat" href="#!">キャンセル</a>
                        <a class="modal-delete modal-close waves-effect waves-green btn-flat" href="#!">削除する</a>
                      </div>
                    </div>
                    <div class="show_circle_btn btn back-btn back-btn--left blue darken-1 modal-trigger" href="#modal${modal_num + 1}">
                      <i class="material-icons small card-icon-vert">edit</i>
                    </div>
                    <div class="modal" id="modal${modal_num + 1}" tabindex="0">
                      <div class="modal-content">
                        <div class="row">
                          <div class="input-field col s12">
                            <i class="material-icons prefix">edit</i>
                            <input class="autocomplete" id="autocomplete-input" type="text">
                            <label for="autocomplete-input"></label>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <a class="modal-cancel modal-close waves-effect waves-green btn-flat" href="#!">キャンセル</a>
                        <a class="modal-change modal-close waves-effect waves-green btn-flat" href="#!">変更する</a>
                      </div>
                    </div>
                    <div class="card lime lighten-5">
                      <div class="card-content black-text">
                        <div class="card-text">
                          <div id="text-content">チェック項目</div>
                          <a class="card-button btn-flat show_circle_btn mouse_on_cursor_move">
                            <i class="material-icons small card-icon-vert">sort</i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`
    return html;
  }


  function add_col_html(html, added_height) {
    $('.row_container').height(added_height + 30);
    $('.row_container').append(html);
    elements = $('.card-button');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("mousedown", mdown, { passive: false });
      elements[i].addEventListener("touchstart", mdown, { passive: false });
    }

    // イベントの追加
    $('.modal').modal();

    // 削除ボタンが押されたとき、カードを削除する
    $('.modal-delete').on('click', function (e) {
      modal_delete(e, this);
    });

    // 編集ボタンが押されたとき、カードの中身のテキストをモーダル中のinputに反映させる
    $('.back-btn--left').on('click', function (e) {
      modal_reflect(e, this);
    });

    // モーダルウィンドウのキャンセルが押されたとき
    $('.modal-cancel').on('click', function (e) {
      modal_cancel(e);
    });

    // モーダルウィンドウの変更が押されたとき
    $('.modal-change').on('click', function (e) {
      modal_update(e, this);
    })
    modal_num += 2;
    console.log(modal_num);
  }

  // $('#make_head').on('click', function (e) {
  $(document).on("click", "#make_head", function (e) {
    e.preventDefault();
    var added_height = $(".row_container").height() + 30;
    var html = build_head(added_height);
    add_col_html(html, added_height);
    dropdown_click_full(true);
  });

  $('#make_check').on('click', function (e) {
    e.preventDefault();
    var added_height = $(".row_container").height() + 30;
    var html = build_check(added_height);
    add_col_html(html, added_height);
    dropdown_click_full(true);
  });
});