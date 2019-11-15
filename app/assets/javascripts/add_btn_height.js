
$(document).on('turbolinks:load', function () {
  set_start_row_container_h();
  dropdown_click_full(true);
});

function set_start_row_container_h() {
  var rows = $('.drag-and-drop');
  var set_height = rows.length * row_height + 30;
  $('.row_container').height(set_height);
}

function dropdown_click_full(is_add) {
  var fixed_added_height
  if (is_add) {
    var fixed_added_height = Math.max(0, $('.click_for_dropdown').height() - row_height);
  } else {
    var fixed_added_height = Math.max(0, $('.click_for_dropdown').height() + row_height);
  }
  $('.click_for_dropdown').height(fixed_added_height);
}