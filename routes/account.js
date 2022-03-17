const router = require("express").Router();
const { authenticate, authorize, PRIVILEGE } = require("../lib/security/accesscontrol.js");

router.get("/login", (req, res, next) => {
  // エラーメッセージはconnect flashのデータを取ってきて反映させる
  res.render("./account/login.ejs", { "message": req.flash("message")});
});

// 認証処理
router.use("./login", authenticate());

router.use("/reviews" , require("./account.reviews.js"));

module.exports = router;