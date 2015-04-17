import App from './app';
import {renderToStringAsync, injectIntoMarkup} from 'react-async';
import React from 'react';

export default function render(req, res, next) {
    renderToStringAsync(<App />, function(err, markup, data) {
        if (err) return next(err);

        res.send(injectIntoMarkup(markup, data, ['./static/app.js']))
    });
}
