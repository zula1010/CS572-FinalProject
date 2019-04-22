const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commonField = require('./commonModel');

const ReaderSchema = new Schema({
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
        default: "123"
    },
    address: {
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        zip: {
            type: Number,
        },
        street: {
            type: String
        }
    },
    phonenumber: {
        type: String,
    },
    ...commonField

});
ReaderSchema.pre("findOneAndUpdate", function (next) {
    this._update.modifyDate = new Date();
    // console.log(this);
    // var query = this.getQuery(); // contains id
    // var update = this.getUpdate();
    // console.log(update);
    next();
});
module.exports = Reader = mongoose.model('readers', ReaderSchema);
