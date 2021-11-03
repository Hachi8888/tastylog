const { promisify } = require("util");  // 非同期化するメソッド
  const path = require("path");
  const { sql } = require("@garafu/mysql-fileloader")({ root: path.join(__dirname, "./sql") });
  const config = require("../../config/mysql.config.js");
  const mysql = require("mysql");

  // mysqlに接続する設定
  const con = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
  });

  // 非同期関数を作る
  const MySQLClient = {
    connect: promisify(con.connect).bind(con), // 非同期関数にし、元データをbindで書き換える
    query: promisify(con.query).bind(con),
    end: promisify(con.end).bind(con),
  }

module.exports = {
  MySQLClient,
  sql
};