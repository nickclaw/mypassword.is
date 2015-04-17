import {Schema, model} from 'mongoose';
import whitelist from 'screener';
import {generate as generateId} from 'shortid';
import vlad from 'vlad';

let schema = new Schema({
    _id: { type: String, default: generateId },

    password: { type: String },
    reason: { type: String },

    allowed: {type: Boolean, default: false },
    added: {type: Number, default: Date.now() },

    view: {
        type: { type: String, default: 'basic' },
        classes: [ String ],
        background: String
    }
});

schema.methods.toJSON = function() {
    return Entry.screen(this.toObject({ virtuals: true }), 'view');
};

schema.methods.validate = function(done) {
    validate(this).nodeify(done);
};

let Entry = model('Entry', schema);

Entry.screen = function(data, action) {
    return whitelist(data, whitelists[action]);
};

export default Entry;

var validate = vlad({
    password: vlad.string.required.min(1).max(64),
    reason: vlad.string.required.min(1)
});

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
