const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const mongooseURIConnect = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(mongooseURIConnect, {
  useNewUrlParser: true,
});

mongoose.connection.once("open", () => {
  console.log("-- conected to mongoose database --");
});

module.exports = mongoose;
