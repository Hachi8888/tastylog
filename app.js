const PORT = process.env.PORT;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const { connect } = require("http2");
const { ADDRGETNETWORKPARAMS } = require("dns");
const app = express();

// expressでejsを利用する設定
app.set("view engine", "ejs");
// サーバー情報を隠蔽する
app.disable("x-powered-by");

// Expose global mathod to view engine（）
app.use((req, res, next) => {
  res.locals.moment = require("moment");
  res.locals.padding = require("./lib/math/math").padding;
  next();
});

// 静定期コンテンツの配信（Static resource rooting）
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

//Set access log（ミドルウェアの読み込み）
// (JSは上から順に実行される。静的コンテンツまでログ出力する必要はないため、その記述の直後に書くのがおすすめ)
app.use(accesslogger());

// Set middleware
// postのリクエスト（formで渡されるデータ）を読み解けるようにする（formで渡されるデータ）
app.use(express.urlencoded({ extend: true }));

// 動的コンテンツのルーティング（Dynamic resource rooting）
app.use("/account", require("./routes/account.js"));
app.use("/search", require("./routes/search.js"));
app.use("/shops", require("./routes/shops.js"));
app.use("/", require("./routes/index.js"));

// Set application log（ミドルウェアの読み込み）
app.use(applicationlogger());

// サーバを起動させる
app.listen(PORT, () => {
  logger.application.info(`Application listening at ${PORT}`);
});