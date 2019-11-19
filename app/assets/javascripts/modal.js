$(document).on('turbolinks:load', function () {

  $('.help_btn').on('click', function (e) {
    e.preventDefault();

    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    // 表示するモーダルを取得
    var help_modal = $("#help_modal");

    // 隠してたモーダルを起動する
    $(help_modal).modal("open");
  })

  $('.show_profile_btn').on('click', function (e) {
    e.preventDefault();

    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    // 表示するモーダルを取得
    var profile_modal = $("#profile_modal");

    // 隠してたモーダルを起動する
    $(profile_modal).modal("open");
  })

  // --------------------------------------シート作成時のモーダル関係--------------------------------------
  // カードに付与するモーダル関連関数は、カード追加時にイベントを付与する必要があるため
  // タイトル用のモーダルとは別の記述になっている

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
    modal_close(e);
  });

  // モーダルウィンドウの変更が押されたとき
  $('.modal-change').on('click', function (e) {
    modal_update(e, this);
  })

  // 保存が押された時
  $(".save_sheet").on("click", function (e) {
    e.preventDefault();
    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    // 表示するモーダルを取得
    var save_modal = $("#save_modal");

    // 隠してたモーダルを起動する
    $(save_modal).modal("open");
  })

  // 新しいシートがクリックされた時
  $(".new_sheet").on("click", function (e) {
    e.preventDefault();
    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    // 表示するモーダルを取得
    var new_modal = $("#new_modal");

    // 隠してたモーダルを起動する
    $(new_modal).modal("open");
  })


  // タイトルを編集ボタンを押した時
  // sidenavとnavbarで共通のものを使用するため、隠してある
  // モーダルをjsで起動するようにしている
  $(".edit_title").on("click", function (e) {
    e.preventDefault();

    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    // 表示するモーダルを取得
    var title_modal = $("#title_modal");

    // シートタイトルを取得、反映させる
    var sheet_title = $('#logo-container').text();
    var input_field = title_modal.find('#autocomplete-input')
    input_field.val(sheet_title);

    // 隠してたモーダルを起動する
    $(title_modal).modal("open");
  })

  // タイトル用のモーダルの変更するが押された時
  $('.modal-title-update').on('click', function (e) {
    e.preventDefault();
    var title = $('.show_sheet_title');
    var input_text = $(this).parent().parent().find('#autocomplete-input').val();
    title.text(input_text);
    var input_field = $('#input_sheet_title');
    input_field.val(input_text);
  })

  // --------------------------------------マイページのモーダル関係--------------------------------------

  set_mypage_modals(this);
  // 削除が押された時
  $('.sheet_delete_button').on('click', function (e) {
    modal_delete_sheet(e, this);
  });

  // 共有が押された時
  $('.sheet_share_btn').on('click', function (e) {
    modal_send_request(e, this);
  });

  // 共有の取り下げが押された時
  $('.request_cancel_btn').on('click', function (e) {
    modal_cancel(e, this);
  });

  // 共有の拒否が押された時
  $('.request_reject_btn').on('click', function (e) {
    modal_reject(e, this);
  })

  // 共有の承認が押された時
  $('.request_accept_btn').on('click', function (e) {
    modal_accept(e, this);
  })

  // 公開するが押された時
  $('.sheet_public_btn').on('click', function (e) {
    modal_public(e, this);
  })

  // 公開をやめるが押された時
  $('.sheet_not_public_btn').on('click', function (e) {
    modal_public_cancel(e, this);
  });

  // シート検索結果もしくは共有リクエストがきているシートをクリックされた時
  // ajax用
  $('.sheet_preview_btn').on('click', function (e) {
    modal_preview(e, this);
  })

  // リクエスト用
  $('.sheet_preview_btn_fixed').on('click', function (e) {
    modal_preview(e, this);
  })

});

