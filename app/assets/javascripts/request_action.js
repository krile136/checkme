$(document).on('turbolinks:load', function () {

  // リクエストを送信した時、cooperate_requestテーブルへ非同期でデータを保存する
  $('.sheet_cooperate_btn').on('click', function (e) {
    e.preventDefault();

    // モーダルを閉じる
    $('.modal').modal('close');

    var cooperate_form = $('#cooperate_form')[0];
    var formData = new FormData(cooperate_form);
    var url = $(cooperate_form).attr('action');
    M.toast({ html: 'リクエストを送信しています...', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        M.toast({ html: 'リクエスト送信が完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });

        // 承認待ちのメッセージをシートタイトルにくっつける
        var sheet_id = $('.sheet_cooperate_link').val();
        var request_msg_branch = '.request_sheet_' + sheet_id;
        $(request_msg_branch).text("(承認待ち)");

        // ドロップダウン内の項目を変更する
        var select_branch = '.cooperate_select_branch_' + sheet_id;
        var request_table_id = data[0].id;
        $(select_branch).empty();
        $(select_branch).append(appendRequestCancelmsg(request_table_id));

        // 追加した分にモーダル起動のイベントを付与
        $('.request_cancel_btn').on('click', function (e) {
          modal_cooperate(e, this)
        });
      })
      .fail(function () {
        M.toast({ html: 'リクエスト送信に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 2000 });
      })
  })

  // リクエストを取り下げる際、非同期通信でデータを削除する
  $('.request_cancel_link').on('click', function (e) {

    // DELETEのイベントをストップさせるが、stopPropagationがないと止められない
    e.preventDefault();
    e.stopPropagation();

    // モーダルを閉じる
    $('.modal').modal('close');

    var url = $(this).attr('href');
    M.toast({ html: 'リクエストを取り下げています...', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
    $.ajax({
      url: url,
      type: "DELETE",
      dataType: 'json',
      beforeSend: function (xhr) { xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr('content')) }
    })
      .done(function (data) {
        M.toast({ html: 'リクエストの取り下げが完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });

        // 承認待ちのメッセージをシートタイトルから取り除く
        var sheet_id = data[0].sheet_id;
        var request_msg_branch = '.request_sheet_' + sheet_id;
        $(request_msg_branch).empty();

        // ドロップダウン内の項目を変更する
        var select_branch = '.cooperate_select_branch_' + sheet_id;
        $(select_branch).empty();
        $(select_branch).append(appendSendRequestmsg(sheet_id));

        // 追加した分にモーダル起動のイベントを付与
        $('.sheet_share_btn').on('click', function (e) {
          modal_send_request(e, this);
        });
      })
      .fail(function () {
        M.toast({ html: 'リクエストの取り下げに失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 2000 });
      })
  })
})