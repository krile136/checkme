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

  $('.help-share').on('click', function (e) {
    e.preventDefault();

    $('.modal-back').css('display', 'inline-block');

    $('#help_list').css('display', 'none');
    $('#help_share_content').css('display', 'block');
  })

  $('.help-public').on('click', function (e) {
    e.preventDefault();

    $('.modal-back').css('display', 'inline-block');

    $('#help_list').css('display', 'none');
    $('#help_public_content').css('display', 'block');
  })

  $('.help-search-mypage').on('click', function (e) {
    e.preventDefault();

    $('.modal-back').css('display', 'inline-block');

    $('#help_list').css('display', 'none');
    $('#help_search_mypage_content').css('display', 'block');
  })

  $('.help-search-public').on('click', function (e) {
    e.preventDefault();

    $('.modal-back').css('display', 'inline-block');

    $('#help_list').css('display', 'none');
    $('#help_search_public_content').css('display', 'block');
  })

  $('.help-pull').on('click', function (e) {
    e.preventDefault();

    $('.modal-back').css('display', 'inline-block');

    $('#help_list').css('display', 'none');
    $('#help_pull_content').css('display', 'block');
  })

  $('.modal-back').on('click', function (e) {
    e.preventDefault();
    $('.modal-back').css('display', 'none');
    $('.help_back_content').css('display', 'none');
    $('#help_list').css('display', 'block');
  })
})