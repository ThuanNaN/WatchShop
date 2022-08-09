const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose
    .connect(process.env.MONGOO_URL)
    .then(() => console.log("DB Connection Successfull!"))
}
module.exports = connectDatabase