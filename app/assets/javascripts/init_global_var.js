modal_num = 8;
// 使われてるmodal_num
// 1: 保存する時（確認用）
// 2: 新しいシートを作るとき（確認用）
// 3: タイトル編集
// 4: 見出しの削除
// 5: 見出しの編集
// 6: 項目の削除
// 7: 項目の編集

// create_input_fields.jsで使う
// 削除された行の数をカウントする
var deleted_rows = 0;

// 共有しているユーザーがシートに入れたチェックの更新タイマー
var check_interval_timer;

// チェックを入れた時の非同期通信開始までのディレイ用タイマー
var auto_save_timer;

// シート検索時の非同期通信開始までのディレイ用タイマー
var search_sheets_timer;

// search_sheets.jsで用いる
// マイページ検索か、共有シート検索かの判定フラグ
var is_mypage = true;

// 共有するユーザーの名前を検索する際の非同期通信開始までのディレイ用タイマー
var search_name_timer;

// 共有するユーザーを記録しておく変数 search_users.jsで使用
var added_user_list = [];
var cooperate_user_list = [];

// ユーザー情報更新時に用いるemail検索用のインターバルタイマー
var search_email_timer;
