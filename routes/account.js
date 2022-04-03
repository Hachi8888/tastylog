// const router = require("express").Router();
// const { authenticate, authorize, PRIVILEGE } = require("../lib/security/accesscontrol.js");

// router.get("/", (req, res) => {
//   res.render("./account/index.ejs");
// });

// router.get("/login", (req, res) => {
//   // エラーメッセージは connect flash のデータを取ってきて反映させる
//   res.render("./account/login.ejs", { "message": req.flash("message") });
// });

// // 認証処理
// router.post("/login", authenticate());

// router.use("/reviews", require("./account.reviews.js"));

// module.exports = router;


const { decycle, encycle } = require('json-cyclic');


const router = require("express").Router();
const { authenticate, authorize, PRIVILEGE } = require("../lib/security/accesscontrol.js");

router.get("/login", (req, res) => {
  res.render("./account/login.ejs", { message: req.flash("message") });
});

// router.post("/login", authenticate());
// router.post("/login", (req, res) => {
//   authenticate();
//   console.log(`---------> ${JSON.stringify(decycle(req), null, 2)}`);
// });


router.use("/reviews", require("./account.reviews.js"));

module.exports = router;