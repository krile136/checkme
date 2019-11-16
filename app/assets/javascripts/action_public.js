// 公開するボタンが押された時

$(document).on('turbolinks:load', function () {
  $('.sheet_public_link').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // モーダルを閉じる
    $('.modal').modal('close');

    var url = $(this).attr('href');
    M.toast({ html: '公開設定にしています...', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
    $.ajax({
      url: url,
      type: "PATCH",
      dataType: 'json',
      beforeSend: function (xhr) { xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr('content')) }
    })
      .done(function (data) {
        M.toast({ html: '公開設定が完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });

        // // 承認待ちのメッセージをシートタイトルにくっつける
        // var sheet_id = $('.sheet_cooperate_link').val();
        // var request_msg_branch = '.request_sheet_' + sheet_id;
        // $(request_msg_branch).text("(承認待ち)");

        // // ドロップダウン内の項目を変更する
        // var select_branch = '.cooperate_select_branch_' + sheet_id;
        // var request_table_id = data[0].id;
        // $(select_branch).empty();
        // $(select_branch).append(appendRequestCancelmsg(request_table_id));

        // // 追加した分にモーダル起動のイベントを付与
        // $('.request_cancel_btn').on('click', function (e) {
        //   modal_cooperate(e, this)
        // });
      })
      .fail(function () {
        M.toast({ html: '公開設定に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 2000 });
      })
  })
})