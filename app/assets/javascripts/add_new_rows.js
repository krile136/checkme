$(document).on('turbolinks:load', function () {
  // 見出しの組み立て
  function build_head(added_height) {
    var html = `<div class="row">
                  <div class="col s12 m10 offset-m1 drag-and-drop drag-off" style="top:${added_height}px">
                    <div class="card green lighten-5">
                      <div class="card-content black-text">
                        <div class="card-text">
                          見出し
                          <a class="card-button btn-flat show_circle_btn mouse_on_cursor_move">
                            <i class="material-icons small card-icon-vert">menu</i>
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
                    <div class="card lime lighten-5">
                      <div class="card-content black-text">
                        <div class="card-text">
                          チェック項目
                          <a class="card-button btn-flat show_circle_btn mouse_on_cursor_move">
                            <i class="material-icons small card-icon-vert">menu</i>
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
  }

  $('#make_head').on('click', function (e) {
    e.preventDefault();
    var added_height = $(".row_container").height() + 30;
    var html = build_head(added_height);
    add_col_html(html, added_height);
    dropdown_click_full();
  });

  $('#make_check').on('click', function (e) {
    e.preventDefault();
    var added_height = $(".row_container").height() + 30;
    var html = build_check(added_height);
    add_col_html(html, added_height);
    dropdown_click_full();
  });
});