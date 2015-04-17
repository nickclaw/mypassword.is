import {Schema, model} from 'mongoose';
import whitelist from 'screener';
import {generate as generateId} from 'shortid';

let schema = new Schema({
    _id: {
        type: String,
        'default': generateId
    },

    password: {type: String, required: true},
    reason: {type: String, required: true},

    allowed: {type: Boolean, default: false, select: false},
    added: {type: Number, select: false},

    view: {
        type: {type: String, default: 'basic', required: true},
        classes: [String],
        background: String
    }
});

schema.methods.toJSON = function() {
    return Entry.screen(this.toObject({ virtuals: true }), 'view');
}

let Entry = model('Entry', schema);

Entry.screen = function(data, action) {
    return whitelist(data, whitelists[action]);
}

export default Entry;


var whitelists = {
    create: {
        password: true,
        reason: true
    },

    update: {
        password: true,
        reason: true,
        allowed: true,
        added: true
    },

    view: {
        id: true,
        password: true,
        reason: true,
        allowed: true,
        view: true,
    }
};
