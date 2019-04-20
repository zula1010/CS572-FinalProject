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
    roles: [{
        type: String
    }],
    ...commonField
});
librianSchema.index({ email: 1 }, { unique: true });
librianSchema.pre("findOneAndUpdate", function(next){
    this._update.modifyDate = new Date();
    // console.log(this);
    // var query = this.getQuery(); // contains id
    // var update = this.getUpdate();
    // console.log(update);
    next();
});
module.exports = mongoose.model("librians", librianSchema);