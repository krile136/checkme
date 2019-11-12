// var date_is_updated = false

$(document).on('turbolinks:load', function () {
  var date_form = $('#update_date')[0];
  if (date_form) {
    var formData = new FormData(date_form);
    var url = $(date_form).attr('action');
    $.ajax({
      url: url,
      type: "PATCH",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        M.toast({ html: '閲覧時間を更新しました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
      })
      .fail(function () {
        M.toast({ html: 'エラーが発生しました', classes: 'rounded red lighten-4 black-text', displayLength: 1000 });
      })
  }
});