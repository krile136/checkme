// データ保存用のフィールド作成
function set_input_field() {
  // #items_branchより下のフィールドを削除
  $('#items_branch').empty();

  // 必要な情報を得てフィールドを作成、appendする
  elements = $('.drag-and-drop');
  $.each(elements, function (index) {
    reset_classes(this);
    var name = $(this).find('#text-content').text();
    var top = this.offsetTop;
    var is_head = false;
    var item_id = $(this).attr('id');
    if (!item_id) {
      item_id = false;
    }
    if ($(this).hasClass('m10')) {
      is_head = true;
    }
    var html = build_hidden_form(index, name, top, is_head, item_id)
    $('#items_branch').append(html);
  });
}

// データ入力/更新用HTMLの生成
function build_hidden_form(i, name, top, is_head, item_id) {
  var item_attr_num = i + deleted_rows;
  var is_check_box = `<input type="checkbox" hidden="hidden" value="true" name="sheet[items_attributes][${item_attr_num}][is_head]" id="sheet_items_attributes_${item_attr_num}_is_head">`
  var item_id_form = ``;
  if (item_id) {
    item_id_form = `<input value="${item_id}" type="text" name="sheet[items_attributes][${item_attr_num}][id]" id="sheet_items_attributes_${item_attr_num}_id"></input>`
  }
  if (is_head) {
    is_check_box = `<input type="checkbox" hidden="hidden" value="true" checked="checked" name="sheet[items_attributes][${item_attr_num}][is_head]" id="sheet_items_attributes_${item_attr_num}_is_head">`
  }
  var html = `<input value="${name}" hidden="hidden" type="text" name="sheet[items_attributes][${item_attr_num}][name]" id="sheet_items_attributes_${item_attr_num}_name" >
              <input value="${top}" hidden="hidden" type="text" name="sheet[items_attributes][${item_attr_num}][top]" id="sheet_items_attributes_${item_attr_num}_top">
              ${item_id_form}
              ${is_check_box}`
  return html;
}

// 削除用のフィールドを生成
function set_delete_field(item_id) {
  var html = `<input value="${item_id}" type="text" hidden="hidden" name="sheet[items_attributes][${deleted_rows}][id]" id="sheet_items_attributes_${deleted_rows}_id"></input>
              <input value="1" type="text" hidden="hidden" name="sheet[items_attributes][${deleted_rows}][_destroy]" id="sheet_items_attributes_${deleted_rows}_destroy"></input>`
  $('#deleted_items').append(html);
  deleted_rows += 1;
}

