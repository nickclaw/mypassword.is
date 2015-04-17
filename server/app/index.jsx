import routes from './app';
import {renderToStringAsync, injectIntoMarkup} from 'react-async';
import React from 'react';
import {run} from 'react-router';

export default function render(req, res, next) {

    run(routes, req.url, function (Handler) {
        renderToStringAsync(<Handler />, function(err, markup, data) {
            if (err) return next(err);

            res.send(injectIntoMarkup(markup, data, []))
        });
    });
}
