const PORT = process.env.PORT;
const express = require("express");
const app = express();

// app.get("/", (req, res) => {
//   res.end("Hello World");
// });

// expressでejsを利用する設定
app.set("view engine", "ejs");

// ルーティングを行う
app.use("/", require("./routes/index.js"));

// サーバを起動させる
app.listen(PORT, () => {
  console.log(`Application listening at ${PORT}`);
});
