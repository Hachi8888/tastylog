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

// app.get("/", (req, res) => {
//   res.end("Hello World");
// });

// expressでejsを利用する設定
app.set("view engine", "ejs");
// サーバー情報を隠蔽する
app.disable("x-powered-by");
6
// 静定期コンテンツの配信（Static resource rooting）
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

//Set access log（ミドルウェアの読み込み）
// (JSは上から順に実行される。静的コンテンツまでログ出力する必要はないため、その記述の直後に書くのがおすすめ)
app.use(accesslogger());

// 動的コンテンツのルーティング（Dynamic resource rooting）
app.use("/", require("./routes/index.js"));
app.use("/test", async(req, res, next) => {
  const { MySQLClient, sql } = require("./lib/database/client.js");
  var data;

  try {
    await MySQLClient.connect();
    data = await MySQLClient.query(await sql("SELECT_SHOP_BASIC_BY_ID")); // sqlが実行され、その戻り値が返ってくる
    console.log(data);
  } catch (err) {
    next(err)
  } finally {
    // 接続を切断する
    await MySQLClient.end();
  }

  res.end("OK~");  
});

// Set application log（ミドルウェアの読み込み）
app.use(applicationlogger());

// サーバを起動させる
app.listen(PORT, () => {
  logger.application.info(`Application listening at ${PORT}`);
});
