module.exports = {
  HOST: process.env.MYSQL_HOST || "127.0.0.1",  // デフォルト値はローカルホスト
  PORT: process.env.MYSQL_PORT || "3306",
  USERNAME: process.env.MYSQL_USERNAME || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "7nanapro",
  DATABASE: process.env.MYSQL_DATABASE || "tastylog"
};