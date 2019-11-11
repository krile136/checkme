$(document).on('turbolinks:load', function () {

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

