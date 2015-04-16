require('../config/config.js');

var chai = require('chai');
chai.should();
chai.use( require('chai-as-promised') );

global.expect = chai.expect;
global.request = require('superagent');
global.URL = C.SERVER.HOST + ":" + C.SERVER.PORT;
global._ = require('lodash');

global.r = {
    get: function get(url) {
        return new Promise(function(res, rej) {
            request
                .get(C.SERVER.HOST + ':' + C.SERVER.PORT + url)
                .end(handle(res, rej));
        });
    },

    post: function post(url, data) {
        return new Promise(function(res, rej) {
            request
                .post(C.SERVER.HOST + ':' + C.SERVER.PORT + url)
                .send(data)
                .end(handle(res, rej));
        });
    },

    del: function del(url) {
        return new Promise(function(res, rej) {
            request
                .del(C.SERVER.HOST + ':' + C.SERVER.PORT + url)
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
