// ひとつのformに複数のsubmitができるようにする

var btnSubmit_onclick = function (event) {
  var $submit = $(this);
  var $form = $submit.parents("form");

  // formを上書きする
  $form.attr("method", $submit.data("method"));
  $form.attr("action", $submit.data("action"));

  $form.submit();
  // 不要なイベントを取り払い、2重送信防止のためにボタンを押せないようにする
  $submit.off().prop("disabled", true);
 // 2重送信防止のため送信を押したときも無効化する 
  $form.on("submit", false);
};

// イベントのアタッチ
var document_onready = function (event) {
  $("input[type='submit']").on("click", btnSubmit_onclick);
};

$(document) .ready(document_onready);