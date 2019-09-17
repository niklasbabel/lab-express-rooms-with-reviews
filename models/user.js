const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: String, // validation for email
    password: String, // REQUIRED
    fullName: String,
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);