// プレビュー組み立て用
function getHeadHTML(item) {
  var html = `<div class="row">
                <div class="col s12" style="top:${item.top - 30}px">
                  <div class="card green lighten-5">
                    <div class="card-content black-text">
                      <div class="card-text">
                        <div id="text-content">${item.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  return html
}
function getItemHTML(item) {
  var html = `<div class="row">
                <div class="col s11 offset-s1" style="top:${item.top - 30}px">
                  <div class="card lime lighten-5">
                    <div class="card-content black-text">
                      <div class="card-text">
                        <div id="text-content">${item.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  return html
}

// 以下は非同期通信で新たにイベントを付与するため、別に記述されている

// キャンセルが押された時
function modal_close(e) {
  e.preventDefault();
}

// 変更が押された時
function modal_update(e, elem) {
  e.preventDefault();
  var parent = $(elem).parent().parent().parent();
  var text_content = parent.find('#text-content');
  var input_text = parent.find('#autocomplete-input').val();
  text_content.text(input_text);
  set_input_field()
}

// 削除ボタンが押された時の確認メッセージ
function modal_delete(e, elem) {
  e.preventDefault();
  var delete_branch = $(elem).parent().parent().parent();
  var branch_top = delete_branch[0].offsetTop;
  if (branch_top != 0) {
    // もし削除した行がidを持っていた場合
    // 削除情報を生成してdeleted_branchにくっつける
    if ($(delete_branch).attr("id")) {
      set_delete_field($(delete_branch).attr("id"))
    }

    delete_branch.parent().remove();

    // 削除する行より下の行を上に動かす
    elements = $('.drag-and-drop');
    $.each(elements, function () {
      if ($(this)[0].offsetTop > branch_top) {
        $(this).animate({ top: $(this)[0].offsetTop - row_height + "px" }, 'fast');
      }
    });
    $('.row_container').animate({ height: $(".row_container").height() - row_height }, 'fast');

    // 画面のクリック有効範囲の調整
    dropdown_click_full(false);

    setTimeout(function () {
      // 保存用のテキストフィールドを生成
      set_input_field()
    }, 300);
  }
}

function set_mypage_modals(elem) {

}

// モーダルを開いた時、カードの内容を入力フォームに反映させる
function modal_reflect(e, elem) {
  e.preventDefault();
  var parent = $(elem).parent();
  var text_content = parent.find('#text-content').text();
  var input_field = parent.find('#autocomplete-input')
  input_field.val(text_content);
}

function modal_delete_sheet(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var delete_modal = $("#delete_modal");

  // 削除するためのURIを生成、モーダルのリンクに埋め込む
  var page_url = $(location).attr('href');
  var replaced_url = page_url.replace(/user.*$/, "sheets/") + $(elem).attr('id');
  delete_modal.find('.sheet_delete_link').attr('href', replaced_url)

  // 隠してたモーダルを起動する
  $(delete_modal).modal("open");
}

function modal_cancel(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var cancel_modal = $("#cancel_modal");

  // 削除するためのURIを生成、モーダルのリンクに埋め込む
  var page_url = $(location).attr('href');
  var replaced_url = page_url.replace(/user.*$/, "cooperate_requests/") + $(elem).attr('id');
  cancel_modal.find('.request_cancel_link').attr('href', replaced_url)
  cancel_modal.find('.request_cancel_link').attr('id', $(elem).attr('id'))

  // 隠してたモーダルを起動する
  $(cancel_modal).modal("open");
}

function modal_send_request(e, elem) {
  e.preventDefault();

  // cooperate_listを初期化
  cooperate_user_list = [];

  // cooperate_listに、すでに共有化しているユーザーのリストを挿入する
  var coop_user_branch = $(elem).parent().parent().find('.name_list');
  $.each(coop_user_branch, function () {
    cooperate_user_list.push($(this).data('name'))
  })

  // 検索結果、ユーザー追加ブランチの中身、入力フォームをリセットし、メッセージをセットする
  $('#added_user_branch').empty();
  user_list = $('#user_name_branch');
  user_list.empty();
  user_list.append(getErrMsgToHTML("検索するユーザー名を入力してください"));
  $('#added_user_branch').empty();
  $('#cooperate_branch').empty();
  $(".input_user_name").val("")

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var cooperate_modal = $("#cooperate_modal");

  // 共有するシートIDを取得、ページ内のフォームに埋め込む
  var sheet_id = $(elem).attr('id')
  $('.sheet_cooperate_link').val(sheet_id);

  // 隠してたモーダルを起動する
  $(cooperate_modal).modal("open");
}

function modal_reject(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var reject_modal = $("#reject_modal");

  // 拒否するリクエストIDを取得、ページ内のフォームに埋め込む
  // 右のリンクを生成する /cooperate_requests/:id/reject
  // methodはshow.html.haml側にすでにDELETEが用意されている
  var page_url = $(location).attr('href');
  var replaced_url = page_url.replace(/user.*$/, "cooperate_requests/") + $(elem).attr('id') + '/reject';
  reject_modal.find('.request_reject_link').attr('href', replaced_url)

  // 隠してたモーダルを起動する
  $(reject_modal).modal("open");
}

function modal_accept(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var accept_modal = $("#accept_modal");

  // 承認するリクエストIDを取得、ページ内のフォームに埋め込む
  // 右のリンクを生成する /cooperate_requests/:id/accept
  // methodはshow.html.haml側にすでにPATCHが用意されている
  var page_url = $(location).attr('href');
  var replaced_url = page_url.replace(/user.*$/, "cooperate_requests/") + $(elem).attr('id') + '/accept';
  accept_modal.find('.request_accept_link').attr('href', replaced_url)

  // 隠してたモーダルを起動する
  $(accept_modal).modal("open");
}

function modal_public(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var public_modal = $("#public_modal");

  // 公開するシートIDを取得して、モーダル内のリンクに埋め込む
  var sheet_id = $(elem).attr('id');
  var replaced_url = "/sheets/" + sheet_id + "/set_public"
  public_modal.find('.sheet_public_link').attr("href", replaced_url);

  // 隠してたモーダルを起動する
  $(public_modal).modal("open");
}

function modal_public_cancel(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var public_cancel_modal = $("#public_cancel_modal");

  // 公開キャンセルをするシートIDを取得して、モーダル内のリンクに埋め込む
  var sheet_id = $(elem).attr('id');
  var replaced_url = "/sheets/" + sheet_id + "/cancel_public"
  public_cancel_modal.find('.sheet_public_cancel_link').attr("href", replaced_url);

  // 隠してたモーダルを起動する
  $(public_cancel_modal).modal("open");
}

function modal_pull(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var pull_modal = $("#pull_modal");

  var sheet_id = $(elem).attr('id');
  var replaced_url = "/sheets/" + sheet_id + "/pull"
  pull_modal.find('.sheet_pull_link').attr("href", replaced_url);

  // 隠してたモーダルを起動する
  $(pull_modal).modal("open");
}

function modal_preview(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 検索中のspinnerを表示する
  $('.spinner-hidden').css("display", "block");

  // 表示するモーダルを取得
  var preview_modal = $("#preview_modal");

  // プレビュー内容をリセットする
  var items_branch = $(preview_modal).find('.modal-content');
  $(items_branch).empty()

  // 非同期通信でプレビューする内容を取得して反映させる
  var sheet_id = $(elem).data('sheet_id');
  var url = "/items/" + sheet_id

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json'
  })
    .done(function (items) {
      $('.spinner-hidden').css("display", "none");
      if (items.length > 0) {
        $.each(items, function (i, item) {
          if (item.is_head) {
            $(items_branch).append(getHeadHTML(item))
          } else {
            $(items_branch).append(getItemHTML(item))
          }
        })
      }
    })
    .fail(function () {
      M.toast({ html: 'プレビューに失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 5000 });
    });

  // 隠してたモーダルを起動する
  $(preview_modal).modal("open");
}