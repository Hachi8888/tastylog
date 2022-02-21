// ひとつのformに複数のsubmitができるようにする

var btnSubmit_onclick = function (event) {
  var $submit = $(this);
  var $form = $submit.parents("form");

  // formを上書きする
  $form.attr("method", $submit.data("method"));
  $form.attr("action", $submit.data("action"));

  $form.submit();
};

// イベントのアタッチ
var document_onready = function (event) {
  $("input[type='submit']").on("click", btnSubmit_onclick);
};

$(document) .ready(document_onready);