var mongoose = require('mongoose');

var schema = mongoose.Schema({
    path: String,
    width: Number,
    height: Number
});

module.exports = mongoose.model('Image', schema);
