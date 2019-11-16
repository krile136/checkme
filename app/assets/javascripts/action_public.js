// 公開に関するアクション

// 公開するが押された時
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
      .done(function (sheet) {
        M.toast({ html: '公開設定が完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });

        // 公開アイコンをくっつける
        var public_branch = '#public_sheet_' + sheet.id;
        var public_icon_html = `<i class="material-icons small icon-vert-center">language</i>`
        $(public_branch).append(public_icon_html);

        // // ドロップダウン内の項目を変更する
        var select_branch = '.public_select_branch_' + sheet.id;
        var public_command = `<a class="sheet_not_public_btn" id="${sheet.id}" href="">
                                <i class="material-icons">language</i>公開をやめる
                              </a>`
        $(select_branch).empty();
        $(select_branch).append(public_command);

        // 追加した分にモーダル起動のイベントを付与
        $('.sheet_not_public_btn').on('click', function (e) {
          modal_public_cancel(e, this);
        });
      })
      .fail(function () {
        M.toast({ html: '公開設定に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 2000 });
      })
  })
})

// 公開をやめるが押された時
$(document).on('turbolinks:load', function () {
  $('.sheet_public_cancel_link').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // モーダルを閉じる
    $('.modal').modal('close');

    var url = $(this).attr('href');
    M.toast({ html: '公開を取りやめています...', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
    $.ajax({
      url: url,
      type: "PATCH",
      dataType: 'json',
      beforeSend: function (xhr) { xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr('content')) }
    })
      .done(function (sheet) {
        M.toast({ html: '公開設定を取りやめました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });

        // 公開アイコンを外す
        var public_branch = '#public_sheet_' + sheet.id;
        $(public_branch).empty();

        // // ドロップダウン内の項目を変更する
        var select_branch = '.public_select_branch_' + sheet.id;
        var public_command = `<a class="sheet_public_btn" id="${sheet.id}" href="">
                                <i class="material-icons">language</i>公開する
                              </a>`
        $(select_branch).empty();
        $(select_branch).append(public_command);

        // 追加した分にモーダル起動のイベントを付与
        $('.sheet_public_btn').on('click', function (e) {
          modal_public(e, this);
        });
      })
      .fail(function () {
        M.toast({ html: '公開設定の取りやめに失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 2000 });
      })
  })
})