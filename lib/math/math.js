// 小数を整形するライブラリ

const roundTo = require("round-to");

var padding = function(value) {
  // 本当に数値か確認
  if(isNaN(parseFloat(value))){
    return "-";
  }

  // 数値に変換できれば小数第三位を四捨五入して第二位までに丸める, 文字列にして返す
  return roundTo(value, 2).toPrecision(3);
};

var round = function (value) {
  return roundTo(value, 2);
};

module.exports = {
  padding,
  round
};