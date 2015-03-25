var mongoose = require('mongoose');

var schema = mongoose.Schema({
    path: String,
    width: Number,
    height: Number,
    ETag: String
});

module.exports = mongoose.model('Image', schema);
