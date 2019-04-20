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
        required: true
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
module.exports = Reader = mongoose.model('readers', ReaderSchema);
