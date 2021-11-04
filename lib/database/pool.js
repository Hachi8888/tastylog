// コネクションプール（一定数の接続を確保し、接続情報の使い回しを行う）

const { promisify } = require("util");  // 非同期化するメソッド
const config = require("../../config/mysql.config.js");
  const mysql = require("mysql");

  // mysqlに接続する設定
  const pool = mysql.createPool({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    connectionLimit: config.CONNECTION_LIMIT, // 同時接続できる上限数（デフォルト： 10）
    queueLimit:config.QUEUE_LIMIT // DBからの接続を待たずに投入できるクエリ上限数（デフォルト： 0 = 無限）
  });

  // 非同期関数を作る
  module.exports = {
    pool,
    getConnection: promisify(pool.getConnection).bind(pool), // コネクションプールからコネクションを取得する　promisifyで非同期関数にし、元データをbindで書き換える
    executeQuery: promisify(pool.query).bind(pool),
    releaseConnection: function (connection) {
      // コネクションプールへコネクションを戻す
      connection.release();
    }, // プール側ではなくコネクション側にあるので引数にコネクションを取るようにする
    end: promisify(pool.end).bind(pool) // 接続中のコネクションをすべて解放する
  };