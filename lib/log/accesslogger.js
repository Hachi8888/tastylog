const log4js = require("log4js");
const logger = require("./logger.js");
const DEFAULT_LOG_LEVEL = "auto";

module.exports = function(options) {
  options = options || {};
  options.level = options || DEFAULT_LOG_LEVEL;
  return log4js.connectLogger(logger, options);
};