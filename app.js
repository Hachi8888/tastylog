const PORT = process.env.PORT;
const path = require("path");
const logger = require("./lib/log/logger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

// app.get("/", (req, res) => {
//   res.end("Hello World");
// });

// expressでejsを利用する設定
app.set("view engine", "ejs");
// サーバー情報を隠蔽する
app.disable("x-powered-by");


// 静定期コンテンツの配信（Static resource rooting）
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// 動的コンテンツのルーティング（Dynamic resource rooting）
app.use("/", require("./routes/index.js"));

// サーバを起動させる
app.listen(PORT, () => {
  logger.console.info(`Application listening at ${PORT}`);
});
