var search_sheets_timer;

$(document).on('turbolinks:load', function () {

  // マイシート検索が押された時
  $('#find_in_mypage').on('click', function (e) {
    e.preventDefault();

    // ドロップダウンを閉じる
    $('.dropdown_trigger').dropdown('close');

    // 検索フォームの横のアイコンを変更する
    $('#search_icon').text('find_in_page');

    // シート検索apiへのURLを書き換える
    $('.sheet_search_form').data("url", "/api/sheets/mypage")
  })

  // 公開シートを検索が押された時
  $('#find_in_public').on('click', function (e) {
    e.preventDefault();

    // ドロップダウンを閉じる
    $('.dropdown_trigger').dropdown('close');

    // 検索フォームの横のアイコンを変更する
    $('#search_icon').text('language');

    // シート検索apiへのURLを書き換える
    $('.sheet_search_form').data("url", "/api/sheets/public")
  })

  $('.sheet_search_form').on('keyup', function () {

    // 検索実行のタイマーが起動済みの時はリセットする
    clearTimeout(search_sheets_timer);

    search_sheets_timer = setTimeout(function () {
      $('.spinner-hidden').css("display", "block");
      $('#display_sheets').css('display', 'none');

      var input = $(".sheet_search_form").val();
      var url = $('.sheet_search_form').data("url")
      console.log(url);

      // 入力フォームの文字を元に非同期通信でシート検索を行う
      $.ajax({
        type: 'GET',
        url: url,
        data: { keyword: input },
        dataType: 'json'
      })
        .done(function (sheets) {

          // // added_branchの移動操作をする
          // move_to_added_branch();

          // // 検索結果のブランチをリセットする
          // $("#user_name_branch").empty();

          // var current_id = $(".current_id").attr('id');
          // if (users.length != 0) {
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
          //   appendErrMsgToHTML("一致するメンバーはいません")
          // }
          // $('.spinner-hidden').css("display", "none");
        })
        .fail(function () {
          M.toast({ html: '検索に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 5000 });
        })
    }, 500);
  });
});