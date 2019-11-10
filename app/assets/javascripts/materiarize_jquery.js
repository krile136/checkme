$(document).on('turbolinks:load', function () {
  // マイページでシートにマウスオンした時に、背景色を変更する
  $(".sheet-index").hover(function () {
    if ($(this).hasClass('blue')) {
      $(this).removeClass('blue', 'lighten-5');
    } else {
      $(this).addClass('blue');
      $(this).addClass('lighten-5');
    }
  });

  $('.sidenav').sidenav({
    edge: "right"
  });
  $('.parallax').parallax();
  $('.dropdown-trigger').dropdown();
  $('.modal').modal();
});

// ページが遷移する際に、諸々をリセット
// 特にsidenavはリセットしないと動かない
$(document).on("turbolinks:before-cache", function () {
  $('.sidenav').sidenav('destroy');
  $('.dropdown-trigger').dropdown('destroy');
  $('.modal').modal('destroy');
});

