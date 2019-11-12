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
      processData: false,
      contentType: false
    })
      .done(function (data) {

        // 削除用フォームをリセットする
        $('#deleted_items').empty();
        deleted_rows = 0;

        // 新しく追加したアイテムにidを付与する
        elements = $('.drag-and-drop');
        $.each(elements, function () {
          item_id = $(this).attr('id');
          if (!item_id) {
            var new_item = this;
            $.each(data, function () {
              if (new_item.offsetTop == this.top) {
                $(new_item).attr('id', this.id);
              };
            });
          };
        });
        M.toast({ html: '保存が完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 1000 });
      })
      .fail(function () {
        M.toast({ html: '保存に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 1000 });
      })
  })
})