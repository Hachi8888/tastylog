module.exports = {
  PORT: process.env.PORT || 3000,
  security: {
    SESSION_SECRET: "YOUR_SESSION_SECRET_STRING"
  },
  search: {
    MAX_ITEM_PAR_PAGE: 5

  }
};