const MAX_ITEM_PAR_PAGE = require("../config/application.config").search.MAX_ITEM_PAR_PAGE;
const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

router.get("/", async (req, res, next) => {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var keyword = req.query.keyword || "";
  var count, results; // count :検索結果の総数

  try {
    if (keyword) {
      count = (await MySQLClient.executeQuery(
        await sql("COUNT_SHOP_BY_NAME"),
        [`%${keyword}%`]
      ))[0].count;

      results = await MySQLClient.executeQuery(
        await sql("SELECT_SHOP_LIST_BY_NAME"),
        [
          `%${keyword}%`,
          (page - 1) * MAX_ITEM_PAR_PAGE,  // offset(基準)
          MAX_ITEM_PAR_PAGE // limit
        ]
      );
    } else {
      // keywordがなければ初期表示（ハイスコア店舗表示）
      count = MAX_ITEM_PAR_PAGE;
      results = await MySQLClient.executeQuery(
        await sql("SELECT_SHOP_HIGH_SCORE_LIST"),
        [MAX_ITEM_PAR_PAGE]
      );
    }

    res.render("./search/list.ejs", { 
      keyword,
      count,
      results,
      pagenation: {
        max: Math.ceil(count / MAX_ITEM_PAR_PAGE), // ページの最大値
        current: page
      } 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;