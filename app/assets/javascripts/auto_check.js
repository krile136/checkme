var check_reload = function () {
  var is_show_page = $('.auto_check');

  if (is_show_page.length > 0) {
    var sheet_id = $(is_show_page).data('sheet_id');
    $.ajax({
      type: 'GET',
      url: '/sheets/get_check',
      dataType: 'json',
      data: { sheet_id: sheet_id }
    })
      .done(function (items) {
        check_row = $('.update_check');
        $.each(items, function (index, item) {
          check_row[index].checked = item.is_check
        })
      })
      .fail(function () {
        M.toast({ html: '自動更新に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 1000 });
      })
  }
}

check_interval_timer = setInterval(check_reload, 5000);