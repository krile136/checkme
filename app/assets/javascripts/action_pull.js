$(document).on('turbolinks:load', function () {
  $('.sheet_pull_link').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // モーダルを閉じる
    $('.modal').modal('close');

    var url = $(this).attr('href');
    M.toast({ html: 'シートをプルしています...', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
    $.ajax({
      url: url,
      type: "POST",
      dataType: 'json',
      beforeSend: function (xhr) { xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr('content')) }
    })
      .done(function (sheet) {
        M.toast({ html: 'プルが完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
        M.toast({ html: 'ページを更新して反映します', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
        setTimeout("location.reload(true)", 2000);
      })
      .fail(function () {
        M.toast({ html: 'プルに失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 2000 });
      })
  })
})