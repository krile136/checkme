var search_name_timer;
var added_user_list = [];
var cooperate_user_list = [];

// search_sheet.jsでも使っているのでグローバル化しておく
function getErrMsgToHTML(msg) {
  var html = `<div class="row">
                  <div class="col s12 center">${msg}</div>
                </div>`
  return html
}

$(document).on('turbolinks:load', function () {

  var user_list = $('#user_name_branch');
  var added_list = $('#added_user_branch');
  var cooperate_list = $('#cooperate_branch');

  function appendUser(user) {
    var html = `<div class="row">
                  <div class="col s1 m1">
                    <label>
                      <input class="filled-in cooperate_check" id="${user.id}" type="checkbox" value="true">
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

  function appendUserToAddedTree(name, id) {
    var html = `<div class="row">
                  <div class="col s1 m1">
                    <label>
                      <input class="filled-in added_user"  id="${id}" type="checkbox" value="true" checked="checked">
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
  function appendRequestIDToCooperateTree(id) {
    var html = `<input value="${id}" type="hidden" name="request_id[]" id="request_id">`
    cooperate_list.append(html);
  }

  // #user_name_branchの中からチェックの入ったものだけadded_user_branchに移す
  function move_to_added_branch() {
    var show_user = $('.cooperate_check');
    $.each(show_user, function () {
      if (this.checked) {
        var move_user = $(this).parent().parent().parent().find(".appended_user_name");
        var user_name = move_user.text();
        var user_id = $(this).attr('id')
        appendUserToAddedTree(user_name, user_id);
        $('.filled-in').on('click', function () {
          add_to_cooperate_branch();
        })
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

  // cooperate_branch(登録用フォームのブランチ)に追加する
  function add_to_cooperate_branch() {
    var added_user = $(".added_user");
    var show_user = $('.cooperate_check');

    // cooperate_branchをリセットする
    $('#cooperate_branch').empty();

    $.each(added_user, function () {
      if (this.checked) {
        var request_id = $(this).attr('id')
        appendRequestIDToCooperateTree(request_id);
      }
    });
    $.each(show_user, function () {
      if (this.checked) {
        var request_id = $(this).attr('id')
        appendRequestIDToCooperateTree(request_id);
      }
    });
  }

  $(".input_user_name").on("keyup", function () {

    // 検索実行のタイマーが起動済みの時はリセットする
    clearTimeout(search_name_timer);

    // 検索実行のタイマーを起動する
    search_name_timer = setTimeout(function () {
      $('.spinner-hidden').css("display", "block");

      // 入力フォームの文字を元に非同期通信でユーザー検索を行う
      var input = $(".input_user_name").val();
      if (input != "") {
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
          .done(function (users) {

            // added_branchの移動操作をする
            move_to_added_branch();

            // 検索結果のブランチをリセットする
            $("#user_name_branch").empty();

            var current_id = $(".current_user").attr('id');
            if (users.length > 0) {
              users.forEach(function (user) {
                // 自分以外のユーザーかつ、user.nameと一致するデータがadded_user_listとcooperate_listになければ追加する
                var index = added_user_list.findIndex(item => item === user.name)
                var coop_index = cooperate_user_list.findIndex(item => item === user.name)
                if (user.id != current_id && index == -1 && coop_index == -1) {
                  appendUser(user);
                };
              });
              // クリックした時にcooperate_branchに追加したり削除するイベントを付与
              $('.filled-in').on('click', function () {
                add_to_cooperate_branch();
              })
            }
            else {
              user_list.append(getErrMsgToHTML("一致するメンバーはいません"));
            }
            $('.spinner-hidden').css("display", "none");
          })
          .fail(function () {
            M.toast({ html: '検索に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 5000 });
          })
      } else {
        // フォームに何も入力されていない時

        // added_branchの移動操作をする
        move_to_added_branch();

        $("#user_name_branch").empty();
        user_list.append(getErrMsgToHTML("検索するユーザー名を入力してください"));
        $('.spinner-hidden').css("display", "none");
      }
    }, 500);
  });
});