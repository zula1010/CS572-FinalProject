const mongoose = require('mongoose');
const commonField = require('./commonModel');
const librianSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    ...commonField
});
librianSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("librians", librianSchema);