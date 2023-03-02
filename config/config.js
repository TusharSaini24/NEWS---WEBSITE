const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCAL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongodb Connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
