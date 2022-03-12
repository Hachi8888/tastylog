var window_onpopstate = function (event) {
  // 戻るボタンが押されたときも空履歴を追加
  history.pushState(null, null, null);
};

var document_onready = function (event) {
  // 空履歴を追加
  history.pushState(null, null, null);
  // ブラウザバックのときの挙動
  $(window).on("popstate", window_onpopstate);
};

$(document).ready(document_onready);