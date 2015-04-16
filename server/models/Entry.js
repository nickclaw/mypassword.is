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
    return screen(this.toObject(), 'view');
}

export default model('Entry', schema);

export function screen(data, action) {
    return whitelist(data, whitelists[action]);
}

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
        password: true,
        reason: true,
        allowed: true,
        view: true,
    }
};
