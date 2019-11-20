$(document).on('turbolinks:load', function () {
  $('.help-make').on('click', function (e) {
    e.preventDefault();

    $('#help_list').css('display', 'none');
    $('#help_make_content').css('display', 'block');


  })

})