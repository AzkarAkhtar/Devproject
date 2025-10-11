const mongoose = require("mongoose");
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://randomazkar_db_user:NVQ3uxvdHB1NU8SI@node.vropubl.mongodb.net/devproject");
};

module.exports = connectDB;