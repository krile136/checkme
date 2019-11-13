var search_name_timer;
var added_user_list = [];
$(document).on('turbolinks:load', function () {

  var user_list = $('#user_name_branch');
  var added_list = $('#added_user_branch')

  function appendUser(user, is_added) {
    var html = `<div class="row">
                  <div class="col s1 m1">
                    <label>
                      <input class="filled-in cooperate_check" type="checkbox">
                      <span></span>
                    </label>
                  </div>
                  <div class="col s9 offset-s1 m10">
                    <div class="appended_user_name">${user.name}</div>
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

  function appendUserToAddedTree(name) {
    var html = `<div class="row">
                  <div class="col s1 m1">
                    <label>
                      <input class="filled-in added_user" type="checkbox" checked="checked">
                      <span></span>
                    </label>
                  </div>
                  <div class="col s9 offset-s1 m10">
                    <div class="appended_user_name">${name}</div>
                    <div class="divider"></div>
                  </div>
                </div>`
    added_list.append(html);
  }

  function move_to_added_branch() {
    var show_user = $('.cooperate_check');
    $.each(show_user, function () {
      if (this.checked) {
        var user_name = $(this).parent().parent().parent().find(".appended_user_name").text();
        appendUserToAddedTree(user_name);
        added_user_list.push(user_name);
      }
    });

    var added_user = $(".added_user");
    $.each(added_user, function () {
      if (!this.checked) {
        var remove_user = $(this).parent().parent().parent();
        var user_name = remove_user.find(".appended_user_name").text()
        remove_user.remove();
        added_user_list = added_user_list.filter(n => n !== user_name);
      };
    });
  }

  $(".input_user_name").on("keyup", function () {

    // 検索実行のタイマーが起動済みの時はリセットする
    clearTimeout(search_name_timer);

    // 検索実行のタイマーを起動する
    search_name_timer = setTimeout(function () {
      $('.spinner-hidden').css("display", "block");

      // added_branchの移動操作をする
      move_to_added_branch();

      // 入力フォームの文字を元に非同期通信でユーザー検索を行う
      var input = $(".input_user_name").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
        .done(function (users) {
          $("#user_name_branch").empty();
          var current_id = $(".current_id").attr('id');
          if (users.length != 0) {
            users.forEach(function (user) {
              // user.nameと一致するデータがadded_user_listになく、自分以外のユーザーであれば追加する
              var index = added_user_list.findIndex(item => item === user.name)
              if (user.id != current_id && index == -1) {
                appendUser(user);
              };
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