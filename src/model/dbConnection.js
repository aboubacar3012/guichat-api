const mongoose = require("mongoose");
const config = require("../utils/config");
mongoose
  // @ts-ignore
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log(process.env.NODE_ENV);
    console.log("✅ Guichat Database connected successfully ✨✨");
  })
  .catch((error) => {
    console.log("Guichat Database is not connected❌", error);
  });
