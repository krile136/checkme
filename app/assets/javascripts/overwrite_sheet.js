// シートを編集して保存する時に実行する

$(document).on('turbolinks:load', function () {
  $(".update_sheet").on('click', function (e) {
    e.preventDefault();

    // サイドバーを閉じる
    $('.sidenav').sidenav('close');

    var sheet_form = $('#sheet_form')[0];
    var formData = new FormData(sheet_form);
    var url = $(sheet_form).attr('action');

    M.toast({ html: '保存しています...', classes: 'rounded blue lighten-5 black-text', displayLength: 1000 });

    $.ajax({
      url: url,
      type: "PATCH",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        M.toast({ html: '保存が完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 1000 });
        // 削除用フォームをリセットする
        $('#deleted_items').empty();
        deleted_rows = 0;
      })
      .fail(function () {
        M.toast({ html: '保存に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 1000 });
      })
  })
})