var search_email_timer;

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
    if ($(error_msg_branch).text() == ok_text) {
      $(edit_link).css('color', '#343434');
      $(edit_link).css('pointer-events', 'auto');
    } else {
      $(edit_link).css('color', '#bdbdbd');
      $(edit_link).css('pointer-events', 'none');
    }
  }

  $(".edit_user_name").on("keyup", function () {
    input_name = $('.edit_user_name').val();
    switch_enable_update_btn();
  })

  $(".edit_email").on("keyup", function () {
    input_email = $('.edit_email').val();

    // 検索実行のタイマーが起動済みの時はリセットする
    clearTimeout(search_email_timer);

    // email検索実行のタイマーを起動する
    search_email_timer = setTimeout(function () {

      // 入力フォームの文字を元に非同期通信でemail検索と照合を行う
      if (current_user_email != input_email) {
        if (email_validation.test(input_email)) {
          console.log("ok")
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
              // // added_branchの移動操作をする
              // move_to_added_branch();

              // // 検索結果のブランチをリセットする
              // $("#user_name_branch").empty();

              // var current_id = $(".current_user").attr('id');
              // if (users.length > 0) {
              //   users.forEach(function (user) {
              //     // 自分以外のユーザーかつ、user.nameと一致するデータがadded_user_listとcooperate_listになければ追加する
              //     var index = added_user_list.findIndex(item => item === user.name)
              //     var coop_index = cooperate_user_list.findIndex(item => item === user.name)
              //     if (user.id != current_id && index == -1 && coop_index == -1) {
              //       appendUser(user);
              //     };
              //   });
              //   // クリックした時にcooperate_branchに追加したり削除するイベントを付与
              //   $('.filled-in').on('click', function () {
              //     add_to_cooperate_branch();
              //   })
              // }
              // else {
              //   user_list.append(getErrMsgToHTML("一致するメンバーはいません"));
              // }
              // $('.spinner-hidden').css("display", "none");
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

    // モーダルを閉じる
    $('.modal').modal('close');
  })
})