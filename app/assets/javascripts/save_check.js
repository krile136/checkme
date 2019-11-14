var auto_save_timer;
$(document).on('turbolinks:load', function () {
  $(".update_check").on("click", function () {

    // オートセーブのタイマーが起動済みときはリセットする
    clearTimeout(auto_save_timer);

    // 自動更新のインターバルを止める
    clearInterval(check_interval_timer);

    // オートセーブを起動する
    auto_save_timer = setTimeout(function () {
      var check_form = $('#check_form')[0];
      var formData = new FormData(check_form);
      var url = $(check_form).attr('action')
      M.toast({ html: '保存しています...', classes: 'rounded blue lighten-5 black-text', displayLength: 1000 });
      $.ajax({
        url: url,
        type: "PATCH",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
        .done(function () {
          M.toast({ html: '保存が完了しました', classes: 'rounded blue lighten-5 black-text', displayLength: 1000 });

          // インターバルをスタートさせる
          check_interval_timer = setInterval(check_reload, 5000);
        })
        .fail(function () {
          M.toast({ html: '保存に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 1000 });
        })
    }, 1500);
  })
})