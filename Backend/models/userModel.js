const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    date: { type: Date, default: Date.now }
});

// Prevent Overwrite Error
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
