// 補足説明
// materializeのドロップダウンメニューは、コンテンツが少なくbodyの高さ < innnerHeight の時に
// body外をクリックしてもメニューが閉じない。よって、ページの最下部に
// .click_for_dropdown
// を追加し、高さを残りのページ幅とすることでページのどこをクリックしてもメニューが閉じるようにする。

$(document).on('turbolinks:load', function () {
  dropdown_click_full();
  var body_h = $('body').height();
  var window_h = innerHeight;
  var added_height = Math.max(0, window_h - body_h);
  $('.click_for_dropdown').height(added_height);
});

function dropdown_click_full() {
  var fixed_added_height = Math.max(0, $('.click_for_dropdown').height() - row_height);
  $('.click_for_dropdown').height(fixed_added_height);
}