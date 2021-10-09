const router = require("express").Router();

router.get("/", (req, res) => {
  // ルートのパスがリクエストされたときに以下のパスのファイルを返す処理（viewsフォルダからの相対パスでOK)
  res.render("./index.ejs");
});

module.exports = router;