$(document).on('turbolinks:load', function () {
  $(".filled-in").on("click", function () {
    setTimeout(function () {
      var check_form = $('#check_form')[0];
      var formData = new FormData(check_form);
      var url = $(check_form).attr('action')
      $.ajax({
        url: url,
        type: "PATCH",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
        .done(function (data) {
          alert('保存しました');
        })
        .fail(function () {
          alert('登録エラー');
        })
    }, 1000);
  })
})