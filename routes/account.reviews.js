const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

var createReviewData = function (req) {
  return {
    shopId,
    shopName,
    visit,
    score,
    
  }
};

router.get("/regist/:shopId(\\d+)", async (req, res, next) => {
  var shopId =req.params.shopId;
  var shop, shopName, review, results;

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

router.post("/regist/confirm", (res, req, next) => {
  var review = createReviewData(req);
  var { shopId, shopName } = res.body;
  res.render("./account/reviews/regist-confirm.ejs", { shopId, shopName, review })
});

module.exports = router;