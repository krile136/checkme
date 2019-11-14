$(document).on('turbolinks:load', function () {

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
    modal_cancel(e);
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
    var title_modal = $("#modal1");

    // 隠してたモーダルを起動する
    $(title_modal).modal("open");
  })

  // 新しいシートがクリックされた時
  $(".new_sheet").on("click", function (e) {
    e.preventDefault();
    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    // 表示するモーダルを取得
    var title_modal = $("#modal2");

    // 隠してたモーダルを起動する
    $(title_modal).modal("open");
  })


  // タイトルを編集ボタンを押した時
  // sidenavとnavbarで共通のものを使用するため、隠してある
  // モーダルをjsで起動するようにしている
  $(".edit_title").on("click", function (e) {
    e.preventDefault();

    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    // 表示するモーダルを取得
    var title_modal = $("#modal3");

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
  // 削除が押された時
  $('.sheet_delete_button').on('click', function (e) {
    e.preventDefault();

    // ドロップダウンを閉じる
    $('.dropdown_trigger').dropdown('close');

    // 表示するモーダルを取得
    var delete_modal = $("#modal1");

    // 削除するためのURIを生成、モーダルのリンクに埋め込む
    var page_url = $(location).attr('href');
    var replaced_url = page_url.replace(/user.*$/, "sheets/") + $(this).attr('id');
    delete_modal.find('.sheet_delete_link').attr('href', replaced_url)

    // 隠してたモーダルを起動する
    $(delete_modal).modal("open");
  });

  // 共有が押された時
  $('.sheet_share_btn').on('click', function (e) {
    modal_send_request(e, this);
  });

  // 共有の取り下げが押された時
  $('.request_cancel_btn').on('click', function (e) {
    modal_cooperate(e, this);
  });

  // 共有の拒否が押された時
  $('.request_reject_btn').on('click', function (e) {
    modal_reject(e, this);
  })

});

// 以下は非同期通信で新たにイベントを付与するため、別に記述されている

// キャンセルが押された時
function modal_cancel(e) {
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

// モーダルを開いた時、カードの内容を入力フォームに反映させる
function modal_reflect(e, elem) {
  e.preventDefault();
  var parent = $(elem).parent();
  var text_content = parent.find('#text-content').text();
  var input_field = parent.find('#autocomplete-input')
  input_field.val(text_content);
}

function modal_cooperate(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var cancel_modal = $("#modal3");

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

  // 検索結果およびユーザー追加ブランチの中身をリセットする
  $('#added_user_branch').empty();
  $('#user_name_branch').empty();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var share_modal = $("#modal2");

  // 共有するシートIDを取得、ページ内のフォームに埋め込む
  var sheet_id = $(elem).attr('id')
  $('.sheet_cooperate_link').val(sheet_id);

  // 隠してたモーダルを起動する
  $(share_modal).modal("open");
}

function modal_reject(e, elem) {
  e.preventDefault();

  // ドロップダウンを閉じる
  $('.dropdown_trigger').dropdown('close');

  // 表示するモーダルを取得
  var reject_modal = $("#modal4");

  // 拒否するリクエストIDを取得、ページ内のフォームに埋め込む
  // 右のリンクを生成する /cooperate_requests/:id/reject
  // methodはshow.html.haml側にすでにDELETEが用意されている
  var page_url = $(location).attr('href');
  var replaced_url = page_url.replace(/user.*$/, "cooperate_requests/") + $(elem).attr('id') + '/reject';
  reject_modal.find('.request_reject_link').attr('href', replaced_url)

  // 隠してたモーダルを起動する
  $(reject_modal).modal("open");
}