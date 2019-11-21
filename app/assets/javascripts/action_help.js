$(document).on('turbolinks:load', function () {
  $('.help-make').on('click', function (e) {
    e.preventDefault();

    $('.modal-back').css('display', 'inline-block');

    $('#help_list').css('display', 'none');
    $('#help_make_content').css('display', 'block');
  })

  $('.help-use').on('click', function (e) {
    e.preventDefault();

    $('.modal-back').css('display', 'inline-block');

    $('#help_list').css('display', 'none');
    $('#help_use_content').css('display', 'block');
  })

  $('.modal-back').on('click', function (e) {
    e.preventDefault();
    $('.modal-back').css('display', 'none');
    $('.help_back_content').css('display', 'none');
    $('#help_list').css('display', 'block');
  })
})