const passport = require("passport");

var initialize, authenticate, authorize;

initialize = function () {
  return [
    passport.initialize(),
    passport.session(),
    // ログイン状態を確認しやすくするミドルウェア（ヘッダーでログインボタンの表示の切り替えに使う）
    function (req, res, next) {
      if (req.user) {
        res.locals.user = req.user;
      }
      next();
    }
  ];
};


module.exports = {
  initialize,
  authenticate,
  authorize,
};