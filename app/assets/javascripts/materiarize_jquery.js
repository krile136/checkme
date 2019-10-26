$(document).on('turbolinks:load', function () {
  $('.sidenav').sidenav({
    edge: "right"
  });
  $('.parallax').parallax();
});

// ページが遷移する際に、sidenavをリセットする
// リセットしないとsidenavが動かない
$(document).on("turbolinks:before-cache", function () {
  $('.sidenav').sidenav('destroy');
});
