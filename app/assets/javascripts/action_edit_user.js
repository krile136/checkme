$(document).on('turbolinks:load', function () {
  var current_user_name = $('#edit_username_form').data('name');
  var current_user_email = $('#edit_email_form').data('email');


  var input_name = $('.edit_user_name').val();
  var input_email = $('.edit_email').val();

  var edit_link = $('.user_edit_link');

  var error_msg_branch = $('.error_msg')
  var ok_text = "利用可能なアドレスです"

  var email_validation = new RegExp(/^\S+@\S+\.\S+$/)

  function switch_enable_update_btn() {
    // メールアドレスに変更があり、バリデーションが通って他に使われいない場合　もしくは
    // メールアドレスに変更がなく、ユーザーネームが変更になっている時に更新ボタンを有効にする
    if (($(error_msg_branch).text() == ok_text) || ((input_name != current_user_name)) && (input_email == current_user_email)) {
      $(edit_link).css('color', '#343434');
      $(edit_link).css('pointer-events', 'auto');
    } else {
      $(edit_link).css('color', '#bdbdbd');
      $(edit_link).css('pointer-events', 'none');
    }
  }

  // 名前入力フォームに入力があった時に、input_nameを更新する
  $(".edit_user_name").on("keyup", function () {
    input_name = $('.edit_user_name').val();
    switch_enable_update_btn();
  })

  // email入力フォームに入力があった時に、メールアドレスの更新不可チェックを行う
  $(".edit_email").on("keyup", function () {
    input_email = $('.edit_email').val();

    // 検索実行のタイマーが起動済みの時はリセットする
    clearTimeout(search_email_timer);

    // email検索実行のタイマーを起動する
    search_email_timer = setTimeout(function () {

      // 入力フォームの文字を元に非同期通信でemail検索と照合を行う
      if (current_user_email != input_email) {
        if (email_validation.test(input_email)) {
          $.ajax({
            type: 'GET',
            url: '/api/users',
            data: { keyword: input_email },
            dataType: 'json'
          })
            .done(function (user) {
              $(error_msg_branch).empty();
              if (!user) {
                $(error_msg_branch).append("利用可能なアドレスです");
              } else {
                $(error_msg_branch).append("すでに使われているアドレスです");
              }
              switch_enable_update_btn();
            })
            .fail(function () {
              M.toast({ html: '検索に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 5000 });
            })
        } else {
          $(error_msg_branch).empty();
          $(error_msg_branch).append("メールアドレスを正しく入力してください")
          switch_enable_update_btn();
        }
      } else {
        // フォームに何も入力されていない時
        $(error_msg_branch).empty();
        switch_enable_update_btn();
      }
    }, 500);
  })

  $('.user_edit_link').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var user_id = $('.current_user').attr('id');

    var url = '/api/users/' + user_id;

    $.ajax({
      url: url,
      type: "PATCH",
      data: { name: input_name, email: input_email },
      dataType: 'json',
      beforeSend: function (xhr) { xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr('content')) }
    })
      .done(function () {
        M.toast({ html: 'プロフィールを更新しました', classes: 'rounded blue lighten-5 black-text', displayLength: 2000 });
        current_user_name = input_name;
        current_user_email = input_email;
        switch_enable_update_btn()
      })
      .fail(function () {
        M.toast({ html: '更新に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 2000 });
      })

    // モーダルを閉じる
    $('.modal').modal('close');
  })
})