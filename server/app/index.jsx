import routes from './app';
import {renderToStringAsync, injectIntoMarkup} from 'react-async';
import React from 'react';
import {run} from 'react-router';
import {Request} from 'superagent';

// for server side rendering api calls won't work
// unless we prepend all urls with the local address
let oldFn = Request.prototype.request;
Request.prototype.request = function() {
    this.url = C.SERVER.HOST + ':' + C.SERVER.PORT + this.url;
    return oldFn.apply(this, arguments);
}

export default function render(req, res, next) {

    run(routes, req.url, function (Handler) {
        renderToStringAsync(<Handler />, function(err, markup, data) {
            if (err) return next(err);

            res.send(injectIntoMarkup(markup, data, []))
        });
    });
}
