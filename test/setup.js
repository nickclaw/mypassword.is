require('../config/config.js');

var stub = require('passport-stub');

var chai = require('chai');
chai.should();
chai.use( require('chai-as-promised') );
chai.use( require('chai-shallow-deep-equal') );

var URL = C.SERVER.HOST + ":" + C.SERVER.PORT;

global.expect = chai.expect;
global.request = require('superagent');
global._ = require('lodash');

global.r = {
    get: function get(url) {
        return new Promise(function(res, rej) {
            request
                .get(URL + url)
                .end(handle(res, rej));
        });
    },

    post: function post(url, data) {
        return new Promise(function(res, rej) {
            request
                .post(URL + url)
                .send(data)
                .end(handle(res, rej));
        });
    },

    del: function del(url) {
        return new Promise(function(res, rej) {
            request
                .del(URL + url)
                .end(handle(res, rej));
        });
    },

    hasStatus: function(code) {
        return function(res) {
            expect(res.status).to.equal(code);
            return res;
        };
    },

    login: function(user) {
        stub.login(user);
    },

    logout: function(value) {
        stub.logout();
        return value;
    }
};

function handle(res, rej) {
    return function handle(e, r) {
        if (e) {
            rej(e);
        } else if (r.status !== 200 && r.status !== 201) {
            rej(r);
        } else {
            res(r.body);
        }
    }
}
