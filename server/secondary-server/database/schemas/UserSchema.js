const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserID: { type: String, required: true, unique: true },
    UserAdhar: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Employee', UserSchema);
