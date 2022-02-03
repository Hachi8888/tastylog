const pool = require("./pool.js");

// transaction単位でコネクションを管理したい
var Transaction = class {
  constructor(connection){
    this.connection = connection;
  }

  async begin(){
    if (this.connection) {
      // コネクションがあれば一旦リリースする
      this.connection.release();
    }
    this.connection = await pool.getConnection();
    this.connection.beginTransaction();
  }

  async executeQuery(query, values, options = {}) {
    options = {
      fields: options.fields || false
    }

    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (err, results, fields) => { // fiels: カラム情報
        if (!err) {
          // fieldsが必要であればfeildsと生データを返す
          resolve(!options.fields ? results : { results, fields });
        } else {
          reject(err);
        }
      })
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      this.connection.commit((err) => {
        // connectionの初期化
        this.connection.release();
        this.connection = null;

        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  async rollback() {
    return new Promise((resolve, reject) => {
      this.connection.rollback(() => {  // そもそもエラーになってrollbackをしているので、引数errはあえて揉み消す
        this.connection.release();
        this.connection = null;
        resolve();
      });
    });

  }
};

module.exports = Transaction;