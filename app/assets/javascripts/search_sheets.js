var search_sheets_timer;

$(document).on('turbolinks:load', function () {

  var searched_sheets_branch = $('#searched_sheets_branch')

  function appendSearchedSheet(i, sheet) {
    var coop_icon = "";
    if (sheet.is_cooperate) {
      coop_icon = `<i class="material-icons small icon-vert-center">supervisor_account</i>`
    }
    var html = `<div class="row text-vert-center sheet-index">
                  <a href="/sheets/${sheet.id}">
                    <div class="col s1 m1">
                      <i class="material-icons small icon-vert-center">description</i>
                    </div>
                    <div class="col s9 m5 f-container">
                      ${coop_icon}
                      <div class="title">${sheet.title}</div>
                    </div>
                    <div class="col m3 hide-on-small-only grey-text darken-3">${sheet.author}</div>
                    <div class="col m2 hide-on-small-only grey-text darken-3">${sheet.last_view}</div>
                  </a>
                  <div class="col s1 m1 center">
                    <a href="/sheets/${sheet.id}"></a>
                    <a class="dropdown-trigger btn-flat show_circle_btn user_show_hover" data-target="dropdown_searched_${i}" href="#">
                      <i class="material-icons small icon-vert-center center">more_vert</i>
                    </a>
                    <ul class="dropdown-content" id="dropdown_searched_${i}" tabindex="0" style="">
                      <li tabindex="0">
                        <a href="#"><i class="material-icons">edit</i>編集</a>
                      </li>
                      <li tabindex="0">
                        <a href=""><i class="material-icons">delete</i>削除
                        </a>
                    </ul>
                  </div>
                </div>`

    searched_sheets_branch.append(html)
  }

  function sheet_search_with_asynchronous_communiation() {
    // 検索結果をリセット
    searched_sheets_branch.empty()

    // 検索フォームの文字を取得
    var input = $(".sheet_search_form").val();

    // apiのurlを取得
    var url = $('.sheet_search_form').data("url")

    // 入力フォームの文字を元に非同期通信でシート検索を行う
    if (input != "") {
      // ユーザーのシートを隠して、検索結果表示を表示する準備を行う
      $('#display_searched_sheets').css("display", "block");
      $('#display_sheets').css('display', 'none');

      $.ajax({
        type: 'GET',
        url: url,
        data: { keyword: input },
        dataType: 'json'
      })
        .done(function (sheets) {
          if (sheets.length > 0) {
            $.each(sheets, function (index, sheet) {
              current_user_name = $('.current_user').data("name");
              if (sheet.author == current_user_name) {
                sheet.author = '自分';
              }
              appendSearchedSheet(index, sheet);
            })
            // ドロップダウンのイベントを付与
            $('.dropdown-trigger').dropdown();
          } else {
            searched_sheets_branch.append(getErrMsgToHTML("一致するシートがありません"));
            // }
            // $('.spinner-hidden').css("display", "none");
          }
        })
        .fail(function () {
          M.toast({ html: '検索に失敗しました', classes: 'rounded red lighten-4 black-text', displayLength: 5000 });
        });
    } else {
      // 検索フォームに何も入力されていない時、ユーザーのシートを表示させる
      $('#display_searched_sheets').css('display', 'none');
      $('#display_sheets').css('display', 'block');
    }
  }
  // マイシート検索が押された時
  $('#find_in_mypage').on('click', function (e) {
    e.preventDefault();

    // ドロップダウンを閉じる
    $('.dropdown_trigger').dropdown('close');

    // 検索フォームの横のアイコンを変更する
    $('#search_icon').text('find_in_page');

    // シート検索apiへのURLを書き換える
    $('.sheet_search_form').data("url", "/api/sheets/mypage")

    // 検索結果をリセットし、現在入力されている内容で検索
    sheet_search_with_asynchronous_communiation()
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

    // 検索結果をリセットし、現在入力されている内容で検索
    sheet_search_with_asynchronous_communiation()
  })

  $('.sheet_search_form').on('keyup', function () {

    // 検索実行のタイマーが起動済みの時はリセットする
    clearTimeout(search_sheets_timer);

    // シートの検索を、入力されてから0.5秒後に非同期通信で行う
    search_sheets_timer = setTimeout(function () {
      sheet_search_with_asynchronous_communiation()
    }, 500);
  });
});