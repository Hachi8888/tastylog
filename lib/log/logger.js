const log4js = require("log4js");
const config = require("../../config/log4js.config"); 
var console, application, access;

log4js.configure(config);

// Console logger
// デフォルトの場合は何も引数を指定しなくてもloggerを取得できる
console = log4js.getLogger();

// Application logger
application = log4js.getLogger("application");

// Access logger
access = log4js.getLogger("access");

module.exports = {
  console,
  application,
  access
};