const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});
module.exports = Reader = mongoose.model('readers', ReaderSchema);
