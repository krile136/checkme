var search_name_timer;
$(document).on('turbolinks:load', function () {

  var user_list = $("#user_name_branch");

  function appendUser(user) {
    var html = `<div class="row">
                  <div class="col s1">
                    <label>
                      <input class="filled-in" type="checkbox">
                      <span></span>
                    </label>
                  </div>
                  <div class="col s10">
                    ${user.name}
                    <div class="divider"></div>
                  </div>
                </div>`
    user_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="row">
                  <div class="col s10 offset-s1 m10 offset-m1">
                    一致するメンバーはいません
                  </div>
                </div>`
    user_list.append(html);
  }

  $(".input_user_name").on("keyup", function () {

    // 検索実行のタイマーが起動済みの時はリセットする
    clearTimeout(search_name_timer);

    // 検索実行のタイマーを起動する
    search_name_timer = setTimeout(function () {
      $('.spinner-hidden').css("display", "block");
      var input = $(".input_user_name").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
        .done(function (users) {
          console.log(users);
          $("#user_name_branch").empty();
          var current_id = $(".current_id").attr('id');
          if (users.length != 0) {
            users.forEach(function (user) {
              if (user.id != current_id) {
                appendUser(user);
              }
            });
          }
          else {
            appendErrMsgToHTML("一致するメンバーはいません")
          }
          $('.spinner-hidden').css("display", "none");
        })
        .fail(function () {
          M.toast({ html: '検索に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 5000 });
        })
    }, 500);
  });
});