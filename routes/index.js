const router = require("express").Router();

router.get("/", (req, res) => {
  // viewsフォルダからの相対パスでOK
  res.render("./index.ejs");
});

module.exports = router;