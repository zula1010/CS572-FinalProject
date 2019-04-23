const mongoose = require('mongoose');
const commonField = require('./commonModel');
const checkoutInSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    copyId: {
        type: String,
        required: true
    },
    readerId: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1,
    },
    due_date: {
        type: Date,
        required: true
    },
    borrow_date: {
        type: Date,
        default: Date.now
    },
    return_date: {
        type: Date
    },

    ...commonField
});
checkoutInSchema.index({ copyId: 1, readerId: 1 });
checkoutInSchema.pre("findOneAndUpdate", function (next) {
    this._update.modifyDate = new Date();
    next();
});
module.exports = mongoose.model("librians", checkoutInSchema);