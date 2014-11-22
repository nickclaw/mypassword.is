var mongoose = require('mongoose');

var schema = mongoose.Schema({
    password: {type: String, required: true},
    reason: {type: String, required: true},

    allowed: {type: Boolean, default: false, select: false},
    added: {type: Date, select: false},

    view: {
        type: {type: String, default: 'basic', required: true},
        classes: [String]
    }
});

module.exports = mongoose.model('Entry', schema);
