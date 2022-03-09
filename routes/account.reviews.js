const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");
const moment = require("moment");
const tokens = new (require("csrf"))();
const DATE_FORMAT = "YYYY/MM/DD";

var validateReviewData = function (req) {
  var body = req.body;
  var isValid = true, error = {};

  if (body.visit && !moment(body.visit).isValid()) {
    isValid = false;
    error.visit = "訪問日の日付文字列が不正です。";
  }

  if (isValid) {
    return undefined;
  }

  return error;
};

var createReviewData = function (req) {
  var body = req.body, date;

  return {
    shopId: req.params.shopId,
    score: parseFloat(body.score),
    visit: (date = moment(body.visit, DATE_FORMAT)) && date.isValid() ? date.toDate() : null,
    post: new Date(),
    description: body.description,
  };
};

// 入力フォームの表示
router.get("/regist/:shopId(\\d+)", async (req, res, next) => {
  var shopId =req.params.shopId;
  var secret, token, shop, shopName, review, results;

  // secret, tokenの発行
  secret = await tokens.secret(); // secret()メソッドは非同期でcallbackでsecretを取得している
  token = tokens.create(secret);
  // 保存
  req.session._csrf = secret; // secretはサーバー保持（session）
  res.cookie("_csrf", token); // tokenはクライアント返却（cookie）

  try {
    results = await MySQLClient.executeQuery(
      await sql("SELECT_SHOP_BASIC_BY_ID.sql"),
      [shopId]
    );
    shop = results[0] || {};
    shopName = shop.name;
    review = {};
    res.render("./account/reviews/regist-form.ejs", { shopId, shopName, review });
  } catch (err) {
    next(err);
  }
});

router.post("/regist/:shopId(\\d+)", (req, res) => {
  var review = createReviewData(req);
  var { shopId, shopName } = req.body;
  res.render("./account/reviews/regist-form.ejs", { shopId, shopName, review });
});

router.post("/regist/confirm", (req, res) => {
  var error = validateReviewData(req);
  var review = createReviewData(req);
  var { shopId, shopName } = req.body;

if (error) {
  res.render("./account/reviews/regist-form.ejs", { error, shopId, shopName, review });
  return;
}

  res.render("./account/reviews/regist-confirm.ejs", { shopId, shopName, review });
});

// sqlの実行があるので非同期で行う
router.post("/regist/execute", async (req, res, next) => {
  // CSRF対策のため真っ先にtokenの確認を行う
  var secret = req.session._csrf; // secretの取り出し
  var token = req.cookies._csrf;  // tokenの取り出し

  if (tokens.verify(secret, token) === false) {
    // 不正な画面遷移
    next(new Error("Invalid Token."));
    return;
  }

  var error = validateReviewData(req);
  var review = createReviewData(req);
  var { shopId, shopName } = req.body;
  var userId = 1; // ログイン機能実装後に更新

  if (error) {
    res.render("./account/reviews/regist-form.ejs", { error, shopId, shopName, review });
    return;
  }

  try {
    transaction = await MySQLClient.beginTransaction();
    transaction.executeQuery(
      await sql("SELECT_SHOP_BY_ID_FOR_UPDATE"),
      [shopId]
    );
    // 先にレビューを登録して、平均スコアを求めやすくする
    transaction.executeQuery(
      await sql("INSERT_SHOP_REVIEW"),
      [shopId, userId, review.score, review.visit, review.description]
    );
    transaction.executeQuery(
      await sql("UPDATE_SHOP_SCORE_BY_ID"),
      [shopId, shopId]
    );
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    next(err);
    return;
  }

  // 正常な画面遷移だった場合、安全のためtokenを削除する
  delete req.session._csrf;
  res.clearCookie("_csrf");

  res.render("./account/reviews/regist-complete.ejs", { shopId });
  
});

module.exports = router;